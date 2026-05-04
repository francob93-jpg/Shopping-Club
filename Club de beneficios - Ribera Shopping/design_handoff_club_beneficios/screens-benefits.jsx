/* ---------- BENEFICIOS — lista + detalle + variantes ---------- */

function BenefitsList() {
  const items = [
    {t:'30% OFF en toda la cafetería', s:'Café Martínez · Local 12', d:'vence 30/04', cat:'Gastro'},
    {t:'2x1 entradas', s:'Showcase Cinemas · Local 45', d:'vence 28/04', cat:'Entretenimiento'},
    {t:'-20% en zapatillas', s:'Grimoldi · Local 08', d:'vence 15/05', cat:'Moda'},
    {t:'Estacionamiento 2hs gratis', s:'Playa Ribera · PB', d:'hoy', cat:'Servicios'},
  ];
  return (
    <Phone label="Beneficios · lista">
      <SkHeader sub="Club de Beneficios" title="Beneficios"/>

      <div className="screen-pad">
        <div className="sk-box" style={{padding:'6px 10px', display:'flex', alignItems:'center', gap:8}}>
          <span style={{fontSize:14}}>⌕</span>
          <span className="kalam" style={{fontSize:13, color:'var(--ink-faint)'}}>Buscar beneficio…</span>
        </div>
      </div>

      <div className="hstrip" style={{padding:'10px 14px 6px'}}>
        {['Todos','Gastro','Moda','Entretenim.','Salud','Hogar','Servicios'].map((c,i)=>(
          <span key={c} className={`sk-chip ${i===0?'active':''}`}>{c}</span>
        ))}
      </div>

      <div className="screen-pad stack-gap" style={{overflowY:'auto', flex:1, paddingBottom:8}}>
        {items.map((b,i)=>(
          <div key={i} className="sk-box" style={{padding:10, display:'flex', gap:10}}>
            <div className="sk-img" style={{width:68, height:68, flexShrink:0}}>foto</div>
            <div style={{flex:1, minWidth:0}}>
              <div className="kalam" style={{fontSize:10, color:'var(--accent)'}}>{b.cat}</div>
              <div className="kalam" style={{fontWeight:700, fontSize:13, marginTop:1}}>{b.t}</div>
              <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>{b.s}</div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:4}}>
                <span className="mono" style={{fontSize:10, color:'var(--ink-faint)'}}>⏳ {b.d}</span>
                <span className="sk-btn accent" style={{padding:'3px 10px', fontSize:11}}>Canjear</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="ben"/>
    </Phone>
  );
}

function BenefitDetail() {
  return (
    <Phone label="Beneficios · detalle">
      <div style={{padding:'6px 14px 0', display:'flex', alignItems:'center', gap:8}}>
        <div className="sk-circle" style={{width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center'}}>‹</div>
        <div className="kalam" style={{fontSize:12, color:'var(--ink-faint)'}}>volver</div>
        <div style={{marginLeft:'auto'}} className="sk-circle" aria-hidden/>
        <div className="sk-circle" style={{width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center'}}>♡</div>
      </div>

      <div className="screen-pad" style={{marginTop:8}}>
        <div className="sk-img" style={{height:150}}>foto del beneficio</div>

        <div className="kalam" style={{fontSize:10, color:'var(--accent)', marginTop:10}}>GASTRONOMÍA · Local 12</div>
        <div className="title-hand" style={{fontSize:26, lineHeight:1, marginTop:2}}>
          <span className="sk-underline">30% OFF</span> en Café Martínez
        </div>

        <div className="kalam" style={{fontSize:12, color:'var(--ink-soft)', marginTop:8, lineHeight:1.4}}>
          Descuento en toda la carta de cafetería y pastelería. Válido de lunes a viernes hasta las 18hs.
        </div>

        <div style={{display:'flex', gap:8, marginTop:12}}>
          <div className="sk-box" style={{flex:1, padding:8, textAlign:'center'}}>
            <div className="kalam" style={{fontSize:10, color:'var(--ink-faint)'}}>vence</div>
            <div className="caveat" style={{fontSize:18}}>30 abr</div>
          </div>
          <div className="sk-box" style={{flex:1, padding:8, textAlign:'center'}}>
            <div className="kalam" style={{fontSize:10, color:'var(--ink-faint)'}}>uso</div>
            <div className="caveat" style={{fontSize:18}}>1 x día</div>
          </div>
          <div className="sk-box" style={{flex:1, padding:8, textAlign:'center'}}>
            <div className="kalam" style={{fontSize:10, color:'var(--ink-faint)'}}>categoría</div>
            <div className="caveat" style={{fontSize:18}}>Gastro</div>
          </div>
        </div>

        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)', marginTop:12}}>Términos y condiciones</div>
        <span className="placeholder-text" style={{width:'95%'}}/>
        <span className="placeholder-text" style={{width:'88%'}}/>
        <span className="placeholder-text" style={{width:'72%'}}/>
      </div>

      <div style={{padding:'10px 14px 6px'}}>
        <button className="sk-btn accent" style={{width:'100%', padding:'12px'}}>Canjear beneficio</button>
      </div>

      <BottomNav active="ben"/>
    </Phone>
  );
}

function BenefitRedeem() {
  // Variante: momento de canje (QR en el local)
  return (
    <Phone label="Beneficios · canje QR">
      <SkHeader sub="Canjeando beneficio" title="Mostrá al local"/>

      <div className="screen-pad" style={{display:'flex', flexDirection:'column', alignItems:'center', gap:10, marginTop:6}}>
        <div className="sk-box" style={{width:220, height:220, padding:10, display:'flex', alignItems:'center', justifyContent:'center', background:'#fff'}}>
          <svg width="190" height="190" viewBox="0 0 21 21" shapeRendering="crispEdges" style={{filter:'url(#rough)'}}>
            {Array.from({length:21}).map((_,y)=>(
              Array.from({length:21}).map((_,x)=>{
                const seed = (x*3 + y*7) % 5;
                const corner = (x<3 && y<3) || (x>17 && y<3) || (x<3 && y>17);
                if (corner && (x===0||x===2||x===18||x===20||y===0||y===2||y===18||y===20)) return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#1f1d1b"/>;
                if (corner && x>0 && x<20 && y>0 && y<20 && (x===1||x===19||y===1||y===19)) return null;
                if (seed === 0 || (x+y)%4===0) return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#1f1d1b"/>;
                return null;
              })
            ))}
          </svg>
        </div>
        <div className="caveat" style={{fontSize:24}}>30% OFF · Café Martínez</div>
        <div className="mono" style={{fontSize:12, color:'var(--ink-faint)'}}>Código: RB-0421-8F2K</div>

        <div className="sk-box highlight" style={{padding:10, width:'100%', marginTop:6}}>
          <div className="kalam" style={{fontWeight:700, fontSize:13}}>⏱ Válido por 10:00 min</div>
          <div className="kalam" style={{fontSize:11}}>El vendedor escanea el QR para validar</div>
        </div>

        <button className="sk-btn ghost" style={{width:'100%'}}>Cancelar canje</button>
      </div>

      <BottomNav active="ben"/>
    </Phone>
  );
}

Object.assign(window, { BenefitsList, BenefitDetail, BenefitRedeem });
