import { useState } from 'react'

type Page = 'invite' | 'rsvp' | 'thanks'

function Leaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 75 C30 75 5 55 5 30 C5 15 17 5 30 5 C43 5 55 15 55 30 C55 55 30 75 30 75Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path d="M30 75 L30 5" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <path d="M30 30 C20 25 12 18 15 10" stroke="currentColor" strokeWidth="0.8" opacity="0.2" fill="none" />
      <path d="M30 30 C40 25 48 18 45 10" stroke="currentColor" strokeWidth="0.8" opacity="0.2" fill="none" />
    </svg>
  )
}

function Sprig({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 190 C60 190 60 10 60 10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="35" cy="80" rx="22" ry="12" transform="rotate(-30 35 80)" fill="currentColor" opacity="0.15" />
      <ellipse cx="85" cy="65" rx="22" ry="12" transform="rotate(30 85 65)" fill="currentColor" opacity="0.15" />
      <ellipse cx="30" cy="130" rx="18" ry="10" transform="rotate(-25 30 130)" fill="currentColor" opacity="0.12" />
      <ellipse cx="90" cy="115" rx="18" ry="10" transform="rotate(25 90 115)" fill="currentColor" opacity="0.12" />
      <ellipse cx="60" cy="40" rx="16" ry="9" fill="currentColor" opacity="0.13" />
    </svg>
  )
}

function GoldDivider({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-center gap-3 justify-center my-6">
      <div style={{ height: '1px', width: '60px', background: '#C9AA52', opacity: 0.7 }} />
      <svg
        className="twinkle"
        style={{ animationDelay: `${delay}s` }}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path d="M9 1 L10.5 7 L17 9 L10.5 11 L9 17 L7.5 11 L1 9 L7.5 7 Z" fill="#C9AA52" opacity="0.8" />
      </svg>
      <div style={{ height: '1px', width: '60px', background: '#C9AA52', opacity: 0.7 }} />
    </div>
  )
}

function InvitePage({ onRSVP }: { onRSVP: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-16"
      style={{ background: '#F5F0E1' }}
    >
      {/* Background botanical decorations */}
      <Sprig className="absolute left-0 top-0 w-32 h-52 text-[#6B9168] pointer-events-none select-none -translate-x-4 -translate-y-4" />
      <Sprig className="absolute right-0 bottom-0 w-32 h-52 text-[#6B9168] pointer-events-none select-none translate-x-4 translate-y-4 rotate-180" />
      <Leaf className="absolute left-10 bottom-20 w-12 h-16 text-[#8EBB9C] pointer-events-none select-none rotate-45" />
      <Leaf className="absolute right-12 top-24 w-10 h-14 text-[#8EBB9C] pointer-events-none select-none -rotate-30" />

      <div className="relative z-10 max-w-lg w-full text-center">

        {/* Together forever label */}
        <p
          className="tracking-[0.25em] uppercase text-xs mb-4"
          style={{ color: '#6B9168', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}
        >
          Together Forever
        </p>

        {/* Names */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            color: '#2D3B31',
            fontSize: 'clamp(2.8rem, 8vw, 5rem)',
            lineHeight: 1.05,
            fontWeight: 300,
            letterSpacing: '-0.01em',
          }}
        >
          Lucy
          <br />
          <span style={{ color: '#C9AA52', fontStyle: 'italic', fontWeight: 300 }}>&</span>
          <br />
          Caleb
        </h1>

        <GoldDivider delay={0} />

        {/* Wedding details */}
        <div className="space-y-2 mb-6">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: '#2D3B31',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            Saturday, 11th October 2025
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: '#6B9168',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            10:30 AM
          </p>
          <a
            href="https://www.google.com/maps/search/CITAM+Buruburu+Nairobi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: '#2D3B31',
              opacity: 0.75,
              textDecoration: 'none',
              borderBottom: '1px dashed rgba(45,59,49,0.35)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.75' }}
          >
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" style={{ flexShrink: 0 }}>
              <path d="M5.5 0C3.015 0 1 2.015 1 4.5c0 3.375 4.5 8.5 4.5 8.5S10 7.875 10 4.5C10 2.015 7.985 0 5.5 0Zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="currentColor" />
            </svg>
            CITAM Buruburu, Nairobi
          </a>
        </div>

        {/* RSVP by notice */}
        <div
          className="inline-block px-5 py-2 mb-8 rounded"
          style={{ background: '#2D3B31', color: '#F5F0E1' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Kindly RSVP by 6th October 2025
          </p>
        </div>

        {/* RSVP Button */}
        <div className="flex justify-center">
          <button
            onClick={onRSVP}
            className="group relative overflow-hidden transition-all duration-300"
            style={{
              background: '#C9AA52',
              color: '#2D3B31',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '1rem 3rem',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#2D3B31'
              ;(e.currentTarget as HTMLButtonElement).style.color = '#C9AA52'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#C9AA52'
              ;(e.currentTarget as HTMLButtonElement).style.color = '#2D3B31'
            }}
          >
            RSVP Now
          </button>
        </div>

        {/* Bottom botanical flourish */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-30">
          <Leaf className="w-5 h-7 text-[#6B9168]" />
          <div style={{ width: '40px', height: '1px', background: '#6B9168' }} />
          <Leaf className="w-5 h-7 text-[#6B9168] rotate-180" />
        </div>
      </div>
    </div>
  )
}

function RSVPPage({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    onSubmit(name.trim())
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-16"
      style={{ background: '#2D3B31' }}
    >
      {/* Decorations */}
      <Sprig className="absolute left-0 top-0 w-28 h-48 text-[#6B9168] pointer-events-none select-none -translate-x-2" />
      <Sprig className="absolute right-0 bottom-0 w-28 h-48 text-[#6B9168] pointer-events-none select-none translate-x-2 rotate-180" />

      <div className="relative z-10 max-w-md w-full text-center">

        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: '#8EBB9C',
            fontSize: '0.75rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Lucy & Caleb
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F5F0E1',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}
        >
          Will you be joining us?
        </h2>

        <GoldDivider delay={0.8} />

        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: '#8EBB9C',
            fontSize: '0.9rem',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Please let us know you're coming by entering your name below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-left">
            <label
              htmlFor="guestName"
              style={{
                fontFamily: 'var(--font-body)',
                color: '#C9AA52',
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Guest Name
            </label>
            <input
              id="guestName"
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              placeholder="Your full name"
              style={{
                background: 'transparent',
                border: '1px solid rgba(200, 170, 82, 0.45)',
                borderRadius: 0,
                padding: '0.9rem 1.2rem',
                color: '#F5F0E1',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                outline: 'none',
                width: '100%',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#C9AA52' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200, 170, 82, 0.45)' }}
            />
            {error && (
              <p style={{ color: '#C9AA52', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              background: '#C9AA52',
              color: '#2D3B31',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '1rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#F5F0E1'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#C9AA52'
            }}
          >
            Confirm RSVP
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2 opacity-20">
          <Leaf className="w-5 h-7 text-[#8EBB9C]" />
          <div style={{ width: '40px', height: '1px', background: '#8EBB9C' }} />
          <Leaf className="w-5 h-7 text-[#8EBB9C] rotate-180" />
        </div>
      </div>
    </div>
  )
}

function AddToCalendar() {
  const [open, setOpen] = useState(false)

  const googleUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=Lucy+%26+Caleb+Wedding' +
    '&dates=20251011T073000Z%2F20251011T110000Z' +
    '&details=Wedding+ceremony+for+Lucy+%26+Caleb' +
    '&location=CITAM+Buruburu%2C+Nairobi'

  const downloadIcs = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lucy & Caleb Wedding//EN',
      'BEGIN:VEVENT',
      'UID:lucy-caleb-wedding-2025@citamburuburu',
      'DTSTAMP:20250928T000000Z',
      'DTSTART:20251011T073000Z',
      'DTEND:20251011T110000Z',
      'SUMMARY:Lucy & Caleb Wedding',
      'DESCRIPTION:Wedding ceremony for Lucy & Caleb',
      'LOCATION:CITAM Buruburu\\, Nairobi',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lucy-caleb-wedding.ics'
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  const btnBase: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '0.65rem 1.2rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#2D3B31',
    textAlign: 'left',
    transition: 'background 0.15s',
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'transparent',
          color: '#2D3B31',
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          padding: '0.75rem 1.6rem',
          border: '1px solid #C9AA52',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = '#C9AA52'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <rect x="0.5" y="1.5" width="12" height="11" rx="1" stroke="#C9AA52" strokeWidth="1" />
          <path d="M0.5 4.5h12" stroke="#C9AA52" strokeWidth="1" />
          <path d="M4 0.5v2M9 0.5v2" stroke="#C9AA52" strokeWidth="1" strokeLinecap="round" />
        </svg>
        Add to Calendar
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#F5F0E1',
            border: '1px solid rgba(45,59,49,0.18)',
            minWidth: '180px',
            boxShadow: '0 4px 20px rgba(45,59,49,0.12)',
            zIndex: 10,
          }}
        >
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...btnBase, textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#EDE8D5' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
            onClick={() => setOpen(false)}
          >
            Google Calendar
          </a>
          <button
            style={btnBase}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#EDE8D5' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
            onClick={downloadIcs}
          >
            Apple / iCal (.ics)
          </button>
        </div>
      )}
    </div>
  )
}

function ThanksPage({ guestName, onHome }: { guestName: string; onHome: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-16"
      style={{ background: '#F5F0E1' }}
    >
      <Sprig className="absolute left-0 top-0 w-36 h-56 text-[#6B9168] pointer-events-none select-none -translate-x-4" />
      <Sprig className="absolute right-0 bottom-0 w-36 h-56 text-[#6B9168] pointer-events-none select-none translate-x-4 rotate-180" />
      <Leaf className="absolute right-16 top-16 w-12 h-16 text-[#8EBB9C] pointer-events-none select-none -rotate-12" />
      <Leaf className="absolute left-16 bottom-16 w-10 h-14 text-[#8EBB9C] pointer-events-none select-none rotate-12" />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Gold star / sparkle — twinkling */}
        <div className="flex justify-center mb-6">
          <svg className="twinkle" style={{ animationDelay: '0.4s' }} width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 2 L20.5 14.5 L33 18 L20.5 21.5 L18 34 L15.5 21.5 L3 18 L15.5 14.5 Z" fill="#C9AA52" opacity="0.85" />
          </svg>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: '#6B9168',
            fontSize: '0.75rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Thank You
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            color: '#2D3B31',
            fontSize: 'clamp(2.2rem, 7vw, 4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.1,
            marginBottom: '0.25rem',
          }}
        >
          {guestName || 'Dear Guest'}
        </h2>

        <GoldDivider delay={1.6} />

        <p
          style={{
            fontFamily: 'var(--font-display)',
            color: '#2D3B31',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            marginBottom: '1rem',
            fontWeight: 400,
          }}
        >
          We're so glad you'll be celebrating with us.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: '#6B9168',
            fontSize: '0.88rem',
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}
        >
          Your presence means the world to Lucy & Caleb.<br />
          We look forward to sharing this special day with you.
        </p>

        {/* Event reminder card */}
        <div
          className="mx-auto max-w-xs text-left p-6"
          style={{
            background: '#2D3B31',
            borderLeft: '3px solid #C9AA52',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', color: '#8EBB9C', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Event Details
          </p>
          <div className="space-y-2">
            <div className="flex justify-between gap-4">
              <span style={{ fontFamily: 'var(--font-body)', color: '#F5F0E1', fontSize: '0.82rem', opacity: 0.6 }}>Date</span>
              <span style={{ fontFamily: 'var(--font-body)', color: '#F5F0E1', fontSize: '0.82rem' }}>Saturday, 11th Oct 2025</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ fontFamily: 'var(--font-body)', color: '#F5F0E1', fontSize: '0.82rem', opacity: 0.6 }}>Time</span>
              <span style={{ fontFamily: 'var(--font-body)', color: '#F5F0E1', fontSize: '0.82rem' }}>10:30 AM</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ fontFamily: 'var(--font-body)', color: '#F5F0E1', fontSize: '0.82rem', opacity: 0.6 }}>Venue</span>
              <span style={{ fontFamily: 'var(--font-body)', color: '#F5F0E1', fontSize: '0.82rem', textAlign: 'right' }}>CITAM Buruburu, Nairobi</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <AddToCalendar />
        </div>

        {/* Back to home button */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={onHome}
            style={{
              background: 'transparent',
              color: '#2D3B31',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '0.75rem 2rem',
              border: '1px solid #2D3B31',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#2D3B31'
              ;(e.currentTarget as HTMLButtonElement).style.color = '#F5F0E1'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLButtonElement).style.color = '#2D3B31'
            }}
          >
            Return to Home
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
          <Leaf className="w-5 h-7 text-[#6B9168]" />
          <div style={{ width: '40px', height: '1px', background: '#6B9168' }} />
          <Leaf className="w-5 h-7 text-[#6B9168] rotate-180" />
        </div>

        {/* Footer */}
        <p
          className="mt-6"
          style={{
            fontFamily: 'var(--font-body)',
            color: '#6B9168',
            fontSize: '0.75rem',
            opacity: 0.8,
          }}
        >
          Made with{' '}
          <span style={{ color: '#C9AA52', fontSize: '0.9rem' }}>♥</span>
          {' '}by{' '}
          <a
            href="mailto:anthonyangatia@gmail.com"
            style={{
              color: '#2D3B31',
              fontWeight: 700,
              textDecoration: 'none',
              borderBottom: '1px solid #C9AA52',
              paddingBottom: '1px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#6B9168' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#2D3B31' }}
          >
            Angatia
          </a>
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('invite')
  const [guestName, setGuestName] = useState('')

  const handleRSVP = () => setPage('rsvp')
  const handleSubmit = (name: string) => {
    setGuestName(name)
    setPage('thanks')
  }

  return (
    <div>
      {page === 'invite' && <InvitePage onRSVP={handleRSVP} />}
      {page === 'rsvp' && <RSVPPage onSubmit={handleSubmit} />}
      {page === 'thanks' && <ThanksPage guestName={guestName} onHome={() => setPage('invite')} />}
    </div>
  )
}
