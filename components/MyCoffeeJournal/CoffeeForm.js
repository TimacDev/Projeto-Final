import { useState } from "react";

const PROCESS_OPTIONS = ["washed", "natural", "honey", "wet-hulled", "anaerobic"];
const ROAST_LEVELS = ["light", "medium-light", "medium", "medium-dark", "dark"];

const EMPTY_FORM = {
  coffee_name: "",
  roaster: "",
  country: "",
  region: "",
  producer: "",
  variety: "",
  coffee_process: "",
  roast_level: "",
  roast_date: "",
  roaster_notes: "",
};

export default function CoffeeForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await onSubmit(form);
    if (ok) setForm(EMPTY_FORM);
  }

  return (
    <form className="sk-box log-form" onSubmit={handleSubmit}>

      <div>
        <div className="log-field-label">Coffee name</div>
        <input
          className="log-input"
          placeholder="e.g. Cerrado Sunrise"
          value={form.coffee_name}
          onChange={(e) => setForm((f) => ({ ...f, coffee_name: e.target.value }))}
          required
        />
      </div>

      <div>
        <div className="log-field-label">Roaster</div>
        <input
          className="log-input"
          placeholder="e.g. Torra Viva"
          value={form.roaster}
          onChange={(e) => setForm((f) => ({ ...f, roaster: e.target.value }))}
          required
        />
      </div>

      <div>
        <div className="log-field-label">Country</div>
        <input
          className="log-input"
          placeholder="e.g. Brazil"
          value={form.country}
          onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
          required
        />
      </div>

      <div>
        <div className="log-field-label">Region</div>
        <input
          className="log-input"
          placeholder="e.g. Cerrado Mineiro"
          value={form.region}
          onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
          required
        />
      </div>

      <div>
        <div className="log-field-label">Producer</div>
        <input
          className="log-input"
          placeholder="e.g. Fazenda São João"
          value={form.producer}
          onChange={(e) => setForm((f) => ({ ...f, producer: e.target.value }))}
          required
        />
      </div>

      <div>
        <div className="log-field-label">Variety</div>
        <input
          className="log-input"
          placeholder="e.g. Yellow Bourbon"
          value={form.variety}
          onChange={(e) => setForm((f) => ({ ...f, variety: e.target.value }))}
          required
        />
      </div>

      <div>
        <div className="log-field-label">Process</div>
        <select
          className="log-input"
          value={form.coffee_process}
          onChange={(e) => setForm((f) => ({ ...f, coffee_process: e.target.value }))}
        >
          <option value="">— select —</option>
          {PROCESS_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="log-field-label">Roast level</div>
        <select
          className="log-input"
          value={form.roast_level}
          onChange={(e) => setForm((f) => ({ ...f, roast_level: e.target.value }))}
        >
          <option value="">— select —</option>
          {ROAST_LEVELS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="log-field-label">Roast date</div>
        <input
          className="log-input"
          type="date"
          value={form.roast_date}
          onChange={(e) => setForm((f) => ({ ...f, roast_date: e.target.value }))}
        />
      </div>

      <div>
        <div className="log-field-label">Roaster notes</div>
        <input
          className="log-input"
          placeholder="e.g. sweet, fruity, nutty"
          value={form.roaster_notes}
          onChange={(e) => setForm((f) => ({ ...f, roaster_notes: e.target.value }))}
          required
        />
      </div>

      <button className="btn primary" type="submit">
        Add coffee
      </button>
    </form>
  );
}
