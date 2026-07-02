'use client';

import { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import History from '../components/History';
import Origins from '../components/Origins';
import Processing from '../components/Processing';
import Brew from '../components/Brew';
import Water from '../components/Water';
import Hardware from '../components/Hardware';
import Roast from '../components/Roast';
import TasteQuiz from '../components/TasteQuiz';
import ChatBot from '../components/ChatBot';
import MyCoffeeJournal from '../components/MyCoffeeJournal/MyCoffeeJournal';

// Top nav structure — three themed groups + the personal tools group on the right.
const GUIDE_GROUPS = [
  { theme:'Understanding', tabs: [{ id:'history', label:'History' }] },
  { theme:'Exploring',     tabs: [{ id:'origins', label:'Origins' }, { id:'processing', label:'Processing' }] },
  { theme:'Brewing',       tabs: [{ id:'brew', label:'Methods' }, { id:'water', label:'Water' }, { id:'hardware', label:'Hardware' }, { id:'roast', label:'Roast' }] },
];
const PERSONAL_TABS = [
  { id:'quiz', label:'Taste Quiz', icon:'✦' },
  { id:'journal',  label:'My Coffee Journal',     icon:'❒' },
];

export default function App() {
  const [landingUp, setLandingUp] = useState(false);
  const [tab, setTab] = useState('history');
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [coffeePrefill, setCoffeePrefill] = useState(null);
  const [brewPrefill, setBrewPrefill] = useState(null);
  // Bumped (not toggled) each time the bot is asked to submit the open form,
  // so repeated "submit it" requests re-trigger the journal's submit effect
  // even if nothing else about the app state changed.
  const [submitSignal, setSubmitSignal] = useState(0);

  // On load, ask the server who we are (via the session cookie) so a refresh
  // keeps you logged in. authChecked avoids flashing the login form first.
  useEffect(() => {
    fetch('/api/auth/user')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  // The chat bot can't save a coffee or brew itself — it only hands back the
  // parsed fields, which we drop into the matching journal form for review.
  function handlePrefill(prefill) {
    if (prefill.type === 'coffee') setCoffeePrefill(prefill.data);
    else if (prefill.type === 'brew') setBrewPrefill(prefill.data);
    setTab('journal');
  }

  // Only meaningful if the journal (with an open form) is actually mounted —
  // unlike handlePrefill, this doesn't switch tabs, since "submit the form
  // I have open" implies it's already visible.
  function handleSubmitForm() {
    setSubmitSignal((n) => n + 1);
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setTab('history');
  }

  // Map tab id → the component to render. Keeps the JSX below readable.
  function renderActive() {
    switch (tab) {
      case 'history':    return <History goTab={setTab}/>;
      case 'origins':    return <Origins/>;
      case 'processing': return <Processing/>;
      case 'brew':       return <Brew/>;
      case 'water':      return <Water/>;
      case 'hardware':   return <Hardware/>;
      case 'roast':      return <Roast/>;
      case 'quiz':       return <TasteQuiz/>;
      // The journal is the only gated tab: show it when logged in, otherwise the
      // login/signup form. `null` while we're still checking avoids a flash.
      case 'journal':    return !authChecked ? null : user ? <MyCoffeeJournal coffeePrefill={coffeePrefill} brewPrefill={brewPrefill} submitSignal={submitSignal}/> : <Auth onAuthed={setUser}/>;
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
          <button className="landing-btn" onClick={() => { new Audio('/pouring-a-cup-of-coffee.wav').play(); setLandingUp(true); }}>Enter the guide</button>
          <div className="landing-footer">Est. 2026 — For coffee aficionados in training</div>
        </div>

        <div className="panel app-shell">
          <header className="app-header">
            <button className="app-logo" onClick={() => setLandingUp(false)}>Grounds</button>
            <nav className="app-nav">
              {GUIDE_GROUPS.map((g, gi) =>
                <span key={g.theme} className="nav-group-wrap">
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
            {user && (
              <button className="nav-tab logout" onClick={logout}>
                Log out
              </button>
            )}
          </header>
          <main className="main">{renderActive()}</main>
        </div>
      </div>
    </div> 
    <ChatBot visible={landingUp} onPrefill={handlePrefill} onSubmitForm={handleSubmitForm} />
    </>
  );
}
