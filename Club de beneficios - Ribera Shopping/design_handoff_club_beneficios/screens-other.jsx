/* ---------- NOVEDADES (news) + PERFIL ---------- */

function NewsA() {
  const posts = [
    {t:'Nuevo local: Rapsodia', b:'Ya podés visitar Rapsodia en el primer piso con 15% OFF de bienvenida.', d:'hace 2h', img:true},
    {t:'Cambio de horario', b:'Desde el lunes abrimos a las 10hs.', d:'ayer', img:false},
    {t:'Show en vivo el sábado', b:'Banda en el patio central a las 19hs. Entrada libre para socios.', d:'21 abr', img:true},
  ];
  return (
    <Phone label="Novedades · A — feed">
      <SkHeader sub="Paseo de la Ribera" title="Novedades"/>

      <div className="screen-pad stack-gap" style={{overflowY:'auto', flex:1, paddingBottom:8}}>
        {posts.map((p,i)=>(
          <div key={i} className="sk-box" style={{padding:0, overflow:'hidden'}}>
            <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 10px'}}>
              <div className="sk-avatar" style={{width:30, height:30}}/>
              <div style={{flex:1}}>
                <div className="kalam" style={{fontWeight:700, fontSize:12}}>Paseo de la Ribera</div>
                <div className="kalam" style={{fontSize:10, color:'var(--ink-faint)'}}>{p.d}</div>
              </div>
              <div style={{fontSize:14}}>⋯</div>
            </div>
            {p.img && <div className="sk-img" style={{height:140, borderRadius:0, borderLeft:'none', borderRight:'none'}}>foto / flyer</div>}
            <div style={{padding:'8px 10px 10px'}}>
              <div className="kalam" style={{fontWeight:700, fontSize:13}}>{p.t}</div>
              <div className="kalam" style={{fontSize:12, color:'var(--ink-soft)', marginTop:2, lineHeight:1.4}}>{p.b}</div>
              <div style={{display:'flex', gap:12, marginTop:6, color:'var(--ink-faint)', fontSize:14}}>
                <span>♡</span><span>💬</span><span style={{marginLeft:'auto'}}>↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="news"/>
    </Phone>
  );
}

function NewsB() {
  // Variante con tabs "Destacadas / Eventos / Nuevos locales"
  const posts = [
    {t:'Show en vivo', d:'sáb 26 abr · 19hs', tag:'EVENTO'},
    {t:'Abrió Rapsodia', d:'1er piso · local 118', tag:'LOCAL NUEVO'},
    {t:'Día del niño', d:'sáb 3 ago', tag:'EVENTO'},
  ];
  return (
    <Phone label="Novedades · B — compacto">
      <SkHeader sub="Paseo de la Ribera" title="Novedades"/>

      <div className="screen-pad" style={{display:'flex', gap:6}}>
        <span className="sk-chip active">Todas</span>
        <span className="sk-chip">Eventos</span>
        <span className="sk-chip">Locales</span>
        <span className="sk-chip">Promos</span>
      </div>

      <div className="screen-pad stack-gap" style={{marginTop:10, flex:1, overflowY:'auto'}}>
        {posts.map((p,i)=>(
          <div key={i} className="sk-box" style={{padding:10, display:'flex', gap:10, alignItems:'center'}}>
            <div className="sk-img" style={{width:64, height:64, flexShrink:0}}>img</div>
            <div style={{flex:1}}>
              <div className="kalam" style={{fontSize:9, color:'var(--accent)', letterSpacing:0.5}}>{p.tag}</div>
              <div className="kalam" style={{fontWeight:700, fontSize:14, marginTop:2}}>{p.t}</div>
              <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>{p.d}</div>
            </div>
            <div className="sk-circle" style={{width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center'}}>›</div>
          </div>
        ))}
      </div>

      <BottomNav active="news"/>
    </Phone>
  );
}

function ProfileA() {
  // Credencial simple + datos + historial
  return (
    <Phone label="Perfil · A — clásico">
      <SkHeader sub="Mi cuenta" title="Perfil" right={<div style={{fontSize:16}}>⚙</div>}/>

      <div className="screen-pad">
        <div className="sk-box" style={{padding:12, display:'flex', gap:10, alignItems:'center'}}>
          <div className="sk-avatar" style={{width:56, height:56}}/>
          <div>
            <div className="kalam" style={{fontWeight:700, fontSize:15}}>María Fernández</div>
            <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>socia desde 2024</div>
            <div className="mono" style={{fontSize:11, marginTop:2, color:'var(--accent)'}}>SL-2024-00142</div>
          </div>
        </div>
      </div>

      <div className="screen-pad" style={{marginTop:10}}>
        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Datos personales</div>
        <div className="sk-box" style={{padding:0, marginTop:4}}>
          {[
            ['DNI','34.567.890'],
            ['Email','maria.f@mail.com'],
            ['Teléfono','+54 358 555-1234'],
          ].map((r,i)=>(
            <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'8px 10px', borderBottom: i<2 ? '1px dashed rgba(0,0,0,0.18)':'none'}}>
              <span className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>{r[0]}</span>
              <span className="kalam" style={{fontSize:12}}>{r[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="screen-pad" style={{marginTop:10, flex:1, overflowY:'auto'}}>
        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Historial de canjes</div>
        <div className="stack-gap" style={{marginTop:4}}>
          {[
            ['30% OFF Café Martínez', '21 abr'],
            ['2x1 Showcase', '18 abr'],
            ['Estac. 2hs', '15 abr'],
          ].map((h,i)=>(
            <div key={i} className="sk-box" style={{padding:8, display:'flex', justifyContent:'space-between'}}>
              <span className="kalam" style={{fontSize:12}}>{h[0]}</span>
              <span className="mono" style={{fontSize:10, color:'var(--ink-faint)'}}>{h[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="me"/>
    </Phone>
  );
}

function ProfileB() {
  // Credencial protagonista tipo Wallet
  return (
    <Phone label="Perfil · B — credencial Wallet">
      <SkHeader sub="Mi credencial" title="Socio #142" right={<div style={{fontSize:16}}>⚙</div>}/>

      <div className="screen-pad">
        <div className="sk-box" style={{background:'var(--ink)', color:'var(--paper)', borderColor:'var(--ink)', padding:14, position:'relative', overflow:'hidden'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div>
              <div className="caveat" style={{fontSize:20}}>Paseo de la Ribera</div>
              <div className="kalam" style={{fontSize:10, opacity:.7}}>Club de Beneficios</div>
            </div>
            <div className="sk-avatar" style={{width:42, height:42, background:'rgba(255,255,255,0.15)'}}/>
          </div>
          <div style={{marginTop:18}}>
            <div className="kalam" style={{fontSize:10, opacity:.7}}>Titular</div>
            <div className="caveat" style={{fontSize:22}}>María Fernández</div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:14}}>
            <div>
              <div className="kalam" style={{fontSize:10, opacity:.7}}>N° credencial</div>
              <div className="mono" style={{fontSize:14}}>SL-2024-00142</div>
            </div>
            <div className="sk-box" style={{width:46, height:46, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <span style={{fontSize:20, color:'#1f1d1b'}}>▦</span>
            </div>
          </div>
          <div style={{position:'absolute', right:-30, top:-30, width:130, height:130, border:'1.5px dashed rgba(255,255,255,0.3)', borderRadius:'50%'}}/>
        </div>
        <div className="kalam" style={{fontSize:10, color:'var(--ink-faint)', textAlign:'center', marginTop:6}}>Mostrá tu credencial al ingresar</div>
      </div>

      <div className="screen-pad" style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6}}>
        <div className="sk-box" style={{padding:8, textAlign:'center'}}>
          <div className="caveat" style={{fontSize:22, color:'var(--accent)'}}>12</div>
          <div className="kalam" style={{fontSize:10}}>canjes</div>
        </div>
        <div className="sk-box" style={{padding:8, textAlign:'center'}}>
          <div className="caveat" style={{fontSize:22, color:'var(--accent)'}}>$ 8.4k</div>
          <div className="kalam" style={{fontSize:10}}>ahorrado</div>
        </div>
        <div className="sk-box" style={{padding:8, textAlign:'center'}}>
          <div className="caveat" style={{fontSize:22, color:'var(--accent)'}}>7</div>
          <div className="kalam" style={{fontSize:10}}>giros</div>
        </div>
      </div>

      <div className="screen-pad" style={{marginTop:10}}>
        <button className="sk-btn" style={{width:'100%'}}>Editar datos personales</button>
      </div>

      <BottomNav active="me"/>
    </Phone>
  );
}

function ProfileC() {
  // Credencial con QR grande
  return (
    <Phone label="Perfil · C — credencial con QR">
      <div style={{padding:'10px 16px 0', display:'flex', alignItems:'center', gap:8}}>
        <div className="sk-circle" style={{width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center'}}>‹</div>
        <div className="kalam" style={{fontSize:12, color:'var(--ink-faint)'}}>Perfil</div>
        <div style={{marginLeft:'auto', fontSize:16}}>⚙</div>
      </div>

      <div style={{padding:'8px 16px', display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
        <div className="sk-avatar" style={{width:66, height:66}}/>
        <div className="title-hand" style={{fontSize:26, lineHeight:1}}>María Fernández</div>
        <div className="mono" style={{fontSize:12, color:'var(--accent)'}}>SL-2024-00142</div>

        <div className="sk-box" style={{padding:12, marginTop:4, background:'#fff'}}>
          <svg width="160" height="160" viewBox="0 0 21 21" shapeRendering="crispEdges" style={{filter:'url(#rough)'}}>
            {Array.from({length:21*21}).map((_,k)=>{
              const x=k%21, y=Math.floor(k/21);
              const r=(x*13 + y*7)%7;
              return r<3 ? <rect key={k} x={x} y={y} width={1} height={1} fill="#1f1d1b"/> : null;
            })}
          </svg>
        </div>

        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Escaneá para validar identidad</div>
      </div>

      <div className="screen-pad" style={{marginTop:8, flex:1, overflowY:'auto'}}>
        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>Últimos canjes</div>
        <div className="stack-gap" style={{marginTop:4}}>
          {[
            ['30% Café Martínez', '21 abr', '$ 890'],
            ['2x1 Showcase', '18 abr', '$ 2.400'],
          ].map((h,i)=>(
            <div key={i} className="sk-box" style={{padding:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div className="kalam" style={{fontSize:12, fontWeight:700}}>{h[0]}</div>
                <div className="kalam" style={{fontSize:10, color:'var(--ink-faint)'}}>{h[1]}</div>
              </div>
              <div className="caveat" style={{fontSize:16, color:'var(--accent)'}}>−{h[2]}</div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="me"/>
    </Phone>
  );
}

Object.assign(window, { NewsA, NewsB, ProfileA, ProfileB, ProfileC });
