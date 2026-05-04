/* ---------- RULETA — 3 variantes ---------- */

function WheelSVG({ size = 260, highlight = null }) {
  const prizes = ['10%', '2x1', '20%', '☕', '50%', 'GIRA', '🎬', '5%'];
  const N = prizes.length;
  const r = size/2;
  const colors = ['#f5f2ea','#ecebe4'];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{filter:'url(#rough)'}}>
      {prizes.map((p, i) => {
        const a0 = (i / N) * Math.PI * 2 - Math.PI/2;
        const a1 = ((i+1) / N) * Math.PI * 2 - Math.PI/2;
        const x0 = r + r * Math.cos(a0), y0 = r + r * Math.sin(a0);
        const x1 = r + r * Math.cos(a1), y1 = r + r * Math.sin(a1);
        const large = (a1-a0) > Math.PI ? 1 : 0;
        const tx = r + (r*0.62) * Math.cos((a0+a1)/2);
        const ty = r + (r*0.62) * Math.sin((a0+a1)/2);
        const isHL = highlight === i;
        return (
          <g key={i}>
            <path
              d={`M${r},${r} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`}
              fill={isHL ? 'oklch(0.42 0.15 290)' : colors[i%2]}
              stroke="#1f1d1b"
              strokeWidth="1.5"
            />
            <text x={tx} y={ty}
              fontFamily="Caveat" fontSize="20" fontWeight="700"
              textAnchor="middle" dominantBaseline="middle"
              fill={isHL ? '#fff' : '#1f1d1b'}>
              {p}
            </text>
          </g>
        );
      })}
      <circle cx={r} cy={r} r={22} fill="#fff" stroke="#1f1d1b" strokeWidth="1.5"/>
      <text x={r} y={r+5} textAnchor="middle" fontFamily="Caveat" fontSize="18" fontWeight="700">GO</text>
    </svg>
  );
}

function WheelA() {
  return (
    <Phone label="Ruleta · A — clásica">
      <SkHeader sub="Club de Beneficios" title="Ruleta diaria"/>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'0 14px'}}>
        <div className="kalam" style={{fontSize:12, color:'var(--ink-faint)'}}>Girá una vez por día</div>

        <div style={{position:'relative'}}>
          {/* pointer */}
          <svg width="22" height="22" viewBox="0 0 22 22" style={{position:'absolute', top:-4, left:'calc(50% - 11px)', zIndex:2, filter:'url(#rough)'}}>
            <polygon points="11,20 2,2 20,2" fill="oklch(0.42 0.15 290)" stroke="#1f1d1b" strokeWidth="1.5"/>
          </svg>
          <WheelSVG size={280}/>
        </div>

        <button className="sk-btn accent" style={{width:'80%', padding:'12px', marginTop:6}}>GIRAR</button>
        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>1 giro disponible hoy</div>

        <div className="sk-box" style={{padding:10, width:'100%', marginTop:6}}>
          <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Premios posibles</div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:4}}>
            {['5% OFF','10% OFF','2x1 cine','☕ gratis','20% OFF','50% OFF'].map(p=>
              <span key={p} className="sk-chip" style={{fontSize:11}}>{p}</span>
            )}
          </div>
        </div>
      </div>

      <BottomNav active="wheel"/>
    </Phone>
  );
}

function WheelB() {
  // Variante con resultado (modal ganador)
  return (
    <Phone label="Ruleta · B — ganaste!">
      <SkHeader sub="Club de Beneficios" title="Ruleta diaria"/>

      <div style={{position:'relative', flex:1}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'0 14px', opacity:.35, filter:'blur(1px)'}}>
          <WheelSVG size={240} highlight={2}/>
        </div>

        {/* modal */}
        <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:16}}>
          <div className="sk-box" style={{background:'var(--paper)', padding:16, width:'100%', textAlign:'center', borderWidth:2}}>
            <div className="caveat" style={{fontSize:22, color:'var(--accent)'}}>¡Ganaste!</div>
            <div className="title-hand" style={{fontSize:34, margin:'4px 0'}}>
              <span className="sk-underline">20% OFF</span>
            </div>
            <div className="kalam" style={{fontSize:12}}>en tu próxima compra en</div>
            <div className="kalam" style={{fontWeight:700, fontSize:14}}>Grimoldi · Local 08</div>

            <div className="sk-box highlight" style={{padding:8, marginTop:10}}>
              <div className="mono" style={{fontSize:11}}>código: RB-RULETA-9A7X</div>
            </div>

            <div style={{display:'flex', gap:6, marginTop:12}}>
              <button className="sk-btn ghost" style={{flex:1}}>Más tarde</button>
              <button className="sk-btn accent" style={{flex:1}}>Guardar</button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="wheel"/>
    </Phone>
  );
}

function WheelC() {
  // Variante ya usaste: estado "bloqueado" con countdown
  return (
    <Phone label="Ruleta · C — ya usada">
      <SkHeader sub="Club de Beneficios" title="Ruleta diaria"/>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:10, padding:'0 14px'}}>

        <div style={{opacity:.55}}>
          <WheelSVG size={240}/>
        </div>

        <div className="sk-box" style={{padding:12, width:'100%', textAlign:'center', background:'var(--paper-2)'}}>
          <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Ya giraste hoy 🎉</div>
          <div className="caveat" style={{fontSize:22, lineHeight:1.1, marginTop:4}}>Próximo giro en</div>
          <div style={{display:'flex', gap:6, justifyContent:'center', marginTop:6}}>
            {['07','42','18'].map((n,i)=>(
              <React.Fragment key={i}>
                <div className="sk-box" style={{padding:'6px 10px', minWidth:46}}>
                  <div className="mono" style={{fontSize:20, fontWeight:700}}>{n}</div>
                  <div className="kalam" style={{fontSize:9, color:'var(--ink-faint)'}}>{['hs','min','seg'][i]}</div>
                </div>
                {i<2 && <div className="caveat" style={{fontSize:22, alignSelf:'center'}}>:</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="sk-box" style={{padding:10, width:'100%'}}>
          <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Tu último premio</div>
          <div className="kalam" style={{fontWeight:700, fontSize:13, marginTop:2}}>20% OFF en Grimoldi</div>
          <div className="kalam" style={{fontSize:11}}>usado · 21 abril 14:32</div>
        </div>

        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>📈 Llevás 12 giros este mes</div>
      </div>

      <BottomNav active="wheel"/>
    </Phone>
  );
}

Object.assign(window, { WheelA, WheelB, WheelC });
