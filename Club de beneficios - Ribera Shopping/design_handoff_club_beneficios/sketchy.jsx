/* Sketchy SVG filter + primitive components shared across screens */

const { useState } = React;

function RoughFilter() {
  // Global SVG filter for hand-drawn wobble. Included once per page.
  return (
    <svg width="0" height="0" style={{position:'absolute'}} aria-hidden>
      <defs>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="4"/>
          <feDisplacementMap in="SourceGraphic" scale="1.2"/>
        </filter>
        <filter id="rough-strong" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7"/>
          <feDisplacementMap in="SourceGraphic" scale="2.2"/>
        </filter>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#1f1d1b" strokeWidth="1" opacity="0.35"/>
        </pattern>
      </defs>
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <span className="bars"><i/><i/><i/><i/></span>
        <span style={{fontSize:10}}>◐</span>
        <span style={{border:'1.2px solid #1f1d1b', borderRadius:3, padding:'0 3px', fontSize:9}}>82</span>
      </span>
    </div>
  );
}

function BottomNav({ active = 'home' }) {
  const tabs = [
    { id:'home',  label:'Home',      icon:'⌂' },
    { id:'ben',   label:'Beneficios', icon:'★' },
    { id:'wheel', label:'Ruleta',    icon:'◎' },
    { id:'news',  label:'Novedades', icon:'⚑' },
    { id:'me',    label:'Perfil',    icon:'◉' },
  ];
  return (
    <div className="bottom-nav" style={{marginTop:'auto'}}>
      {tabs.map(t => (
        <div key={t.id} className={`tab ${t.id===active ? 'active':''}`}>
          <div className="ico" style={{fontSize:14}}>{t.icon}</div>
          <div>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

function Phone({ children, label }) {
  return (
    <div className="phone">
      {label && <div className="ribbon">{label}</div>}
      <div className="screen">
        <StatusBar/>
        {children}
      </div>
    </div>
  );
}

function Annotation({ children, style }) {
  return (
    <div className="annotation" style={style}>
      <span className="arrow">↝</span>
      {children}
    </div>
  );
}

// Simple sketchy header for each phone screen
function SkHeader({ title, sub, right }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', padding:'8px 16px 10px'}}>
      <div>
        <div className="kalam" style={{fontSize:11, color:'var(--ink-faint)'}}>{sub}</div>
        <div className="title-hand" style={{fontSize:26}}>{title}</div>
      </div>
      <div>{right}</div>
    </div>
  );
}

Object.assign(window, { RoughFilter, StatusBar, BottomNav, Phone, Annotation, SkHeader });
