/* Admin · Premios de Ruleta + Usuarios + Canjes */

const WHEEL_SEGMENTS_INIT = [
  { id:1, label:'Café gratis',     color:'#c8102e', odds: 18, entregados: 412 },
  { id:2, label:'10% OFF',         color:'#b8863a', odds: 16, entregados: 198 },
  { id:3, label:'5% OFF',          color:'#3b82f6', odds: 20, entregados: 156 },
  { id:4, label:'Sin premio',      color:'#525252', odds: 14, entregados: 142 },
  { id:5, label:'2x1 cine',        color:'#10b981', odds:  8, entregados:  79 },
  { id:6, label:'Postre gratis',   color:'#a855f7', odds: 10, entregados:  43 },
  { id:7, label:'Estacionam. 2h',  color:'#f59e0b', odds: 10, entregados:  31 },
  { id:8, label:'¡Premio mayor!',  color:'#8e0a1f', odds:  4, entregados:   8 },
];

function PremiosRuleta() {
  const [segs, setSegs] = React.useState(WHEEL_SEGMENTS_INIT);
  const [editing, setEditing] = React.useState(null);
  const [draftLabel, setDraftLabel] = React.useState('');

  const startEdit = (id, label) => { setEditing(id); setDraftLabel(label); };
  const saveEdit = () => {
    setSegs(segs.map(s => s.id === editing ? {...s, label: draftLabel || s.label} : s));
    setEditing(null);
  };

  // SVG wheel rendering
  const W = 260;
  const cx = W / 2, cy = W / 2, R = W / 2 - 8;
  const segAngle = 360 / segs.length;
  const polarToXY = (cx, cy, r, deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  return (
    <div className="ad-content">
      <PageHead title="Premios de Ruleta" sub="Configurá los 8 segmentos de la ruleta semanal del club">
        <button className="ad-btn ghost"><Icon.Eye/> Vista previa</button>
        <button className="ad-btn primary"><Icon.Check/> Guardar cambios</button>
      </PageHead>

      <div style={{display:'grid', gridTemplateColumns:'380px 1fr', gap:18}}>
        {/* Wheel preview */}
        <div className="ad-card" style={{padding:24, display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div className="ad-card-head" style={{borderBottom:0, padding:0, width:'100%', marginBottom:18}}>
            <div>
              <h3>Vista previa</h3>
              <div className="sub">Como se ve en la app</div>
            </div>
            <span className="ad-badge gold plain">8 segmentos</span>
          </div>
          <div style={{position:'relative', width: W, height: W}}>
            <div style={{position:'absolute', inset:-8, borderRadius:'50%', background:'conic-gradient(from 0deg, #b8863a, #c8102e, #b8863a, #c8102e, #b8863a)', filter:'blur(2px)', opacity:0.6}}/>
            <svg viewBox={`0 0 ${W} ${W}`} style={{position:'relative', width:'100%', height:'100%', filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.4))'}}>
              {segs.map((s, i) => {
                const start = i * segAngle;
                const end = (i + 1) * segAngle;
                const [x1, y1] = polarToXY(cx, cy, R, start);
                const [x2, y2] = polarToXY(cx, cy, R, end);
                const large = segAngle > 180 ? 1 : 0;
                const path = `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} Z`;
                const [tx, ty] = polarToXY(cx, cy, R * 0.62, start + segAngle / 2);
                const rotate = start + segAngle / 2;
                return (
                  <g key={s.id}>
                    <path d={path} fill={s.color} stroke="#0a0a0a" strokeWidth="1.5"/>
                    <text x={tx} y={ty}
                      fill="#fff"
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="Plus Jakarta Sans"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${rotate}, ${tx}, ${ty})`}
                      style={{textShadow:'0 1px 2px rgba(0,0,0,0.4)'}}>
                      {s.label.length > 14 ? s.label.slice(0,12)+'…' : s.label}
                    </text>
                  </g>
                );
              })}
              <circle cx={cx} cy={cy} r={28} fill="#0f0f0f" stroke="#b8863a" strokeWidth="2"/>
              <text x={cx} y={cy} fill="#b8863a" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans" textAnchor="middle" dominantBaseline="middle" letterSpacing="1">GIRAR</text>
            </svg>
            {/* pointer */}
            <div style={{position:'absolute', top:-4, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'10px solid transparent', borderRight:'10px solid transparent', borderTop:'18px solid var(--ad-gold)'}}/>
          </div>

          <div style={{marginTop:20, width:'100%', padding:'12px 14px', background:'var(--ad-surface-2)', borderRadius:8, border:'1px solid var(--ad-line)'}}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <Icon.Sparkles style={{color:'var(--ad-gold)', width:16, height:16}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:12.5, fontWeight:600}}>Frecuencia de giro</div>
                <div style={{fontSize:11.5, color:'var(--ad-muted)', marginTop:2}}>Cada socio puede girar 1 vez por semana</div>
              </div>
              <button className="ad-btn subtle sm">Cambiar</button>
            </div>
          </div>
        </div>

        {/* Segments grid */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div>
              <h3>Segmentos</h3>
              <div className="sub">Tocá un segmento para editar el label</div>
            </div>
            <span style={{fontSize:12, color:'var(--ad-muted)'}}>987 giros este mes</span>
          </div>
          <div style={{padding:18, display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12}}>
            {segs.map((s, i) => {
              const isEditing = editing === s.id;
              const totalEnt = segs.reduce((a,x)=>a+x.entregados, 0);
              const pct = (s.entregados / totalEnt * 100);
              return (
                <div key={s.id} style={{
                  background:'var(--ad-surface-2)',
                  border:'1px solid var(--ad-line)',
                  borderRadius:10,
                  padding:14,
                  position:'relative',
                  transition:'border-color 0.12s'
                }}>
                  <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:12}}>
                    <div style={{
                      width:28, height:28, borderRadius:7,
                      background: s.color,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#fff', fontSize:11, fontWeight:700,
                      boxShadow:`0 0 0 1px rgba(0,0,0,0.3) inset, 0 4px 12px ${s.color}55`
                    }}>{i+1}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10, color:'var(--ad-muted)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600}}>Segmento {i+1}</div>
                    </div>
                    <button className="ad-icon-btn" style={{width:26, height:26, border:0}} title="Cambiar color">
                      <span style={{width:14, height:14, borderRadius:4, background: s.color, border:'1px solid rgba(255,255,255,0.2)'}}/>
                    </button>
                  </div>

                  {isEditing ? (
                    <div style={{display:'flex', gap:6}}>
                      <input className="ad-input" autoFocus
                        value={draftLabel}
                        onChange={e => setDraftLabel(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditing(null); }}
                        style={{padding:'6px 10px', fontSize:13}}/>
                      <button className="ad-btn primary sm" onClick={saveEdit}><Icon.Check/></button>
                    </div>
                  ) : (
                    <div onClick={() => startEdit(s.id, s.label)} style={{
                      padding:'7px 10px',
                      background:'var(--ad-surface)',
                      border:'1px solid var(--ad-line)',
                      borderRadius:7,
                      fontSize:14, fontWeight:600,
                      cursor:'pointer',
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      gap:8
                    }}>
                      <span>{s.label}</span>
                      <Icon.Edit style={{color:'var(--ad-muted)', width:12, height:12}}/>
                    </div>
                  )}

                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:12}}>
                    <div>
                      <div style={{fontSize:10, color:'var(--ad-muted)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600}}>Probabilidad</div>
                      <div className="mono" style={{fontSize:14, fontWeight:600, marginTop:2}}>{s.odds}%</div>
                    </div>
                    <div>
                      <div style={{fontSize:10, color:'var(--ad-muted)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600}}>Entregados</div>
                      <div className="mono" style={{fontSize:14, fontWeight:600, marginTop:2}}>{s.entregados} <span style={{fontSize:11, color:'var(--ad-muted)', fontWeight:500}}>· {pct.toFixed(0)}%</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{padding:'12px 18px', borderTop:'1px solid var(--ad-line)', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--ad-surface-2)', borderRadius:'0 0 12px 12px'}}>
            <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--ad-muted)'}}>
              <Icon.Help/>
              <span>Las probabilidades deben sumar 100%. Total actual: <b style={{color:'var(--ad-ok)'}}>{segs.reduce((a,s)=>a+s.odds,0)}%</b></span>
            </div>
            <button className="ad-btn ghost sm">Ajustar probabilidades</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Usuarios ---------- */

const USERS_DATA = [
  { name:'María Fernández',  dni:'34.821.045', cred:'SL-2024-00142', reg:'12 feb 2024', estado:'activo', nivel:'Oro',   canjes: 24 },
  { name:'Diego Sosa',       dni:'28.114.609', cred:'SL-2024-01893', reg:'08 mar 2024', estado:'activo', nivel:'Plata', canjes: 11 },
  { name:'Laura Mendoza',    dni:'37.502.811', cred:'SL-2024-00471', reg:'21 feb 2024', estado:'activo', nivel:'Oro',   canjes: 31 },
  { name:'Federico Paz',     dni:'31.604.882', cred:'SL-2024-02104', reg:'14 abr 2024', estado:'activo', nivel:'Plata', canjes:  8 },
  { name:'Camila Ríos',      dni:'40.119.207', cred:'SL-2024-00908', reg:'02 mar 2024', estado:'activo', nivel:'Bronce',canjes:  3 },
  { name:'Joaquín Vargas',   dni:'29.811.554', cred:'SL-2024-01024', reg:'18 ene 2024', estado:'pendiente', nivel:'—',  canjes:  0 },
  { name:'Sofía Bertelli',   dni:'35.227.119', cred:'SL-2024-00316', reg:'05 feb 2024', estado:'activo', nivel:'Oro',   canjes: 19 },
  { name:'Martín Casas',     dni:'27.901.336', cred:'SL-2023-04812', reg:'22 nov 2023', estado:'inactivo', nivel:'Plata',canjes: 47 },
  { name:'Valentina Lugo',   dni:'42.018.770', cred:'SL-2024-02211', reg:'19 abr 2024', estado:'activo', nivel:'Bronce',canjes:  2 },
  { name:'Esteban Aldao',    dni:'30.554.901', cred:'SL-2024-01601', reg:'27 mar 2024', estado:'activo', nivel:'Plata', canjes:  6 },
];

function Usuarios() {
  return (
    <div className="ad-content">
      <PageHead title="Usuarios" sub="2.847 socios registrados · 312 nuevos este mes">
        <button className="ad-btn ghost"><Icon.Mail/> Enviar campaña</button>
        <button className="ad-btn ghost"><Icon.Download/> Exportar</button>
      </PageHead>

      {/* mini stats */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:18}}>
        {[
          { lbl:'Total',     val:'2.847', d:'+12.4%', dir:'up' },
          { lbl:'Activos',   val:'2.501', d:'87.8%',  dir:'flat' },
          { lbl:'Nivel Oro', val:'412',   d:'+24',    dir:'up' },
          { lbl:'Nuevos (30d)', val:'312', d:'+8.1%', dir:'up' },
        ].map((s, i) => (
          <div key={i} style={{padding:'12px 14px', background:'var(--ad-surface)', border:'1px solid var(--ad-line)', borderRadius:10}}>
            <div style={{fontSize:11.5, color:'var(--ad-muted)', fontWeight:500}}>{s.lbl}</div>
            <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:6}}>
              <span style={{fontSize:20, fontWeight:700, letterSpacing:'-0.02em'}}>{s.val}</span>
              <span style={{fontSize:11.5, fontWeight:600, color: s.dir === 'up' ? 'var(--ad-ok)' : 'var(--ad-muted)'}}>{s.d}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap:8, marginBottom:14, alignItems:'center'}}>
        <div className="ad-search" style={{margin:0, width:300}}>
          <Icon.Search/>
          <input placeholder="Buscar por nombre, DNI o credencial…"/>
        </div>
        <div className="ad-filter">
          <Icon.Filter/>
          <span>Estado</span>
          <span className="v">Todos</span>
          <Icon.ChevronDown/>
        </div>
        <div className="ad-filter">
          <Icon.Award/>
          <span>Nivel</span>
          <span className="v">Todos</span>
          <Icon.ChevronDown/>
        </div>
        <div style={{flex:1}}/>
        <span style={{fontSize:12.5, color:'var(--ad-muted)'}}>{USERS_DATA.length} de 2.847</span>
      </div>

      <div className="ad-card" style={{padding:0, overflow:'hidden'}}>
        <table className="ad-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>DNI</th>
              <th>Credencial</th>
              <th>Registrado</th>
              <th>Nivel</th>
              <th style={{textAlign:'right'}}>Canjes</th>
              <th>Estado</th>
              <th style={{width:60}}></th>
            </tr>
          </thead>
          <tbody>
            {USERS_DATA.map((u, i) => (
              <tr key={i}>
                <td>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <Avatar name={u.name}/>
                    <span className="cell-strong">{u.name}</span>
                  </div>
                </td>
                <td><span className="mono cell-muted">{u.dni}</span></td>
                <td><span className="mono">{u.cred}</span></td>
                <td className="cell-muted">{u.reg}</td>
                <td>
                  {u.nivel === 'Oro' ? <span className="ad-badge gold">{u.nivel}</span> :
                   u.nivel === 'Plata' ? <span className="ad-badge plain" style={{background:'var(--ad-surface-3)', color:'var(--ad-ink-2)'}}>{u.nivel}</span> :
                   u.nivel === 'Bronce' ? <span className="ad-badge plain" style={{background:'rgba(184,134,58,0.06)', color:'var(--ad-gold)'}}>{u.nivel}</span> :
                   <span className="cell-muted">{u.nivel}</span>}
                </td>
                <td style={{textAlign:'right'}} className="mono cell-strong">{u.canjes}</td>
                <td>
                  {u.estado === 'activo' && <span className="ad-badge ok">Activo</span>}
                  {u.estado === 'pendiente' && <span className="ad-badge warn">Pendiente</span>}
                  {u.estado === 'inactivo' && <span className="ad-badge off">Inactivo</span>}
                </td>
                <td>
                  <div className="ad-row-actions">
                    <button className="ad-icon-btn" title="Ver"><Icon.Eye/></button>
                    <button className="ad-icon-btn" title="Más"><Icon.More/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--ad-line)', background:'var(--ad-surface-2)'}}>
          <span style={{fontSize:12, color:'var(--ad-muted)'}}>Mostrando 1–10 de 2.847</span>
          <div style={{display:'flex', gap:6, alignItems:'center'}}>
            <button className="ad-btn ghost sm">Anterior</button>
            <span style={{fontSize:12, color:'var(--ad-muted)', padding:'0 8px'}}>Página 1 de 285</span>
            <button className="ad-btn ghost sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Canjes ---------- */

const REDEMPTIONS_DATA = [
  { user:'María Fernández',  cred:'SL-2024-00142', ben:'30% OFF en cafetería',  local:'Café Martínez', cat:'Gastronomía', fecha:'04 may 2026 · 14:32', estado:'completado' },
  { user:'Diego Sosa',       cred:'SL-2024-01893', ben:'2x1 en combos',          local:'Mostaza',        cat:'Gastronomía', fecha:'04 may 2026 · 14:18', estado:'completado' },
  { user:'Laura Mendoza',    cred:'SL-2024-00471', ben:'Hasta 40% OFF',          local:'Grimoldi',       cat:'Moda',        fecha:'04 may 2026 · 13:54', estado:'completado' },
  { user:'Federico Paz',     cred:'SL-2024-02104', ben:'Entrada + combo',        local:'Showcase',       cat:'Entretenim.', fecha:'04 may 2026 · 13:21', estado:'completado' },
  { user:'Camila Ríos',      cred:'SL-2024-00908', ben:'15% OFF productos',      local:'Farmacity',      cat:'Salud',       fecha:'04 may 2026 · 12:48', estado:'completado' },
  { user:'Sofía Bertelli',   cred:'SL-2024-00316', ben:'30% OFF en cafetería',  local:'Café Martínez', cat:'Gastronomía', fecha:'04 may 2026 · 12:11', estado:'completado' },
  { user:'Joaquín Vargas',   cred:'SL-2024-01024', ben:'2x1 en combos',          local:'Mostaza',        cat:'Gastronomía', fecha:'04 may 2026 · 11:47', estado:'cancelado'  },
  { user:'Esteban Aldao',    cred:'SL-2024-01601', ben:'Envío gratis +$15.000', local:'Tienda Hogar',  cat:'Hogar',       fecha:'04 may 2026 · 11:32', estado:'completado' },
  { user:'Valentina Lugo',   cred:'SL-2024-02211', ben:'Tarjeta SUBE +$500',    local:'Servicios',      cat:'Servicios',   fecha:'04 may 2026 · 10:58', estado:'completado' },
  { user:'María Fernández',  cred:'SL-2024-00142', ben:'2x1 manicura',           local:'Studio Nails',  cat:'Salud',       fecha:'03 may 2026 · 18:14', estado:'completado' },
  { user:'Martín Casas',     cred:'SL-2023-04812', ben:'25% OFF segunda unidad',local:"Levi's",         cat:'Moda',        fecha:'03 may 2026 · 17:02', estado:'completado' },
  { user:'Diego Sosa',       cred:'SL-2024-01893', ben:'30% OFF en cafetería',  local:'Café Martínez', cat:'Gastronomía', fecha:'03 may 2026 · 15:41', estado:'completado' },
];

function Canjes() {
  return (
    <div className="ad-content">
      <PageHead title="Canjes" sub="Historial completo de canjes en el shopping">
        <div className="ad-seg">
          <button className="on">Hoy</button>
          <button>Esta semana</button>
          <button>Este mes</button>
          <button>Personalizado</button>
        </div>
        <button className="ad-btn ghost"><Icon.Download/> Exportar CSV</button>
      </PageHead>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:18}}>
        {[
          { lbl:'Hoy',       val:'47',    sub:'+12 vs ayer' },
          { lbl:'Esta semana', val:'312', sub:'+8.1%' },
          { lbl:'Este mes',  val:'1.412', sub:'+8.1%' },
          { lbl:'Tasa de cancelación', val:'2.4%', sub:'34 cancelados' },
        ].map((s, i) => (
          <div key={i} style={{padding:'12px 14px', background:'var(--ad-surface)', border:'1px solid var(--ad-line)', borderRadius:10}}>
            <div style={{fontSize:11.5, color:'var(--ad-muted)', fontWeight:500}}>{s.lbl}</div>
            <div style={{fontSize:20, fontWeight:700, marginTop:6, letterSpacing:'-0.02em'}}>{s.val}</div>
            <div style={{fontSize:11.5, color:'var(--ad-muted)', marginTop:4}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap:8, marginBottom:14, alignItems:'center'}}>
        <div className="ad-search" style={{margin:0, width:300}}>
          <Icon.Search/>
          <input placeholder="Buscar por usuario o credencial…"/>
        </div>
        <div className="ad-filter">
          <Icon.Tag/>
          <span>Beneficio</span>
          <span className="v">Todos</span>
          <Icon.ChevronDown/>
        </div>
        <div className="ad-filter">
          <Icon.Building/>
          <span>Local</span>
          <span className="v">Todos</span>
          <Icon.ChevronDown/>
        </div>
        <div className="ad-filter">
          <Icon.Filter/>
          <span>Categoría</span>
          <span className="v">Todas</span>
          <Icon.ChevronDown/>
        </div>
        <div style={{flex:1}}/>
        <span style={{fontSize:12.5, color:'var(--ad-muted)'}}>{REDEMPTIONS_DATA.length} canjes</span>
      </div>

      <div className="ad-card" style={{padding:0, overflow:'hidden'}}>
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
            {REDEMPTIONS_DATA.map((r, i) => (
              <tr key={i}>
                <td>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <Avatar name={r.user}/>
                    <span className="cell-strong">{r.user}</span>
                  </div>
                </td>
                <td><span className="mono cell-muted">{r.cred}</span></td>
                <td className="cell-strong">{r.ben}</td>
                <td>{r.local}</td>
                <td><span className="ad-cat">{r.cat}</span></td>
                <td className="cell-muted">{r.fecha}</td>
                <td>
                  {r.estado === 'completado'
                    ? <span className="ad-badge ok">Completado</span>
                    : <span className="ad-badge off" style={{background:'var(--ad-danger-soft)', color:'var(--ad-danger)'}}>Cancelado</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--ad-line)', background:'var(--ad-surface-2)'}}>
          <span style={{fontSize:12, color:'var(--ad-muted)'}}>Mostrando 1–12 de 1.412</span>
          <div style={{display:'flex', gap:6, alignItems:'center'}}>
            <button className="ad-btn ghost sm">Anterior</button>
            <span style={{fontSize:12, color:'var(--ad-muted)', padding:'0 8px'}}>Página 1 de 118</span>
            <button className="ad-btn ghost sm">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PremiosRuleta, Usuarios, Canjes });
