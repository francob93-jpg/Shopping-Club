/* HI-FI shared primitives */

function HFStatusBar() {
  return (
    <div className="hf-statusbar">
      <span>9:41</span>
      <span className="ind">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M1 9h2v1H1zM5 7h2v3H5zM9 4h2v6H9zM13 1h2v9h-2z" fill="currentColor"/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5c2 0 3.8.7 5.2 2l-1.1 1.1A6.6 6.6 0 007.5 4c-1.6 0-3.1.5-4.1 1.6L2.3 4.5A7.8 7.8 0 017.5 2.5zm0 3c1.2 0 2.3.4 3.1 1.2l-1.1 1.1a3 3 0 00-4 0l-1.1-1.1A4.5 4.5 0 017.5 5.5zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="currentColor"/></svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor"/>
          <rect x="21" y="4" width="2" height="4" rx="1" fill="currentColor"/>
        </svg>
      </span>
    </div>
  );
}

function HFNav({ active = 'home' }) {
  const tabs = [
    { id:'home',  l:'Inicio',     i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2z"/></svg> },
    { id:'ben',   l:'Beneficios', i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7a2.5 2.5 0 010-5C14 2 15 4 15 7M12 7a2.5 2.5 0 000-5C10 2 9 4 9 7"/></svg> },
    { id:'wheel', l:'Ruleta',     i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg> },
    { id:'news',  l:'Novedades',  i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4zM4 8h16M8 4v16"/></svg> },
    { id:'me',    l:'Perfil',     i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg> },
  ];
  return (
    <div className="hf-nav">
      {tabs.map(t=>(
        <div key={t.id} className={`tab ${t.id===active?'active':''}`}>
          <div className="ico">{t.i}</div>
          <div>{t.l}</div>
        </div>
      ))}
    </div>
  );
}

function HFPhone({ children, statusDark = false }) {
  return (
    <div className="hf-phone">
      <div className="hf-notch"/>
      <div className="hf-screen" style={statusDark ? { color: '#fff' } : {}}>
        {children}
      </div>
    </div>
  );
}

// Paseo de la Ribera logo mark (recreated from wordmark — circular monogram)
function HFLogoMark({ size = 32, tone = 'primary' }) {
  const bg = tone === 'light' ? '#fff' : 'var(--hf-primary)';
  const fg = tone === 'light' ? 'var(--hf-primary)' : '#fff';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Fraunces, serif', fontWeight: 600,
      fontSize: size * 0.5, letterSpacing: -0.5,
      boxShadow: tone==='light' ? 'none' : 'inset 0 -2px 0 rgba(0,0,0,0.15)'
    }}>
      <span style={{transform:'translateY(-1px)'}}>Pr</span>
    </div>
  );
}

function HFLogo({ dark = false, size = 'md' }) {
  const textColor = dark ? '#fff' : 'var(--hf-primary)';
  const sub = dark ? 'rgba(255,255,255,0.7)' : 'var(--hf-muted)';
  const markSize = size === 'sm' ? 26 : size === 'lg' ? 38 : 30;
  return (
    <div style={{display:'flex', alignItems:'center', gap: 8}}>
      <HFLogoMark size={markSize} tone={dark ? 'light' : 'primary'}/>
      <div style={{lineHeight: 1}}>
        <div className="serif" style={{fontSize: size==='lg'?18:14, fontWeight: 600, color: textColor, letterSpacing: -0.2}}>
          Paseo <em style={{fontStyle:'italic', fontWeight:500}}>de la</em> Ribera
        </div>
        <div style={{fontSize: 9, letterSpacing: '0.18em', color: sub, fontWeight: 600, textTransform:'uppercase', marginTop:2}}>
          Club de Beneficios
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HFStatusBar, HFNav, HFPhone, HFLogo, HFLogoMark });
