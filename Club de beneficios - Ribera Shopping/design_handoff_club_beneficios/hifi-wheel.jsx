/* HI-FI · Ruleta (3 estados) */

function HFWheelSVG({ size = 280, highlight = null, rotation = 0 }) {
  const prizes = [
    {t:'10% OFF', c:'#c8102e'},
    {t:'2x1', c:'#b8863a'},
    {t:'20% OFF', c:'#8e0a1f'},
    {t:'☕', c:'#fbe6ea', dark:true},
    {t:'50% OFF', c:'#4c0513'},
    {t:'Otra\ngira', c:'#f3e6cc', dark:true},
    {t:'🎬', c:'#e15566'},
    {t:'5% OFF', c:'#b8863a'},
  ];
  const N = prizes.length;
  const r = size/2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{transform:`rotate(${rotation}deg)`, transition:'transform 3.5s cubic-bezier(0.17, 0.67, 0.3, 0.99)'}}>
      <defs>
        <filter id="wheelShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.25"/>
        </filter>
      </defs>
      <g filter="url(#wheelShadow)">
        {prizes.map((p, i) => {
          const a0 = (i / N) * Math.PI * 2 - Math.PI/2;
          const a1 = ((i+1) / N) * Math.PI * 2 - Math.PI/2;
          const x0 = r + r * Math.cos(a0), y0 = r + r * Math.sin(a0);
          const x1 = r + r * Math.cos(a1), y1 = r + r * Math.sin(a1);
          const large = (a1-a0) > Math.PI ? 1 : 0;
          const tx = r + (r*0.65) * Math.cos((a0+a1)/2);
          const ty = r + (r*0.65) * Math.sin((a0+a1)/2);
          const angle = ((i+0.5)/N) * 360;
          return (
            <g key={i}>
              <path d={`M${r},${r} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`} fill={p.c} stroke="#fff" strokeWidth="2"/>
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700"
                fill={p.dark ? '#1a1423' : '#fff'}
                transform={`rotate(${angle} ${tx} ${ty})`}>
                {p.t.split('\n').map((l,k)=><tspan key={k} x={tx} dy={k===0?0:14}>{l}</tspan>)}
              </text>
            </g>
          );
        })}
        <circle cx={r} cy={r} r={r} fill="none" stroke="#b8863a" strokeWidth="3"/>
        <circle cx={r} cy={r} r="26" fill="#fff" stroke="#b8863a" strokeWidth="2"/>
        <circle cx={r} cy={r} r="18" fill="#c8102e"/>
        <text x={r} y={r+4} textAnchor="middle" dominantBaseline="middle" fontFamily="Fraunces" fontWeight="700" fontSize="14" fill="#fff">Pr</text>
      </g>
    </svg>
  );
}

function HFWheelA() {
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{padding:'4px 20px 12px'}}>
        <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Club de Beneficios</div>
        <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1.1}}>Ruleta diaria</div>
      </div>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'0 20px', gap:16}}>
        <div style={{background:'var(--hf-primary-soft)', color:'var(--hf-primary-2)', padding:'6px 14px', borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:'0.04em', display:'inline-flex', alignItems:'center', gap:6}}>
          <span style={{width:6, height:6, borderRadius:'50%', background:'var(--hf-primary)'}}/>
          1 GIRO DISPONIBLE HOY
        </div>

        <div style={{position:'relative'}}>
          <svg width="28" height="36" viewBox="0 0 28 36" style={{position:'absolute', top:-10, left:'calc(50% - 14px)', zIndex:3, filter:'drop-shadow(0 3px 4px rgba(0,0,0,0.2))'}}>
            <path d="M14 34L2 4h24L14 34z" fill="#b8863a" stroke="#1a1423" strokeWidth="1.5"/>
          </svg>
          <HFWheelSVG size={290}/>
        </div>

        <button className="hf-btn primary" style={{padding:'16px 48px', borderRadius:16, fontSize:16, letterSpacing:'0.04em', boxShadow:'0 10px 25px rgba(200,16,46,0.35)'}}>
          GIRAR RULETA
        </button>

        <div style={{display:'flex', gap:8, marginTop:-4, flexWrap:'wrap', justifyContent:'center'}}>
          <span className="hf-chip soft">5% a 50% OFF</span>
          <span className="hf-chip soft">2x1</span>
          <span className="hf-chip soft">Productos gratis</span>
        </div>
      </div>

      <HFNav active="wheel"/>
    </HFPhone>
  );
}

function HFWheelB() {
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{padding:'4px 20px 12px'}}>
        <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Club de Beneficios</div>
        <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1.1}}>Ruleta diaria</div>
      </div>

      <div style={{position:'relative', flex:1, overflow:'hidden'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'0 20px', opacity:.4, filter:'blur(2px)'}}>
          <HFWheelSVG size={260} rotation={810}/>
        </div>

        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(247,244,239,0.4), rgba(247,244,239,0.9))', display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div className="hf-card" style={{padding:24, width:'100%', textAlign:'center', borderRadius:24, overflow:'hidden', position:'relative'}}>
            {/* confetti */}
            <svg width="100%" height="80" viewBox="0 0 300 80" style={{position:'absolute', top:0, left:0, opacity:.8}}>
              {Array.from({length:20}).map((_,i)=>{
                const c = ['#b8863a','#c8102e','#f3b8c1','#2e7a52'][i%4];
                return <circle key={i} cx={15+i*15} cy={10+(i%3)*20} r={3+(i%3)} fill={c}/>;
              })}
            </svg>

            <div style={{fontSize:11, color:'var(--hf-primary)', fontWeight:700, letterSpacing:'0.14em'}}>¡FELICITACIONES!</div>
            <div className="serif" style={{fontSize:40, fontWeight:600, lineHeight:1, marginTop:8, color:'var(--hf-primary-2)'}}>
              Ganaste
            </div>
            <div className="serif" style={{fontSize:48, fontWeight:700, color:'var(--hf-primary)', marginTop:4, lineHeight:1}}>
              20% OFF
            </div>
            <div style={{fontSize:13, color:'var(--hf-ink-2)', marginTop:10}}>en tu próxima compra en</div>
            <div style={{fontSize:15, fontWeight:700, marginTop:2}}>Grimoldi · Local 08</div>

            <div style={{background:'var(--hf-gold-soft)', border:'1px dashed var(--hf-gold)', borderRadius:12, padding:'10px 12px', marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{textAlign:'left'}}>
                <div style={{fontSize:10, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em'}}>CÓDIGO</div>
                <div className="mono" style={{fontSize:13, fontWeight:600}}>RB-RULETA-9A7X</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-gold)" strokeWidth="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </div>

            <div style={{display:'flex', gap:8, marginTop:18}}>
              <button className="hf-btn ghost" style={{flex:1}}>Después</button>
              <button className="hf-btn primary" style={{flex:1.3}}>Ver en beneficios</button>
            </div>
          </div>
        </div>
      </div>

      <HFNav active="wheel"/>
    </HFPhone>
  );
}

function HFWheelC() {
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{padding:'4px 20px 12px'}}>
        <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Club de Beneficios</div>
        <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1.1}}>Ruleta diaria</div>
      </div>

      <div style={{flex:1, overflowY:'auto', padding:'0 20px', display:'flex', flexDirection:'column', alignItems:'center', gap:14}}>
        <div style={{opacity:0.55, filter:'saturate(0.7)'}}>
          <HFWheelSVG size={220} rotation={225}/>
        </div>

        <div className="hf-card" style={{padding:16, width:'100%', textAlign:'center', border:'1px solid var(--hf-primary-soft)'}}>
          <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Ya giraste hoy 🎉</div>
          <div className="serif" style={{fontSize:18, fontWeight:600, marginTop:6}}>Próximo giro en</div>
          <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:10}}>
            {[['07','hs'],['42','min'],['18','seg']].map(([n,l],i,a)=>(
              <React.Fragment key={i}>
                <div style={{background:'var(--hf-primary)', color:'#fff', borderRadius:12, padding:'8px 12px', minWidth:52}}>
                  <div className="mono" style={{fontSize:22, fontWeight:700, lineHeight:1}}>{n}</div>
                  <div style={{fontSize:9, opacity:.75, letterSpacing:'0.06em', marginTop:3}}>{l}</div>
                </div>
                {i<a.length-1 && <div className="serif" style={{fontSize:22, color:'var(--hf-primary)', alignSelf:'center', fontWeight:700}}>:</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hf-card" style={{padding:14, width:'100%', display:'flex', gap:12, alignItems:'center'}}>
          <div className="hf-img moda" style={{width:48, height:48, borderRadius:12, flexShrink:0}}>
            <span style={{position:'relative', zIndex:1, fontFamily:'Fraunces, serif', fontWeight:600, fontSize:13}}>-20%</span>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:10, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Último premio</div>
            <div style={{fontSize:13, fontWeight:700, marginTop:2}}>20% OFF en Grimoldi</div>
            <div style={{fontSize:10, color:'var(--hf-muted)', marginTop:2}}>usado · 21 abril · 14:32</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-muted)" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, width:'100%'}}>
          <div className="hf-stat"><div className="num">12</div><div className="lbl">Giros mes</div></div>
          <div className="hf-stat"><div className="num">7</div><div className="lbl">Premios</div></div>
          <div className="hf-stat"><div className="num">$8.4k</div><div className="lbl">Ahorrado</div></div>
        </div>
      </div>

      <HFNav active="wheel"/>
    </HFPhone>
  );
}

Object.assign(window, { HFWheelA, HFWheelB, HFWheelC });
