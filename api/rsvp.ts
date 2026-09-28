import {Pool} from 'pg'

const MAX_NAME_LENGTH = 120
const SCHEMA_LOCK_ID = 72701

type FunctionRequest = {
    method?: string
    body?: unknown
}

type FunctionResponse = {
    status: (code: number) => FunctionResponse
    setHeader: (name: string, value: string) => void
    json: (payload: unknown) => void
}

type RsvpRow = {
    id: string
    name: string
    created_at: Date
}

let pool: Pool | null = null

function getPool(): Pool {
    if (pool) return pool

    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        throw new Error('DATABASE_URL is not set')
    }

    pool = new Pool({
        connectionString,
        max: 1,
        idleTimeoutMillis: 10_000,
        connectionTimeoutMillis: 10_000,
    })

    pool.on('error', error => {
        console.error('[rsvp] idle client error', error)
    })

    return pool
}

function parseName(body: unknown): {name: string} | {error: string} {
    let payload: unknown = body

    if (typeof payload === 'string') {
        try {
            payload = JSON.parse(payload)
        } catch {
            return {error: 'Invalid request body.'}
        }
    }

    if (typeof payload !== 'object' || payload === null) {
        return {error: 'Invalid request body.'}
    }

    const {name} = payload as {name?: unknown}
    if (typeof name !== 'string') {
        return {error: 'Please enter your name.'}
    }

    // eslint-disable-next-line no-control-regex
    if (/[\u0000-\u001F\u007F]/.test(name)) {
        return {error: 'Please enter your name.'}
    }

    const trimmed = name.trim().replace(/\s+/g, ' ')
    if (!trimmed) {
        return {error: 'Please enter your name.'}
    }

    if (trimmed.length > MAX_NAME_LENGTH) {
        return {error: `Please keep your name under ${MAX_NAME_LENGTH} characters.`}
    }

    return {name: trimmed}
}

export default async function handler(req: FunctionRequest, res: FunctionResponse) {
    res.setHeader('Cache-Control', 'no-store')

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ok: false, error: 'Method not allowed.'})
    }

    const parsed = parseName(req.body)
    if ('error' in parsed) {
        return res.status(400).json({ok: false, error: parsed.error})
    }

    try {
        const client = getPool()

        // The advisory lock stops concurrent cold starts from racing on DDL.
        // Both statements ship as one simple-query call, so they share an
        // implicit transaction and the lock is held for the whole batch.
        await client.query(`
            SELECT pg_advisory_xact_lock(${SCHEMA_LOCK_ID});
            CREATE TABLE IF NOT EXISTS rsvps (
                id         bigserial   PRIMARY KEY,
                name       text        NOT NULL,
                created_at timestamptz NOT NULL DEFAULT now()
            )
        `)

        const {rows} = await client.query<RsvpRow>(
            'INSERT INTO rsvps (name) VALUES ($1) RETURNING id, name, created_at',
            [parsed.name]
        )

        const row = rows[0]
        return res.status(201).json({
            ok: true,
            id: row.id,
            name: row.name,
            createdAt: row.created_at.toISOString(),
        })
    } catch (error) {
        console.error('[rsvp] insert failed', error)
        return res
            .status(500)
            .json({ok: false, error: 'We could not save your RSVP just now. Please try again.'})
    }
}
