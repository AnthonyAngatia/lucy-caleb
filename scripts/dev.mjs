// `vercel dev` only reads `.env` and skips `.env.local`, but this project's
// database credentials live in `.env.local`. Rather than splitting the config
// across two files, load `.env.local` into the environment and hand off to the
// Vercel CLI so the serverless function inherits the variables.
import {spawn} from 'node:child_process'
import {readFileSync, existsSync} from 'node:fs'
import {resolve} from 'node:path'

const ENV_FILE = resolve(process.cwd(), '.env.local')

function loadEnvFile(path) {
    if (!existsSync(path)) return

    for (const rawLine of readFileSync(path, 'utf8').split('\n')) {
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue

        const separator = line.indexOf('=')
        if (separator === -1) continue

        const key = line.slice(0, separator).trim()
        if (!key || key in process.env) continue

        let value = line.slice(separator + 1).trim()
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1)
        }

        process.env[key] = value
    }
}

loadEnvFile(ENV_FILE)

const child = spawn('vercel', ['dev', ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: process.env,
})

child.on('exit', (code, signal) => {
    if (signal) {
        process.kill(process.pid, signal)
        return
    }
    process.exit(code ?? 0)
})
