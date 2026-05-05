import { Search, Filter, Building2, Tag, Download } from 'lucide-react'
import Avatar from '../components/Avatar'

const REDEMPTIONS = [
  { user: 'María Fernández', cred: 'SL-2024-00142', ben: '30% OFF en cafetería', local: 'Café Martínez', cat: 'Gastronomía', fecha: '04 may 2026 · 14:32', estado: 'completado' },
  { user: 'Diego Sosa', cred: 'SL-2024-01893', ben: '2x1 en combos', local: 'Mostaza', cat: 'Gastronomía', fecha: '04 may 2026 · 14:18', estado: 'completado' },
  { user: 'Laura Mendoza', cred: 'SL-2024-00471', ben: 'Hasta 40% OFF', local: 'Grimoldi', cat: 'Moda', fecha: '04 may 2026 · 13:54', estado: 'completado' },
  { user: 'Federico Paz', cred: 'SL-2024-02104', ben: 'Entrada + combo', local: 'Showcase', cat: 'Entretenim.', fecha: '04 may 2026 · 13:21', estado: 'completado' },
  { user: 'Camila Ríos', cred: 'SL-2024-00908', ben: '15% OFF productos', local: 'Farmacity', cat: 'Salud', fecha: '04 may 2026 · 12:48', estado: 'completado' },
  { user: 'Sofía Bertelli', cred: 'SL-2024-00316', ben: '30% OFF en cafetería', local: 'Café Martínez', cat: 'Gastronomía', fecha: '04 may 2026 · 12:11', estado: 'completado' },
  { user: 'Joaquín Vargas', cred: 'SL-2024-01024', ben: '2x1 en combos', local: 'Mostaza', cat: 'Gastronomía', fecha: '04 may 2026 · 11:47', estado: 'cancelado' },
  { user: 'Esteban Aldao', cred: 'SL-2024-01601', ben: 'Envío gratis +$15.000', local: 'Tienda Hogar', cat: 'Hogar', fecha: '04 may 2026 · 11:32', estado: 'completado' },
  { user: 'Valentina Lugo', cred: 'SL-2024-02211', ben: 'Tarjeta SUBE +$500', local: 'Servicios', cat: 'Servicios', fecha: '04 may 2026 · 10:58', estado: 'completado' },
  { user: 'María Fernández', cred: 'SL-2024-00142', ben: '2x1 manicura', local: 'Studio Nails', cat: 'Salud', fecha: '03 may 2026 · 18:14', estado: 'completado' },
  { user: 'Martín Casas', cred: 'SL-2023-04812', ben: '25% OFF segunda unidad', local: "Levi's", cat: 'Moda', fecha: '03 may 2026 · 17:02', estado: 'completado' },
  { user: 'Diego Sosa', cred: 'SL-2024-01893', ben: '30% OFF en cafetería', local: 'Café Martínez', cat: 'Gastronomía', fecha: '03 may 2026 · 15:41', estado: 'completado' },
]

const MINI_STATS = [
  { lbl: 'Hoy', val: '47', sub: '+12 vs ayer' },
  { lbl: 'Esta semana', val: '312', sub: '+8.1%' },
  { lbl: 'Este mes', val: '1.412', sub: '+8.1%' },
  { lbl: 'Tasa de cancelación', val: '2.4%', sub: '34 cancelados' },
]

export default function Canjes() {
  return (
    <div className="ad-content">
      {/* Page head */}
      <div className="ad-page-head">
        <div>
          <h1>Canjes</h1>
          <p>Historial completo de canjes en el shopping</p>
        </div>
        <div className="ad-page-actions">
          <div className="ad-seg">
            <button className="on">Hoy</button>
            <button>Esta semana</button>
            <button>Este mes</button>
            <button>Personalizado</button>
          </div>
          <button className="ad-btn ghost">
            <Download size={14} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Mini stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {MINI_STATS.map((s, i) => (
          <div
            key={i}
            style={{
              padding: '12px 14px',
              background: 'var(--ad-surface)',
              border: '1px solid var(--ad-line)',
              borderRadius: 10,
            }}
          >
            <div style={{ fontSize: 11.5, color: 'var(--ad-muted)', fontWeight: 500 }}>{s.lbl}</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginTop: 6,
                letterSpacing: '-0.02em',
                color: 'var(--ad-ink)',
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--ad-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
        <div className="ad-page-search">
          <Search size={16} style={{ color: 'var(--ad-muted)', flexShrink: 0 }} />
          <input placeholder="Buscar por usuario o credencial…" />
        </div>
        <div className="ad-filter">
          <Tag size={14} style={{ color: 'var(--ad-muted)' }} />
          <span>Beneficio</span>
          <span className="fv">Todos</span>
        </div>
        <div className="ad-filter">
          <Building2 size={14} style={{ color: 'var(--ad-muted)' }} />
          <span>Local</span>
          <span className="fv">Todos</span>
        </div>
        <div className="ad-filter">
          <Filter size={14} style={{ color: 'var(--ad-muted)' }} />
          <span>Categoría</span>
          <span className="fv">Todas</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12.5, color: 'var(--ad-muted)' }}>
          {REDEMPTIONS.length} canjes
        </span>
      </div>

      {/* Table */}
      <div className="ad-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ad-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Credencial</th>
              <th>Beneficio</th>
              <th>Local</th>
              <th>Categoría</th>
              <th>Fecha y hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {REDEMPTIONS.map((r, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={r.user} />
                    <span className="cell-strong">{r.user}</span>
                  </div>
                </td>
                <td>
                  <span className="mono cell-muted">{r.cred}</span>
                </td>
                <td className="cell-strong">{r.ben}</td>
                <td style={{ color: 'var(--ad-ink-2)' }}>{r.local}</td>
                <td>
                  <span className="ad-cat">{r.cat}</span>
                </td>
                <td className="cell-muted">{r.fecha}</td>
                <td>
                  {r.estado === 'completado' ? (
                    <span className="ad-badge ok">Completado</span>
                  ) : (
                    <span className="ad-badge cancelled">Cancelado</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            padding: '10px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--ad-line)',
            background: 'var(--ad-surface-2)',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--ad-muted)' }}>
            Mostrando 1–12 de 1.412
          </span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button className="ad-btn ghost sm">Anterior</button>
            <span style={{ fontSize: 12, color: 'var(--ad-muted)', padding: '0 8px' }}>
              Página 1 de 118
            </span>
            <button className="ad-btn ghost sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  )
}
