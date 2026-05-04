/* HI-FI · Beneficios (lista + detalle + canje QR) */

function HFBenList() {
  const items = [
    {cat:'gastro', catL:'GASTRONOMÍA', t:'30% OFF en cafetería', s:'Café Martínez · Local 12', d:'30 abr', off:'-30%'},
    {cat:'cine', catL:'ENTRETENIMIENTO', t:'2x1 entradas de cine', s:'Showcase · 3er piso', d:'28 abr', off:'2x1'},
    {cat:'moda', catL:'MODA', t:'20% OFF en zapatillas', s:'Grimoldi · Local 08', d:'15 may', off:'-20%'},
    {cat:'servicios', catL:'SERVICIOS', t:'Estacionamiento 2hs gratis', s:'Playa Ribera · PB', d:'hoy', off:'2 HS'},
    {cat:'salud', catL:'SALUD', t:'15% OFF productos', s:'Farmacity · Local 22', d:'05 may', off:'-15%'},
  ];
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{padding:'4px 20px 12px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Club de Beneficios</div>
            <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1.1, marginTop:2}}>Beneficios</div>
          </div>
          <div style={{width:40, height:40, borderRadius:12, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'var(--hf-shadow)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-ink)" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
          </div>
        </div>
        <div style={{marginTop:12, background:'#fff', borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, boxShadow:'var(--hf-shadow)'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-muted)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
          <span style={{color:'var(--hf-muted)', fontSize:13}}>Buscar beneficio, local…</span>
        </div>
      </div>

      <div className="hf-hstrip">
        {['Todos','Gastro','Moda','Entretenim.','Salud','Hogar','Servicios'].map((c,i)=>(
          <span key={c} className={`hf-chip ${i===0?'active':''}`}>{c}</span>
        ))}
      </div>

      <div style={{flex:1, overflowY:'auto', padding:'10px 20px 12px', display:'flex', flexDirection:'column', gap:10}}>
        {items.map((b,i)=>(
          <div key={i} className="hf-card" style={{padding:10, display:'flex', gap:12, alignItems:'center'}}>
            <div className={`hf-img ${b.cat}`} style={{width:76, height:76, borderRadius:12, flexShrink:0}}>
              <span style={{position:'relative', zIndex:1, fontFamily:'Fraunces, serif', fontWeight:600, fontSize:15}}>{b.off}</span>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:9, color:'var(--hf-primary)', fontWeight:700, letterSpacing:'0.08em'}}>{b.catL}</div>
              <div style={{fontSize:14, fontWeight:700, marginTop:2, lineHeight:1.2}}>{b.t}</div>
              <div style={{fontSize:11, color:'var(--hf-muted)', marginTop:2}}>{b.s}</div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6}}>
                <span style={{fontSize:10, color:'var(--hf-muted)', display:'inline-flex', alignItems:'center', gap:3}}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  vence {b.d}
                </span>
                <button className="hf-btn primary" style={{padding:'5px 12px', fontSize:11, borderRadius:8}}>Canjear</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HFNav active="ben"/>
    </HFPhone>
  );
}

function HFBenDetail() {
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{flex:1, overflowY:'auto'}}>
        <div className="hf-img gastro" style={{height: 220, borderRadius:0, position:'relative'}}>
          <div style={{position:'absolute', top:10, left:20, right:20, display:'flex', justifyContent:'space-between', zIndex:1}}>
            <div style={{width:38, height:38, background:'rgba(255,255,255,0.9)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-ink)" strokeWidth="2.5" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
            </div>
            <div style={{display:'flex', gap:8}}>
              <div style={{width:38, height:38, background:'rgba(255,255,255,0.9)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5-7-11a4 4 0 017-3 4 4 0 017 3c0 6-7 11-7 11z"/></svg>
              </div>
              <div style={{width:38, height:38, background:'rgba(255,255,255,0.9)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg>
              </div>
            </div>
          </div>
          <div style={{position:'absolute', bottom:14, left:20, right:20, color:'#fff', zIndex:1, display:'flex', alignItems:'center', gap:8}}>
            <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.95)', color:'var(--hf-ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Fraunces,serif', fontWeight:700}}>CM</div>
            <div>
              <div style={{fontSize:13, fontWeight:700}}>Café Martínez</div>
              <div style={{fontSize:11, opacity:.85}}>Local 12 · Planta baja</div>
            </div>
          </div>
        </div>

        <div style={{padding:'18px 20px 14px'}}>
          <div style={{fontSize:10, color:'var(--hf-primary)', fontWeight:700, letterSpacing:'0.1em'}}>GASTRONOMÍA</div>
          <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1.1, marginTop:6}}>30% OFF en toda la carta de cafetería</div>
          <div style={{fontSize:13, color:'var(--hf-ink-2)', marginTop:10, lineHeight:1.5}}>
            Descuento en cafetería, pastelería y tostados. Válido de lunes a viernes hasta las 18hs. No acumulable con otras promociones.
          </div>
        </div>

        <div className="hf-pad" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:14}}>
          <div className="hf-stat"><div className="num">30 abr</div><div className="lbl">Vence</div></div>
          <div className="hf-stat"><div className="num">1×día</div><div className="lbl">Uso</div></div>
          <div className="hf-stat"><div className="num">Lun-Vie</div><div className="lbl">Válido</div></div>
        </div>

        <div className="hf-pad" style={{marginBottom:90}}>
          <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6}}>Términos y condiciones</div>
          <ul style={{margin:0, padding:'0 0 0 18px', fontSize:12, color:'var(--hf-ink-2)', lineHeight:1.6}}>
            <li>Exclusivo para socios del Club con credencial vigente.</li>
            <li>No acumulable con otras promociones.</li>
            <li>Presentar QR o credencial en caja antes de pagar.</li>
            <li>Beneficio sujeto a disponibilidad del local.</li>
          </ul>
        </div>
      </div>

      <div style={{position:'absolute', left:0, right:0, bottom:80, padding:'0 20px'}}>
        <button className="hf-btn primary full" style={{padding:'14px', borderRadius:16, boxShadow:'0 8px 20px rgba(107,44,145,0.35)'}}>
          Canjear beneficio
        </button>
      </div>

      <HFNav active="ben"/>
    </HFPhone>
  );
}

function HFBenRedeem() {
  // QR pixel art
  const grid = Array.from({length: 25}).map((_,y)=>Array.from({length:25}).map((_,x)=>{
    const corner = (x<7 && y<7) || (x>17 && y<7) || (x<7 && y>17);
    if (corner) {
      const inCorner = (a,b)=> (x<a+7 && x>=a && y<b+7 && y>=b);
      const ul = inCorner(0,0), ur = inCorner(18,0), dl = inCorner(0,18);
      const box = ul || ur || dl;
      if (box) {
        const lx = ul ? x : ur ? x-18 : x;
        const ly = ul ? y : ur ? y : y-18;
        if (lx===0 || lx===6 || ly===0 || ly===6) return 1;
        if (lx>=2 && lx<=4 && ly>=2 && ly<=4) return 1;
        return 0;
      }
    }
    return ((x*7 + y*13 + x*y) % 5) < 2 ? 1 : 0;
  }));
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{padding:'4px 20px 0', display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:36, height:36, borderRadius:12, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'var(--hf-shadow)'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--hf-ink)" strokeWidth="2.5" strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Canjeando</div>
          <div style={{fontSize:14, fontWeight:700}}>Café Martínez · 30% OFF</div>
        </div>
      </div>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px 20px', gap:14}}>
        <div className="serif" style={{fontSize:22, fontWeight:600, textAlign:'center', marginBottom:2}}>
          Mostrá este código
        </div>
        <div style={{fontSize:12, color:'var(--hf-muted)', marginTop:-10, textAlign:'center'}}>
          El local lo escanea para validar
        </div>

        <div className="hf-qr" style={{marginTop:4}}>
          <svg width="220" height="220" viewBox="0 0 25 25" shapeRendering="crispEdges">
            {grid.flatMap((row,y)=>row.map((v,x)=> v ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1a1423"/> : null))}
          </svg>
        </div>

        <div className="mono" style={{fontSize:13, color:'var(--hf-ink-2)', letterSpacing:2, fontWeight:500}}>RB · 0421 · 8F2K</div>

        <div style={{background:'var(--hf-gold-soft)', border:'1px solid rgba(201,162,75,0.5)', borderRadius:14, padding:'10px 14px', width:'100%', display:'flex', alignItems:'center', gap:10}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-gold)" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          <div style={{flex:1}}>
            <div style={{fontSize:12, fontWeight:700, color:'#7a5f1e'}}>Válido por 9:42 min</div>
            <div style={{height:3, background:'rgba(201,162,75,0.3)', borderRadius:2, marginTop:5, overflow:'hidden'}}>
              <div style={{height:'100%', width:'72%', background:'var(--hf-gold)', borderRadius:2}}/>
            </div>
          </div>
        </div>

        <button className="hf-btn ghost full">Cancelar canje</button>
      </div>

      <HFNav active="ben"/>
    </HFPhone>
  );
}

Object.assign(window, { HFBenList, HFBenDetail, HFBenRedeem });
