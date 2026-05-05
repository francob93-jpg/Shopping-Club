import { Search, Filter, Mail, Download, Eye, MoreHorizontal } from 'lucide-react'
import Avatar from '../components/Avatar'

const USERS_DATA = [
  { name: 'María Fernández', dni: '34.821.045', cred: 'PR-2024-00142', reg: '12 feb 2024', estado: 'activo', canjes: 24 },
  { name: 'Diego Sosa', dni: '28.114.609', cred: 'PR-2024-01893', reg: '08 mar 2024', estado: 'activo', canjes: 11 },
  { name: 'Laura Mendoza', dni: '37.502.811', cred: 'PR-2024-00471', reg: '21 feb 2024', estado: 'activo', canjes: 31 },
  { name: 'Federico Paz', dni: '31.604.882', cred: 'PR-2024-02104', reg: '14 abr 2024', estado: 'activo', canjes: 8 },
  { name: 'Camila Ríos', dni: '40.119.207', cred: 'PR-2024-00908', reg: '02 mar 2024', estado: 'activo', canjes: 3 },
  { name: 'Joaquín Vargas', dni: '29.811.554', cred: 'PR-2024-01024', reg: '18 ene 2024', estado: 'pendiente', canjes: 0 },
  { name: 'Sofía Bertelli', dni: '35.227.119', cred: 'PR-2024-00316', reg: '05 feb 2024', estado: 'activo', canjes: 19 },
  { name: 'Martín Casas', dni: '27.901.336', cred: 'PR-2023-04812', reg: '22 nov 2023', estado: 'inactivo', canjes: 47 },
  { name: 'Valentina Lugo', dni: '42.018.770', cred: 'PR-2024-02211', reg: '19 abr 2024', estado: 'activo', canjes: 2 },
  { name: 'Esteban Aldao', dni: '30.554.901', cred: 'PR-2024-01601', reg: '27 mar 2024', estado: 'activo', canjes: 6 },
]

const MINI_STATS = [
  { lbl: 'Total', val: '2.847', d: '+12.4%', dir: 'up' },
  { lbl: 'Activos', val: '2.501', d: '87.8%', dir: 'flat' },
  { lbl: 'Nuevos (30d)', val: '312', d: '+8.1%', dir: 'up' },
]

export default function Usuarios() {
  return (
    <div className="ad-content">
      {/* Page head */}
      <div className="ad-page-head">
        <div>
          <h1>Usuarios</h1>
          <p>2.847 socios registrados · 312 nuevos este mes</p>
        </div>
        <div className="ad-page-actions">
          <button className="ad-btn ghost">
            <Mail size={14} />
            Enviar campaña
          </button>
          <button className="ad-btn ghost">
            <Download size={14} />
            Exportar
          </button>
        </div>
      </div>

      {/* Mini stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
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
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ad-ink)' }}>
                {s.val}
              </span>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: s.dir === 'up' ? 'var(--ad-ok)' : 'var(--ad-muted)',
                }}
              >
                {s.d}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
        <div className="ad-page-search">
          <Search size={16} style={{ color: 'var(--ad-muted)', flexShrink: 0 }} />
          <input placeholder="Buscar por nombre, DNI o credencial…" />
        </div>
        <div className="ad-filter">
          <Filter size={14} style={{ color: 'var(--ad-muted)' }} />
          <span>Estado</span>
          <span className="fv">Todos</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12.5, color: 'var(--ad-muted)' }}>
          {USERS_DATA.length} de 2.847
        </span>
      </div>

      {/* Table */}
      <div className="ad-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ad-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>DNI</th>
              <th>Credencial</th>
              <th>Registrado</th>
              <th style={{ textAlign: 'right' }}>Canjes</th>
              <th>Estado</th>
              <th style={{ width: 60 }} />
            </tr>
          </thead>
          <tbody>
            {USERS_DATA.map((u, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={u.name} />
                    <span className="cell-strong">{u.name}</span>
                  </div>
                </td>
                <td>
                  <span className="mono cell-muted">{u.dni}</span>
                </td>
                <td>
                  <span className="mono" style={{ color: 'var(--ad-ink-2)' }}>{u.cred}</span>
                </td>
                <td className="cell-muted">{u.reg}</td>
                <td style={{ textAlign: 'right' }} className="mono cell-strong">
                  {u.canjes}
                </td>
                <td>
                  {u.estado === 'activo' && <span className="ad-badge ok">Activo</span>}
                  {u.estado === 'pendiente' && <span className="ad-badge warn">Pendiente</span>}
                  {u.estado === 'inactivo' && <span className="ad-badge off">Inactivo</span>}
                </td>
                <td>
                  <div className="ad-row-actions">
                    <button className="ad-icon-btn" title="Ver">
                      <Eye size={14} />
                    </button>
                    <button className="ad-icon-btn" title="Más">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
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
          <span style={{ fontSize: 12, color: 'var(--ad-muted)' }}>Mostrando 1–10 de 2.847</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button className="ad-btn ghost sm">Anterior</button>
            <span style={{ fontSize: 12, color: 'var(--ad-muted)', padding: '0 8px' }}>
              Página 1 de 285
            </span>
            <button className="ad-btn ghost sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  )
}
