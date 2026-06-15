import { useState, useEffect} from 'react';
import { BREW_METHODS } from '../data/brewMethods';

export default function MyLog() {
  const [entries, setEntries] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [form, setForm] = useState({ coffee_id:'', method:'', roast:'', notes:'' });

  useEffect(() => {
    fetch('/api/coffees')
    .then(r => r.json())
    .then(data => setCoffees(data))
    .catch(() => {});
}, []);

  function addEntry(e) {
    e.preventDefault();
    if (!form.coffee_id) return;
    const coffee = coffees.find(c => c.id === Number(form.coffee_id));
    setEntries(prev => [{ ...form, id: Date.now(), date: new Date().toLocaleDateString(), name: coffee?.name ?? '' }, ...prev]);
    setForm({ coffee_id:'', method:'', roast:'', notes:'' });

  }

  return (
    <div>
      <h1 className="page-title">📓 My Log</h1>
      <p className="page-sub">Record every cup you drink and build your taste history.</p>
      <div className="log-layout">
        <form className="sk-box log-form" onSubmit={addEntry} style={{padding:20}}>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:22,marginBottom:4,letterSpacing:'-0.01em'}}>Log a cup</div>
          <div>
            <div className="log-field-label">Coffee name</div>
              <select className="log-input" value={form.coffee_id}
              onChange={e => setForm(f => ({...f, coffee_id: e.target.value}))}>
              <option value="">— select a coffee —</option>
              {coffees.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <div className="log-field-label">Brew method</div>
            <select className="log-input" value={form.method} onChange={e => setForm(f => ({...f, method:e.target.value}))}>
              <option value="">— select —</option>
              {BREW_METHODS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <div className="log-field-label">Roast level</div>
            <select className="log-input" value={form.roast} onChange={e => setForm(f => ({...f, roast:e.target.value}))}>
              <option value="">— select —</option>
              {['Light','Medium','Medium-Dark','Dark'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <div className="log-field-label">Tasting notes</div>
            <input className="log-input" placeholder="e.g. fruity, bright, chocolatey" value={form.notes}
              onChange={e => setForm(f => ({...f, notes:e.target.value}))} />
          </div>
          <button className="btn primary" type="submit">Add entry ✓</button>
        </form>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:22,marginBottom:14,letterSpacing:'-0.01em'}}>
            History {entries.length > 0 && <span style={{fontSize:15,color:'#9c845f'}}>({entries.length} cups)</span>}
          </div>
          {entries.length === 0
            ? <div className="empty-state">No cups logged yet.<br/>Add your first one →</div>
            : <div className="log-history">
                {entries.map(e => (
                  <div key={e.id} className="log-entry">
                    <div className="log-entry-title">{e.name}</div>
                    <div className="log-entry-meta">{e.date}{e.method && ` · ${e.method}`}{e.roast && ` · ${e.roast} roast`}</div>
                    {e.notes && (
                      <div className="log-entry-tags">
                        {e.notes.split(',').map(t => t.trim()).filter(Boolean).map(t =>
                          <span key={t} className="tag">{t}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  );
}
