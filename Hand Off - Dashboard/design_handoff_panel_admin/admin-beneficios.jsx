/* Admin · Beneficios (tabla + modal) */

const BENEFITS_DATA = [
  { id:1, t:'30% OFF en cafetería', local:'Café Martínez', loc:'L12', cat:'Gastronomía', badge:'-30%', vence:'30 abr 2026', dias:'Lun a Vie', activo:true, canjes:312 },
  { id:2, t:'2x1 en combos', local:'Mostaza', loc:'L203', cat:'Gastronomía', badge:'2x1', vence:'28 abr 2026', dias:'Todos', activo:true, canjes:248 },
  { id:3, t:'Hasta 40% OFF', local:'Grimoldi', loc:'L08', cat:'Moda', badge:'-40%', vence:'15 may 2026', dias:'Todos', activo:true, canjes:187 },
  { id:4, t:'Entrada + combo', local:'Showcase', loc:'3er piso', cat:'Entretenimiento', badge:'-25%', vence:'31 may 2026', dias:'Miércoles', activo:true, canjes:142 },
  { id:5, t:'15% OFF productos', local:'Farmacity', loc:'PB', cat:'Salud', badge:'-15%', vence:'30 jun 2026', dias:'Todos', activo:true, canjes:98 },
  { id:6, t:'Envío gratis +$15.000', local:'Tienda Hogar', loc:'L156', cat:'Hogar', badge:'Envío', vence:'15 may 2026', dias:'Todos', activo:true, canjes:74 },
  { id:7, t:'25% OFF segunda unidad', local:'Levi\'s', loc:'L24', cat:'Moda', badge:'-25%', vence:'12 may 2026', dias:'Todos', activo:false, canjes:62 },
  { id:8, t:'Tarjeta SUBE +$500', local:'Servicios', loc:'PB', cat:'Servicios', badge:'+$500', vence:'05 may 2026', dias:'Lun a Vie', activo:true, canjes:51 },
  { id:9, t:'2x1 manicura', local:'Studio Nails', loc:'L88', cat:'Salud', badge:'2x1', vence:'25 abr 2026', dias:'Mar a Jue', activo:true, canjes:38 },
  { id:10, t:'10% OFF compra total', local:'Coto', loc:'Subsuelo', cat:'Gastronomía', badge:'-10%', vence:'30 abr 2026', dias:'Todos', activo:false, canjes:0 },
];

const CATEGORIES = ['Gastronomía', 'Moda', 'Entretenimiento', 'Salud', 'Hogar', 'Servicios', 'Belleza'];
const LOCALES = ['Café Martínez', 'Mostaza', 'Grimoldi', 'Showcase', 'Farmacity', 'Tienda Hogar', "Levi's", 'Studio Nails', 'Coto'];

function Beneficios() {
  const [showModal, setShowModal] = React.useState(false);
  const [filter, setFilter] = React.useState('todos');
  const [items, setItems] = React.useState(BENEFITS_DATA);

  const counts = {
    todos: items.length,
    activos: items.filter(i => i.activo).length,
    pausados: items.filter(i => !i.activo).length,
    venciendo: 3,
  };

  const filtered = items.filter(i => {
    if (filter === 'activos') return i.activo;
    if (filter === 'pausados') return !i.activo;
    return true;
  });

  const toggleActive = (id) => {
    setItems(items.map(i => i.id === id ? {...i, activo: !i.activo} : i));
  };

  return (
    <div className="ad-content">
      <PageHead title="Beneficios" sub="Gestioná los beneficios visibles en la app del club">
        <button className="ad-btn ghost"><Icon.Download/> Exportar</button>
        <button className="ad-btn primary" onClick={() => setShowModal(true)}>
          <Icon.Plus/> Nuevo beneficio
        </button>
      </PageHead>

      <div className="ad-tabs">
        <button className={filter==='todos'?'on':''} onClick={()=>setFilter('todos')}>Todos · {counts.todos}</button>
        <button className={filter==='activos'?'on':''} onClick={()=>setFilter('activos')}>Activos · {counts.activos}</button>
        <button className={filter==='pausados'?'on':''} onClick={()=>setFilter('pausados')}>Pausados · {counts.pausados}</button>
        <button className={filter==='venciendo'?'on':''} onClick={()=>setFilter('venciendo')}>Por vencer · {counts.venciendo}</button>
      </div>

      {/* filter bar */}
      <div style={{display:'flex', gap:8, marginBottom:14, alignItems:'center'}}>
        <div className="ad-filter">
          <Icon.Filter/>
          <span>Categoría</span>
          <span className="v">Todas</span>
          <Icon.ChevronDown/>
        </div>
        <div className="ad-filter">
          <Icon.Building/>
          <span>Local</span>
          <span className="v">Todos</span>
          <Icon.ChevronDown/>
        </div>
        <div className="ad-filter">
          <Icon.Calendar/>
          <span>Vencimiento</span>
          <span className="v">Cualquiera</span>
          <Icon.ChevronDown/>
        </div>
        <div style={{flex:1}}/>
        <span style={{fontSize:12.5, color:'var(--ad-muted)'}}>{filtered.length} beneficios</span>
      </div>

      <div className="ad-card" style={{padding:0, overflow:'hidden'}}>
        <table className="ad-table">
          <thead>
            <tr>
              <th style={{width:36}}>
                <input type="checkbox" style={{accentColor:'var(--ad-primary)'}}/>
              </th>
              <th>Beneficio</th>
              <th>Local</th>
              <th>Categoría</th>
              <th>Vencimiento</th>
              <th style={{textAlign:'right'}}>Canjes</th>
              <th>Estado</th>
              <th style={{width:60}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td>
                  <input type="checkbox" style={{accentColor:'var(--ad-primary)'}}/>
                </td>
                <td>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <div style={{
                      minWidth:42, height:30, borderRadius:6,
                      background:'var(--ad-primary-soft)', color:'var(--ad-primary)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:11, fontWeight:700, padding:'0 6px'
                    }}>{b.badge}</div>
                    <span className="cell-strong">{b.t}</span>
                  </div>
                </td>
                <td>
                  <div style={{lineHeight:1.3}}>
                    <div className="cell-strong" style={{fontSize:13}}>{b.local}</div>
                    <div className="cell-muted" style={{fontSize:11}}>{b.loc}</div>
                  </div>
                </td>
                <td><span className="ad-cat">{b.cat}</span></td>
                <td>
                  <div style={{display:'flex', alignItems:'center', gap:6}}>
                    <Icon.Calendar style={{color:'var(--ad-muted)'}}/>
                    <span>{b.vence}</span>
                  </div>
                  <div className="cell-muted" style={{fontSize:11, marginTop:2}}>{b.dias}</div>
                </td>
                <td style={{textAlign:'right'}}>
                  <span className="mono cell-strong">{b.canjes}</span>
                </td>
                <td>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span className={`ad-toggle ${b.activo ? 'on' : ''}`} onClick={() => toggleActive(b.id)}/>
                    <span style={{fontSize:12, color: b.activo ? 'var(--ad-ok)' : 'var(--ad-muted)'}}>
                      {b.activo ? 'Activo' : 'Pausado'}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="ad-row-actions">
                    <button className="ad-icon-btn" title="Editar"><Icon.Edit/></button>
                    <button className="ad-icon-btn" title="Más"><Icon.More/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--ad-line)', background:'var(--ad-surface-2)'}}>
          <span style={{fontSize:12, color:'var(--ad-muted)'}}>Mostrando 1–{filtered.length} de {items.length}</span>
          <div style={{display:'flex', gap:6}}>
            <button className="ad-btn ghost sm">Anterior</button>
            <button className="ad-btn ghost sm">Siguiente</button>
          </div>
        </div>
      </div>

      {showModal && <BenefitModal onClose={() => setShowModal(false)}/>}
    </div>
  );
}

function BenefitModal({ onClose }) {
  const [activo, setActivo] = React.useState(true);
  const [days, setDays] = React.useState({ L:true, M:true, X:true, J:true, V:true, S:false, D:false });
  const [badge, setBadge] = React.useState('-30%');
  const dayLabels = [['L','Lun'],['M','Mar'],['X','Mié'],['J','Jue'],['V','Vie'],['S','Sáb'],['D','Dom']];

  return (
    <div className="ad-modal-back" onClick={onClose}>
      <div className="ad-modal" onClick={e => e.stopPropagation()}>
        <div className="ad-modal-head">
          <div>
            <h2>Nuevo beneficio</h2>
            <div className="sub">Aparecerá en la app de los socios al guardarse</div>
          </div>
          <button className="ad-icon-btn" onClick={onClose}><Icon.Close/></button>
        </div>
        <div className="ad-modal-body">
          <div style={{display:'grid', gridTemplateColumns:'1fr 140px', gap:14}}>
            <div>
              <label className="ad-label">Título</label>
              <input className="ad-input" placeholder="Ej: 30% OFF en cafetería" defaultValue="30% OFF en cafetería"/>
            </div>
            <div>
              <label className="ad-label">Badge</label>
              <input className="ad-input" placeholder="-30%" value={badge} onChange={e => setBadge(e.target.value)}/>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:14}}>
            <div>
              <label className="ad-label">Local</label>
              <select className="ad-select">
                <option>Seleccionar local…</option>
                {LOCALES.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="ad-label">Categoría</label>
              <select className="ad-select">
                <option>Seleccionar categoría…</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{marginTop:14}}>
            <label className="ad-label">Descripción</label>
            <textarea className="ad-textarea" placeholder="Detalles del beneficio, restricciones, cómo se aplica…" defaultValue="Válido en todas las cafeterías de la sucursal del shopping. No combinable con otras promociones. Aplicable de lunes a viernes."/>
            <div className="ad-help">Visible en la pantalla de detalle del beneficio.</div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:14}}>
            <div>
              <label className="ad-label">Fecha de vencimiento</label>
              <div style={{position:'relative'}}>
                <input className="ad-input" type="text" defaultValue="30/04/2026" style={{paddingRight:36}}/>
                <Icon.Calendar style={{position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'var(--ad-muted)'}}/>
              </div>
            </div>
            <div>
              <label className="ad-label">Cupo total</label>
              <input className="ad-input" type="number" placeholder="Ilimitado" defaultValue=""/>
              <div className="ad-help">Dejar vacío para ilimitado</div>
            </div>
          </div>

          <div style={{marginTop:14}}>
            <label className="ad-label">Días disponibles</label>
            <div style={{display:'flex', gap:6}}>
              {dayLabels.map(([k, l]) => (
                <button key={k}
                  onClick={() => setDays({...days, [k]: !days[k]})}
                  style={{
                    flex:1, padding:'8px 0', borderRadius:7,
                    background: days[k] ? 'var(--ad-primary-soft)' : 'var(--ad-surface-2)',
                    border: `1px solid ${days[k] ? 'var(--ad-primary)' : 'var(--ad-line)'}`,
                    color: days[k] ? 'var(--ad-primary)' : 'var(--ad-ink-2)',
                    fontFamily:'inherit', fontSize:12.5, fontWeight:600,
                    cursor:'pointer'
                  }}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{marginTop:14, padding:'12px 14px', background:'var(--ad-surface-2)', borderRadius:8, border:'1px solid var(--ad-line)', display:'flex', alignItems:'center', gap:12}}>
            <span className={`ad-toggle ${activo ? 'on' : ''}`} onClick={() => setActivo(!activo)}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600}}>Publicar como activo</div>
              <div style={{fontSize:11.5, color:'var(--ad-muted)', marginTop:2}}>Será visible en la app inmediatamente al guardar</div>
            </div>
          </div>
        </div>
        <div className="ad-modal-foot">
          <button className="ad-btn subtle" onClick={onClose}>Cancelar</button>
          <button className="ad-btn ghost">Guardar como borrador</button>
          <button className="ad-btn primary">Crear beneficio</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Beneficios, BenefitModal });
