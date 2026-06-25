import { useState, useEffect } from "react";

const EMPTY_FORM = {
  coffee_id: "",
  brewed_at: "",
  method: "",
  dose_g: "",
  water_g: "",
  grind_setting: "",
  water_temp_c: "",
  brew_time_sec: "",
  notes: "",
  rating: "",
};

// `<input type="date">` needs a YYYY-MM-DD value; DB rows come back as datetimes.
function toDateInput(value) {
  if (!value) return "";
  const str = String(value);
  return str.length >= 10 ? str.slice(0, 10) : str;
}

function entryToForm(entry) {
  const form = { ...EMPTY_FORM };
  for (const key of Object.keys(EMPTY_FORM)) {
    if (entry[key] !== undefined && entry[key] !== null) form[key] = String(entry[key]);
  }
  form.brewed_at = toDateInput(entry.brewed_at);
  return form;
}

export default function BrewLogForm({
  coffees,
  methods,
  noteOptions,
  onSubmit,
  editEntry,
  onCancelEdit,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    setForm(editEntry ? entryToForm(editEntry) : EMPTY_FORM);
  }, [editEntry]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.coffee_id) return;
    const ok = await onSubmit(form);
    if (ok) setForm(EMPTY_FORM);
  }

  return (
    <form className="sk-box log-form" onSubmit={handleSubmit}>

      <div>
        <div className="log-field-label">Coffee name</div>
        <select
          className="log-input"
          value={form.coffee_id}
          onChange={(e) => setForm((f) => ({ ...f, coffee_id: e.target.value }))}
        >
          <option value="">— select a coffee —</option>
          {coffees.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — {c.roaster}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="log-field-label">Brewed at</div>
        <input
          className="log-input"
          type="date"
          value={form.brewed_at}
          onChange={(e) => setForm((f) => ({ ...f, brewed_at: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Brew method</div>
        <select
          className="log-input"
          value={form.method}
          onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))}
        >
          <option value="">— select —</option>
          {methods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="log-field-label">Coffee dosage (g)</div>
        <input
          className="log-input"
          type="number"
          placeholder="e.g. 18"
          value={form.dose_g}
          onChange={(e) => setForm((f) => ({ ...f, dose_g: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Water dosage (g)</div>
        <input
          className="log-input"
          type="number"
          placeholder="e.g. 300"
          value={form.water_g}
          onChange={(e) => setForm((f) => ({ ...f, water_g: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Grind setting</div>
        <input
          className="log-input"
          placeholder="e.g. 15 clicks, medium-fine"
          value={form.grind_setting}
          onChange={(e) => setForm((f) => ({ ...f, grind_setting: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Water temp (°C)</div>
        <input
          className="log-input"
          type="number"
          placeholder="e.g. 93"
          value={form.water_temp_c}
          onChange={(e) => setForm((f) => ({ ...f, water_temp_c: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Brew time (sec)</div>
        <input
          className="log-input"
          type="number"
          placeholder="e.g. 210"
          value={form.brew_time_sec}
          onChange={(e) => setForm((f) => ({ ...f, brew_time_sec: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Rating (1–10)</div>
        <input
          className="log-input"
          type="number"
          min="1"
          max="10"
          placeholder="e.g. 8"
          value={form.rating}
          onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Tasting notes</div>
        <div className="log-notes">
          {noteOptions.map((n) => {
            const checked = form.notes.split(",").filter(Boolean).includes(n);
            return (
              <label key={n} className="log-note-option">
                <input
                  type="checkbox"
                  value={n}
                  checked={checked}
                  onChange={(e) => {
                    const current = form.notes.split(",").filter(Boolean);
                    const updated = e.target.checked
                      ? [...current, n]
                      : current.filter((v) => v !== n);
                    setForm((f) => ({ ...f, notes: updated.join(",") }));
                  }}
                />
                {n}
              </label>
            );
          })}
        </div>
      </div>

      <div className="log-form-actions">
        <button className="btn primary" type="submit">
          {editEntry ? "Update cup" : "Add cup"}
        </button>
        {editEntry && (
          <button className="btn" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
