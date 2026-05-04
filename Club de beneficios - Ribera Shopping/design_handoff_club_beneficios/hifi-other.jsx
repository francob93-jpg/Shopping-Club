/* HI-FI · Novedades A (feed) + Credencial B (Wallet) */

function HFNews() {
  const posts = [
    {
      author:'Paseo de la Ribera',
      when:'hace 2h',
      tag:'NUEVO LOCAL',
      title:'Rapsodia abrió sus puertas',
      body:'Ya podés visitar Rapsodia en el primer piso. 15% OFF de bienvenida presentando tu credencial del Club.',
      img: 'moda',
      likes: 124,
      comments: 18,
    },
    {
      author:'Paseo de la Ribera',
      when:'ayer',
      tag:'EVENTO',
      title:'Show en vivo · sábado 26',
      body:'Banda en el patio central a las 19hs. Entrada libre para socios del Club, cupo limitado.',
      img: 'cine',
      likes: 256,
      comments: 42,
    },
    {
      author:'Paseo de la Ribera',
      when:'21 abr',
      tag:'HORARIO',
      title:'Cambio de horario de apertura',
      body:'Desde el lunes abrimos a las 10hs todos los días.',
      img: null,
      likes: 37,
      comments: 5,
    },
  ];
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{padding:'4px 20px 14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Paseo de la Ribera</div>
          <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1.1}}>Novedades</div>
        </div>
        <div style={{display:'flex', gap:6}}>
          <div style={{width:40, height:40, borderRadius:12, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'var(--hf-shadow)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-ink)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
        </div>
      </div>

      <div style={{flex:1, overflowY:'auto', padding:'0 16px 12px', display:'flex', flexDirection:'column', gap:14}}>
        {posts.map((p,i)=>(
          <div key={i} className="hf-card" style={{padding:0, overflow:'hidden'}}>
            <div style={{display:'flex', alignItems:'center', gap:10, padding:'12px 14px 10px'}}>
              <div style={{width:36, height:36, borderRadius:'50%', background:'var(--hf-primary)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'Fraunces,serif', fontWeight:700}}>Pr</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', gap:6}}>
                  <div style={{fontSize:13, fontWeight:700}}>{p.author}</div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--hf-primary)"><path d="M12 2l2 3 3 1 1 3 3 2-2 3v3l-3 2-1 3-3-1-2 3-2-3-3 1-1-3-3-2 2-3V9L5 6l1-3 3-1 3-3zM8 12l3 3 5-6"/></svg>
                </div>
                <div style={{fontSize:11, color:'var(--hf-muted)'}}>{p.when} · {p.tag}</div>
              </div>
              <div style={{color:'var(--hf-muted)', fontSize:18, letterSpacing:1}}>⋯</div>
            </div>
            {p.img && (
              <div className={`hf-img ${p.img}`} style={{height:180, borderRadius:0}}>
                <div style={{position:'absolute', bottom:12, left:14, right:14, color:'#fff', zIndex:1}}>
                  <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.1em', opacity:.9}}>{p.tag}</div>
                </div>
              </div>
            )}
            <div style={{padding:'12px 14px'}}>
              <div className="serif" style={{fontSize:18, fontWeight:600, lineHeight:1.2}}>{p.title}</div>
              <div style={{fontSize:13, color:'var(--hf-ink-2)', marginTop:6, lineHeight:1.5}}>{p.body}</div>
              <div style={{display:'flex', gap:16, marginTop:10, alignItems:'center'}}>
                <div style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--hf-muted)', fontWeight:600}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 000-7.8z"/></svg>
                  {p.likes}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--hf-muted)', fontWeight:600}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  {p.comments}
                </div>
                <div style={{marginLeft:'auto', color:'var(--hf-muted)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HFNav active="news"/>
    </HFPhone>
  );
}

function HFProfile() {
  return (
    <HFPhone>
      <HFStatusBar/>
      <div style={{padding:'4px 20px 14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>Mi cuenta</div>
          <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1.1}}>Credencial</div>
        </div>
        <div style={{width:40, height:40, borderRadius:12, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'var(--hf-shadow)'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hf-ink)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1A1.7 1.7 0 004.6 15a1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>
        </div>
      </div>

      <div style={{flex:1, overflowY:'auto', padding:'0 20px 12px'}}>
        {/* credencial Wallet */}
        <div style={{
          background: 'linear-gradient(135deg, #4c0513 0%, #8e0a1f 45%, #c8102e 100%)',
          color:'#fff', borderRadius: 22, padding: 18,
          boxShadow: '0 20px 40px rgba(76, 5, 19, 0.4)',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{position:'absolute', right:-50, top:-50, width:180, height:180, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.12)'}}/>
          <div style={{position:'absolute', right:-20, top:-20, width:120, height:120, borderRadius:'50%', border:'1px solid rgba(184,134,58,0.35)'}}/>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', position:'relative'}}>
            <HFLogo dark size="sm"/>
            <div style={{fontSize:10, padding:'4px 10px', background:'rgba(184,134,58,0.22)', border:'1px solid rgba(184,134,58,0.55)', color:'#e8c78a', borderRadius:999, fontWeight:700, letterSpacing:'0.08em'}}>
              NIVEL ORO
            </div>
          </div>

          <div style={{marginTop:26, position:'relative'}}>
            <div style={{fontSize:10, opacity:0.65, fontWeight:600, letterSpacing:'0.14em'}}>TITULAR</div>
            <div className="serif" style={{fontSize:24, fontWeight:600, marginTop:2}}>María Fernández</div>
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:20, position:'relative'}}>
            <div>
              <div style={{fontSize:10, opacity:0.65, fontWeight:600, letterSpacing:'0.14em'}}>Nº CREDENCIAL</div>
              <div className="mono" style={{fontSize:16, marginTop:3, letterSpacing:1.2}}>SL-2024-00142</div>
              <div style={{fontSize:11, opacity:0.6, marginTop:3}}>Socia desde feb 2024</div>
            </div>
            <div style={{width:52, height:52, borderRadius:12, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--hf-primary-2)'}}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 14h3M14 18h3M18 21h3M21 18v3"/></svg>
            </div>
          </div>
        </div>
        <div style={{fontSize:11, color:'var(--hf-muted)', textAlign:'center', marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', gap:4}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>
          Mostrá tu credencial en el ingreso y locales
        </div>

        {/* stats */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:16}}>
          <div className="hf-stat"><div className="num">12</div><div className="lbl">Canjes</div></div>
          <div className="hf-stat"><div className="num">$8.4k</div><div className="lbl">Ahorrado</div></div>
          <div className="hf-stat"><div className="num">7</div><div className="lbl">Giros mes</div></div>
        </div>

        {/* datos */}
        <div style={{marginTop:18}}>
          <div style={{fontSize:11, color:'var(--hf-muted)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8}}>Datos personales</div>
          <div className="hf-card" style={{padding:0, overflow:'hidden'}}>
            {[
              {l:'DNI', v:'34.567.890', ic: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/> , extra:<circle cx="9" cy="7" r="4"/>},
              {l:'Email', v:'maria.f@mail.com', ic: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>},
              {l:'Teléfono', v:'+54 358 555-1234', ic: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.7.6 2.5a2 2 0 01-.5 2.1L8 9.5a16 16 0 006 6l1.3-1.3a2 2 0 012-.4 12 12 0 002.6.6A2 2 0 0122 17z"/>},
            ].map((r,i,a)=>(
              <div key={i} style={{display:'flex', alignItems:'center', gap:12, padding:'14px 14px', borderBottom: i<a.length-1 ? '1px solid var(--hf-line)':'none'}}>
                <div style={{width:34, height:34, borderRadius:10, background:'var(--hf-primary-soft)', color:'var(--hf-primary)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{r.ic}{r.extra}</svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11, color:'var(--hf-muted)'}}>{r.l}</div>
                  <div style={{fontSize:13, fontWeight:600, marginTop:1}}>{r.v}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--hf-muted)" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
              </div>
            ))}
          </div>
        </div>

        {/* historial */}
        <div style={{marginTop:18}}>
          <div className="hf-section"><span className="t" style={{fontSize:11, color:'var(--hf-muted)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase'}}>Historial de canjes</span><span className="a">Ver todo</span></div>
          <div className="hf-card" style={{padding:0, overflow:'hidden'}}>
            {[
              {cat:'gastro', t:'30% OFF Café Martínez', d:'21 abr · 10:42', v:'$890'},
              {cat:'cine', t:'2x1 Showcase Cinemas', d:'18 abr · 20:15', v:'$2.400'},
              {cat:'servicios', t:'Estacionamiento 2hs', d:'15 abr · 14:08', v:'$600'},
            ].map((h,i,a)=>(
              <div key={i} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderBottom: i<a.length-1 ? '1px solid var(--hf-line)':'none'}}>
                <div className={`hf-img ${h.cat}`} style={{width:40, height:40, borderRadius:10, flexShrink:0}}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:600}}>{h.t}</div>
                  <div style={{fontSize:11, color:'var(--hf-muted)'}}>{h.d}</div>
                </div>
                <div style={{color:'var(--hf-ok)', fontWeight:700, fontSize:13}}>−{h.v}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="hf-btn ghost full" style={{marginTop:16}}>Cerrar sesión</button>
      </div>

      <HFNav active="me"/>
    </HFPhone>
  );
}

Object.assign(window, { HFNews, HFProfile });
