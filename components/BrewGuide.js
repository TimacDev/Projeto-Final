import { useState } from 'react';
import { BREW_METHODS } from '../data/brewMethods';

export default function BrewGuide() {
  const [method, setMethod] = useState(BREW_METHODS[0]);
  const [step, setStep] = useState(0);

  return (
    <div>
      <h1 className="page-title">⚗️ Brew Methods</h1>
      <p className="page-sub">Pick a brew method and follow the steps.</p>
      <div className="method-grid">
        {BREW_METHODS.map(m =>
          <div key={m.id} className={`method-btn${method.id===m.id?' active':''}`} onClick={() => { setMethod(m); setStep(0); }}>
            <span className="method-icon">{m.icon}</span>
            {m.name}
          </div>
        )}
      </div>
      <div className="brew-stats">
        <div className="brew-stat"><div className="brew-stat-val">{method.time}</div><div className="brew-stat-key">Brew time</div></div>
        <div className="brew-stat"><div className="brew-stat-val">{method.ratio}</div><div className="brew-stat-key">Coffee:water</div></div>
        <div className="brew-stat"><div className="brew-stat-val">{method.difficulty}</div><div className="brew-stat-key">Difficulty</div></div>
      </div>
      <div className="divider"></div>
      <div className="brew-step-head">
        <div className="label">Step {step+1} of {method.steps.length}</div>
        <div className="brew-step-actions">
          <button className="btn" onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}>← Back</button>
          <button className="btn accent" onClick={() => setStep(s => Math.min(method.steps.length-1, s+1))} disabled={step===method.steps.length-1}>Next →</button>
          {step === method.steps.length-1 && <button className="btn primary" onClick={() => setStep(0)}>Start over</button>}
        </div>
      </div>
      <div className="progress-bar brew-progress">
        <div className="progress-fill" style={{'--fill':`${((step+1)/method.steps.length)*100}%`}}></div>
      </div>
      <div className="steps-list">
        {method.steps.map((s, i) =>
          <div key={i} className={`step-row ${i===step ? 'current' : i<step ? 'past' : 'future'}`}>
            <div className={`step-num${i<step ? ' done' : ''}`}>{i<step ? '✓' : i+1}</div>
            <div className="step-text">{s}</div>
          </div>
        )}
      </div>
    </div>
  );
}
