/* HI-FI · Home B — credencial al frente */

function HFHome() {
  return (
    <HFPhone>
      <HFStatusBar/>

      {/* hero with credencial */}
      <div className="hf-hero">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <HFLogo dark size="sm"/>
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <div style={{position:'relative', width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.12)', borderRadius:12}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 004 0"/></svg>
              <span style={{position:'absolute', top:7, right:8, width:8, height:8, borderRadius:'50%', background:'#c9a24b', border:'2px solid #4e1d6c'}}/>
            </div>
          </div>
        </div>

        <div style={{marginTop: 16}}>
          <div style={{fontSize: 13, opacity: 0.75, fontWeight: 500}}>Hola,</div>
          <div className="serif" style={{fontSize: 26, fontWeight: 600, marginTop: 2, lineHeight: 1.1}}>
            María Fernández
          </div>
        </div>

        {/* credencial mini */}
        <div style={{
          marginTop: 14,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 18,
          padding: 14,
          display:'flex', alignItems:'center', gap: 12,
          position: 'relative', zIndex: 1
        }}>
          <div style={{flex:1}}>
            <div style={{fontSize: 10, letterSpacing:'0.14em', textTransform:'uppercase', opacity: 0.65, fontWeight: 600}}>Mi credencial</div>
            <div className="mono" style={{fontSize: 15, fontWeight: 500, marginTop: 4, letterSpacing: 0.5}}>SL-2024-00142</div>
            <div style={{fontSize: 11, opacity: 0.7, marginTop: 3}}>Socia desde feb 2024 · <span style={{color:'#e8c97b', fontWeight:600}}>Nivel Oro</span></div>
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: '#fff', display:'flex', alignItems:'center', justifyContent:'center',
            color: 'var(--hf-primary-2)'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 14h3M14 18h3M18 21h3M21 18v3"/></svg>
          </div>
        </div>
      </div>

      <div style={{flex: 1, overflowY: 'auto', paddingBottom: 12, marginTop: -20}}>
        {/* featured */}
        <div className="hf-pad">
          <div className="hf-card" style={{overflow:'hidden'}}>
            <div className="hf-img gastro" style={{height: 140, borderRadius:0}}>
              <span className="tag">Destacado</span>
              <div style={{position:'absolute', bottom:12, left:14, right:14, color:'#fff', zIndex:1}}>
                <div style={{fontSize:10, letterSpacing:'0.1em', fontWeight:600, opacity:.9, textTransform:'uppercase'}}>Café Martínez · Local 12</div>
                <div className="serif" style={{fontSize: 24, fontWeight: 600, lineHeight:1, marginTop:4}}>30% OFF en cafetería</div>
              </div>
            </div>
            <div style={{padding: '12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontSize: 12, color:'var(--hf-muted)'}}>Vence <b style={{color:'var(--hf-ink)'}}>30 abr</b> · lun a vie</div>
              <button className="hf-btn primary" style={{padding:'8px 14px', fontSize:12, borderRadius:10}}>Ver beneficio</button>
            </div>
          </div>
        </div>

        {/* quick access */}
        <div className="hf-pad" style={{marginTop: 16}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10}}>
            {[
              {ic: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14"/></svg>, l:'Beneficios', n:24},
              {ic: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 4"/></svg>, l:'Ruleta', n:'1 giro'},
              {ic: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h10M7 14h6"/></svg>, l:'Novedades', n:3},
            ].map((q,i)=>(
              <div key={i} className="hf-card" style={{padding:14, display:'flex', flexDirection:'column', alignItems:'flex-start', gap:8}}>
                <div style={{width:36, height:36, borderRadius:10, background:'var(--hf-primary-soft)', color:'var(--hf-primary)', display:'flex', alignItems:'center', justifyContent:'center'}}>{q.ic}</div>
                <div>
                  <div style={{fontSize:13, fontWeight:700}}>{q.l}</div>
                  <div style={{fontSize:11, color:'var(--hf-muted)'}}>{q.n}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* tabs */}
        <div style={{padding:'18px 20px 10px'}}>
          <div className="hf-section">
            <span className="t">Para vos hoy</span>
            <span className="a">Ver todos →</span>
          </div>
        </div>
        <div className="hf-hstrip" style={{paddingTop:0, paddingBottom:6}}>
          {['Todos','Gastro','Moda','Entretenim.','Servicios'].map((c,i)=>(
            <span key={c} className={`hf-chip ${i===0?'active':''}`}>{c}</span>
          ))}
        </div>

        {/* benefits list */}
        <div className="hf-pad" style={{display:'flex', flexDirection:'column', gap:10, marginTop:10}}>
          {[
            {cat:'gastro', t:'2x1 en combos', s:'Mostaza · Local 203', d:'hasta 28/04', off:'2x1'},
            {cat:'moda', t:'Hasta 40% OFF', s:'Grimoldi · Local 08', d:'hasta 15/05', off:'-40%'},
            {cat:'cine', t:'Entrada + combo', s:'Showcase · 3er piso', d:'miércoles', off:'-25%'},
          ].map((b,i)=>(
            <div key={i} className="hf-card" style={{padding:10, display:'flex', gap:12, alignItems:'center'}}>
              <div className={`hf-img ${b.cat}`} style={{width:60, height:60, borderRadius:12, flexShrink:0}}>
                <span style={{position:'relative', zIndex:1, fontWeight:700, fontSize:13}}>{b.off}</span>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:700, color:'var(--hf-ink)'}}>{b.t}</div>
                <div style={{fontSize:11, color:'var(--hf-muted)', marginTop:2}}>{b.s}</div>
                <div style={{display:'flex', alignItems:'center', gap:4, fontSize:10, color:'var(--hf-primary)', marginTop:4, fontWeight:600}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  {b.d}
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </div>
          ))}
        </div>
      </div>

      <HFNav active="home"/>
    </HFPhone>
  );
}

Object.assign(window, { HFHome });
