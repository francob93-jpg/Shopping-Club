import { Heart, MessageCircle, Share2, Calendar } from 'lucide-react'

const CAT_GRADIENT = {
  gastro:    'linear-gradient(135deg, #c8102e 0%, #8e0a1f 100%)',
  moda:      'linear-gradient(135deg, #1a1423 0%, #3d3449 100%)',
  cine:      'linear-gradient(135deg, #0f4c81 0%, #1a6cb3 100%)',
  salud:     'linear-gradient(135deg, #1f7a4a 0%, #2ea868 100%)',
  hogar:     'linear-gradient(135deg, #b8863a 0%, #d4a855 100%)',
  servicios: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
}

const TAG_COLOR = {
  'NUEVO LOCAL': { bg: '#e6f4ed', color: '#1f7a4a' },
  'EVENTO':      { bg: '#fbe6ea', color: '#c8102e' },
  'HORARIO':     { bg: '#e8edf8', color: '#2d5bbf' },
}

const POSTS = [
  {
    when: 'hace 2h', tag: 'NUEVO LOCAL',
    title: 'Rapsodia abrió sus puertas',
    body: 'Ya podés visitar Rapsodia en el primer piso. 15% OFF de bienvenida presentando tu credencial del Club.',
    img: 'moda', likes: 124, comments: 18,
  },
  {
    when: 'ayer', tag: 'EVENTO',
    title: 'Show en vivo · sábado 26',
    body: 'Banda en el patio central a las 19hs. Entrada libre para socios del Club, cupo limitado.',
    img: 'cine', likes: 256, comments: 42,
  },
  {
    when: '21 abr', tag: 'HORARIO',
    title: 'Cambio de horario de apertura',
    body: 'Desde el lunes abrimos a las 10hs todos los días.',
    img: null, likes: 37, comments: 5,
  },
]

export default function Novedades() {
  return (
    <div>
      {/* Header */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Paseo de la Ribera
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, lineHeight: 1.1 }}>
            Novedades
          </div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
          <Calendar size={18} color="var(--ink)" strokeWidth={2} />
        </div>
      </div>

      {/* Feed */}
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {POSTS.map((p, i) => {
          const tagStyle = TAG_COLOR[p.tag] || { bg: 'var(--primary-soft)', color: 'var(--primary)' }
          return (
            <div key={i} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              {/* Author row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--primary)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 14,
                }}>
                  Pr
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Paseo de la Ribera</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--primary)">
                      <path d="M12 2l2 3 3 1 1 3 3 2-2 3v3l-3 2-1 3-3-1-2 3-2-3-3 1-1-3-3-2 2-3V9L5 6l1-3 3-1 3-3z"/>
                      <path d="M8 12l3 3 5-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{p.when}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', padding: '2px 7px', borderRadius: 999, background: tagStyle.bg, color: tagStyle.color }}>
                      {p.tag}
                    </span>
                  </div>
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 18, letterSpacing: 1, lineHeight: 1 }}>⋯</span>
              </div>

              {/* Image */}
              {p.img && (
                <div style={{ height: 180, background: CAT_GRADIENT[p.img], position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 12, left: 14, color: '#fff' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.9 }}>{p.tag}</div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, lineHeight: 1.2, color: 'var(--ink)' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.5 }}>
                  {p.body}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--muted)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <Heart size={18} strokeWidth={2} />
                    {p.likes}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--muted)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <MessageCircle size={18} strokeWidth={2} />
                    {p.comments}
                  </button>
                  <button style={{ marginLeft: 'auto', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                    <Share2 size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
