import { useState, useEffect} from 'react';
import { BREW_METHODS } from '../data/brewMethods';

const EMPTY_FORM = { coffee_id:'', brewed_at:'', method:'', dose_g:'', water_g:'', grind_setting:'', water_temp_c:'', brew_time_sec:'', notes:'' };

export default function MyLog() {
  const [entries, setEntries] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetch('/api/coffees')
    .then(r => r.json())
    .then(data => setCoffees(data))
    .catch(() => {});
  }, []);

  async function addEntry(e) {
    e.preventDefault();
    if (!form.coffee_id) return;

    const res = await fetch('/api/brew-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) return;

    const coffee = coffees.find(c => c.id === Number(form.coffee_id));
    setEntries(prev => [{ ...form, id: Date.now(), date: new Date().toLocaleDateString(), name: coffee?.name ?? '' }, ...prev]);
    setForm(EMPTY_FORM);
  }

  return (
    <div>
      <h1 className="page-title">📓 My Coffee Journal</h1>
      <p className="page-sub">Record every cup you drink and build your taste history.</p>
      <div className="log-layout">
        <form className="sk-box log-form" onSubmit={addEntry} style={{padding:20}}>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:22,marginBottom:4,letterSpacing:'-0.01em'}}>Log a cup</div>

          <div>
            <div className="log-field-label">Coffee name *</div>
            <select className="log-input" value={form.coffee_id}
              onChange={e => setForm(f => ({...f, coffee_id: e.target.value}))}>
              <option value="">— select a coffee —</option>
              {coffees.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <div className="log-field-label">Brewed at</div>
            <input className="log-input" type="date" value={form.brewed_at}
              onChange={e => setForm(f => ({...f, brewed_at: e.target.value}))} />
          </div>

          <div>
            <div className="log-field-label">Brew method</div>
            <select className="log-input" value={form.method} onChange={e => setForm(f => ({...f, method:e.target.value}))}>
              <option value="">— select —</option>
              {BREW_METHODS.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>

          <div>
            <div className="log-field-label">Coffee dose (g)</div>
            <input className="log-input" type="number" placeholder="e.g. 18" value={form.dose_g}
              onChange={e => setForm(f => ({...f, dose_g: e.target.value}))} />
          </div>

          <div>
            <div className="log-field-label">Water (g)</div>
            <input className="log-input" type="number" placeholder="e.g. 300" value={form.water_g}
              onChange={e => setForm(f => ({...f, water_g: e.target.value}))} />
          </div>

          <div>
            <div className="log-field-label">Grind setting</div>
            <input className="log-input" placeholder="e.g. 15 clicks, medium-fine" value={form.grind_setting}
              onChange={e => setForm(f => ({...f, grind_setting: e.target.value}))} />
          </div>

          <div>
            <div className="log-field-label">Water temp (°C)</div>
            <input className="log-input" type="number" placeholder="e.g. 93" value={form.water_temp_c}
              onChange={e => setForm(f => ({...f, water_temp_c: e.target.value}))} />
          </div>

          <div>
            <div className="log-field-label">Brew time (sec)</div>
            <input className="log-input" type="number" placeholder="e.g. 210" value={form.brew_time_sec}
              onChange={e => setForm(f => ({...f, brew_time_sec: e.target.value}))} />
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
                    <div className="log-entry-meta">
                      {e.date}
                      {e.method && ` · ${e.method}`}
                      {e.dose_g && ` · ${e.dose_g}g`}
                      {e.water_temp_c && ` · ${e.water_temp_c}°C`}
                    </div>
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
