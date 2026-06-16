'use client';

import { useState } from 'react';
import History from '../components/History';
import Origins from '../components/Origins';
import ProcessingGuide from '../components/ProcessingGuide';
import BrewGuide from '../components/BrewGuide';
import WaterGuide from '../components/WaterGuide';
import HardwareGuide from '../components/HardwareGuide';
import RoastGuide from '../components/RoastGuide';
import TasteQuiz from '../components/TasteQuiz';
import ChatBot from '../components/ChatBot';
import MyCoffeeJournal from '../components/MyCoffeeJournal';

// Top nav structure — three themed groups + the personal tools group on the right.
const GUIDE_GROUPS = [
  { theme:'Understanding', tabs: [{ id:'history', label:'History' }] },
  { theme:'Exploring',     tabs: [{ id:'origins', label:'Origins' }, { id:'processing', label:'Processing' }] },
  { theme:'Brewing',       tabs: [{ id:'brew', label:'Methods' }, { id:'water', label:'Water' }, { id:'hardware', label:'Hardware' }, { id:'roast', label:'Roast' }] },
];
const PERSONAL_TABS = [
  { id:'quiz', label:'Taste Quiz', icon:'✦' },
  { id:'log',  label:'My Log',     icon:'❒' },
];

export default function App() {
  const [landingUp, setLandingUp] = useState(false);
  const [tab, setTab] = useState('history');

  // Map tab id → the component to render. Keeps the JSX below readable.
  function renderActive() {
    switch (tab) {
      case 'history':    return <History goTab={setTab}/>;
      case 'origins':    return <Origins/>;
      case 'processing': return <ProcessingGuide/>;
      case 'brew':       return <BrewGuide/>;
      case 'water':      return <WaterGuide/>;
      case 'hardware':   return <HardwareGuide/>;
      case 'roast':      return <RoastGuide/>;
      case 'quiz':       return <TasteQuiz/>;
      case 'log':        return <MyCoffeeJournal/>;
      default:           return null;
    }
  }

  return (
    <>
    <div className="stage">
      <div className={`stage-track${landingUp ? ' move-up' : ''}`}>
        <div className="panel landing">
          <div className="landing-eyebrow">A field guide for the curious</div>
          <h1 className="landing-title">Grounds.</h1>
          <p className="landing-sub">
            Discover the world of coffee — from origin to cup. Explore brew methods, find your flavor profile, and log every cup along the way.
          </p>
          <button className="landing-btn" onClick={() => setLandingUp(true)}>Enter the guide</button>
          <div className="landing-footer">Est. 2026 — For coffee aficionados in training</div>
        </div>

        <div className="panel app-shell">
          <header className="app-header">
            <button className="app-logo" onClick={() => setLandingUp(false)}>Grounds</button>
            <nav className="app-nav">
              {GUIDE_GROUPS.map((g, gi) =>
                <span key={g.theme} style={{display:'flex',alignItems:'center',gap:4}}>
                  {gi > 0 && <span className="nav-group-sep"></span>}
                  <div className="nav-group">
                    <span className="nav-group-label">{g.theme}</span>
                    {g.tabs.map(tt =>
                      <button key={tt.id} className={`nav-tab${tab===tt.id ? ' active' : ''}`} onClick={() => setTab(tt.id)}>{tt.label}</button>
                    )}
                  </div>
                </span>
              )}
              <div className="nav-personal">
                <span className="nav-divider"></span>
                {PERSONAL_TABS.map(tt =>
                  <button key={tt.id} className={`nav-tab personal${tab===tt.id ? ' active' : ''}`} onClick={() => setTab(tt.id)}>
                    <span className="nav-icon">{tt.icon}</span>{tt.label}
                  </button>
                )}
              </div>
            </nav>
          </header>
          <main className="main">{renderActive()}</main>
        </div>
      </div>
    </div> 
    <ChatBot visible={landingUp} />
    </>
  );
}
