/* ---------- HOME — 3 variantes ---------- */

function HomeA() {
  return (
    <Phone label="Home · A — clásico">
      <SkHeader
        sub="¡Buen día!"
        title={<><span>María 👋</span></>}
        right={
          <div style={{display:'flex', gap:6, alignItems:'center'}}>
            <div className="sk-circle" style={{width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14}}>🔔</div>
            <div className="sk-avatar" style={{width:36, height:36}}/>
          </div>
        }
      />

      {/* featured promo */}
      <div className="screen-pad">
        <div className="sk-box accent" style={{padding:14, borderRadius:16, position:'relative', overflow:'hidden'}}>
          <div className="caveat" style={{fontSize:13, opacity:.85}}>Beneficio destacado</div>
          <div className="title-hand" style={{fontSize:28, lineHeight:1, marginTop:2}}>30% OFF</div>
          <div className="kalam" style={{fontSize:13, marginTop:2}}>en Café Martínez · todo abril</div>
          <div style={{marginTop:10}}>
            <span className="sk-btn" style={{background:'#fff', color:'var(--ink)', borderColor:'#fff'}}>Ver beneficio →</span>
          </div>
          <div style={{position:'absolute', right:-20, bottom:-20, width:110, height:110, border:'1.5px dashed #fff', borderRadius:'50%', opacity:.4}}/>
        </div>
      </div>

      {/* quick access */}
      <div className="screen-pad" style={{marginTop:12}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          {[
            {ic:'★', l:'Beneficios'},
            {ic:'◎', l:'Ruleta'},
            {ic:'⚑', l:'Novedades'},
          ].map(q => (
            <div key={q.l} className="sk-box" style={{padding:10, textAlign:'center'}}>
              <div style={{fontSize:22}}>{q.ic}</div>
              <div className="kalam" style={{fontSize:12, marginTop:4}}>{q.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* recent benefits */}
      <div style={{marginTop:14}}>
        <div className="screen-pad" style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <div className="title-hand" style={{fontSize:20}}>Beneficios recientes</div>
          <div className="kalam" style={{fontSize:11, color:'var(--accent)'}}>ver todos</div>
        </div>
        <div className="hstrip">
          {['Indumentaria', 'Gastronomía', 'Perfumería', 'Cine'].map((c,i)=> (
            <div key={i} className="sk-box" style={{minWidth:140, padding:8, flexShrink:0}}>
              <div className="sk-img" style={{height:70}}>foto beneficio</div>
              <div className="kalam" style={{fontSize:12, marginTop:6, fontWeight:700}}>{c}</div>
              <div className="kalam" style={{fontSize:10, color:'var(--ink-faint)'}}>Local {i+1} · hasta 30/04</div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="home"/>
    </Phone>
  );
}

function HomeB() {
  // Variante B: credencial en el header como protagonista
  return (
    <Phone label="Home · B — credencial al frente">
      <div style={{padding:'6px 14px 0'}}>
        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Tu credencial</div>
        <div className="sk-box" style={{background:'var(--ink)', color:'var(--paper)', padding:12, borderColor:'var(--ink)', marginTop:4}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div className="caveat" style={{fontSize:20}}>María Fernández</div>
              <div className="mono" style={{fontSize:11, opacity:.8}}>SL-2024-00142</div>
            </div>
            <div className="sk-box" style={{width:40, height:40, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <span style={{fontSize:18}}>▦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="screen-pad" style={{marginTop:12}}>
        <div className="title-hand" style={{fontSize:22}}>Hoy para vos</div>
        <div className="sk-box highlight" style={{padding:12, marginTop:6}}>
          <div className="kalam" style={{fontSize:11, color:'var(--ink-soft)'}}>Beneficio destacado</div>
          <div className="caveat" style={{fontSize:26, lineHeight:1}}>2x1 en entradas de cine</div>
          <div className="kalam" style={{fontSize:11, marginTop:4}}>Showcase · miércoles</div>
        </div>
      </div>

      {/* segmented tabs */}
      <div className="screen-pad" style={{marginTop:14, display:'flex', gap:6}}>
        <span className="sk-chip active">Todos</span>
        <span className="sk-chip">Gastro</span>
        <span className="sk-chip">Moda</span>
        <span className="sk-chip">+</span>
      </div>

      <div className="screen-pad" style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
        {[
          {t:'-20% Starbucks', s:'Café', d:'hasta 28/04'},
          {t:'3x2 Cheeky', s:'Indumentaria', d:'hasta 30/04'},
        ].map((x,i)=>(
          <div key={i} className="sk-box" style={{padding:8, display:'flex', gap:10, alignItems:'center'}}>
            <div className="sk-img" style={{width:56, height:56, flexShrink:0}}>img</div>
            <div style={{flex:1}}>
              <div className="kalam" style={{fontWeight:700, fontSize:13}}>{x.t}</div>
              <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>{x.s} · {x.d}</div>
            </div>
            <span className="sk-btn accent" style={{padding:'4px 10px', fontSize:11}}>Canjear</span>
          </div>
        ))}
      </div>

      <BottomNav active="home"/>
    </Phone>
  );
}

function HomeC() {
  // Variante C: feed tipo "diario", con ruleta flotante y mapa del shopping
  return (
    <Phone label="Home · C — feed + mapa">
      <SkHeader
        sub="Paseo de la Ribera"
        title="Buen día, María"
        right={<div className="sk-circle" style={{width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center'}}>🔔</div>}
      />

      <div className="screen-pad">
        <div className="sk-box" style={{padding:10, display:'flex', gap:10, alignItems:'center', background:'var(--accent-soft)'}}>
          <div className="sk-circle" style={{width:46, height:46, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--accent)', color:'#fff', borderColor:'var(--accent)', fontSize:20}}>◎</div>
          <div style={{flex:1}}>
            <div className="caveat" style={{fontSize:20, lineHeight:1}}>¡Girá hoy!</div>
            <div className="kalam" style={{fontSize:11}}>Tenés 1 giro disponible</div>
          </div>
          <span className="sk-btn accent" style={{padding:'4px 10px', fontSize:11}}>Ir →</span>
        </div>
      </div>

      {/* mini map */}
      <div className="screen-pad" style={{marginTop:12}}>
        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)', marginBottom:4}}>Mapa del shopping</div>
        <div className="sk-box" style={{padding:0, height:110, position:'relative', overflow:'hidden'}}>
          <svg width="100%" height="100%" viewBox="0 0 330 110" style={{position:'absolute', inset:0}}>
            <rect x="8" y="8" width="60" height="40" fill="url(#hatch)" stroke="#1f1d1b" strokeWidth="1.2"/>
            <rect x="76" y="8" width="90" height="40" fill="none" stroke="#1f1d1b" strokeWidth="1.2"/>
            <rect x="174" y="8" width="60" height="40" fill="url(#hatch)" stroke="#1f1d1b" strokeWidth="1.2"/>
            <rect x="242" y="8" width="80" height="94" fill="none" stroke="#1f1d1b" strokeWidth="1.2"/>
            <rect x="8" y="56" width="120" height="46" fill="none" stroke="#1f1d1b" strokeWidth="1.2"/>
            <rect x="136" y="56" width="98" height="46" fill="url(#hatch)" stroke="#1f1d1b" strokeWidth="1.2"/>
            <circle cx="110" cy="78" r="6" fill="oklch(0.42 0.15 290)"/>
            <text x="120" y="82" fontFamily="Kalam" fontSize="10">acá estás</text>
          </svg>
        </div>
      </div>

      <div className="screen-pad" style={{marginTop:12}}>
        <div className="title-hand" style={{fontSize:20}}>Novedades</div>
        <div className="stack-gap" style={{marginTop:6}}>
          <div className="sk-box" style={{padding:10}}>
            <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Ayer · admin</div>
            <div className="kalam" style={{fontWeight:700, fontSize:13}}>Nuevo local: Rapsodia</div>
            <span className="placeholder-text" style={{width:'80%'}}/>
          </div>
        </div>
      </div>

      <BottomNav active="home"/>
    </Phone>
  );
}

Object.assign(window, { HomeA, HomeB, HomeC });
