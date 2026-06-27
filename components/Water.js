const WATER_MINERALS = [
  { sym:'Ca²⁺', name:'Calcium', role:'The extractor',
    desc:'Binds to coffee compounds and pulls them out of the grounds. Too little — your cup tastes empty and thin. Too much — it scales your machine.' },
  { sym:'Mg²⁺', name:'Magnesium', role:'The flavor amplifier',
    desc:'Pulls fruit, sweetness, and aromatic compounds more aggressively than calcium. High-magnesium water makes a noticeably juicier, more vibrant cup.' },
  { sym:'HCO₃⁻', name:'Bicarbonates', role:'The buffer',
    desc:'Neutralizes acidity. A little balances brightness; too much flattens the cup into something dull and chalky. The most common reason tap water tastes bad.' },
];

const WATER_SOURCES = [
  { name:'Distilled / Pure Reverse Osmosis', note:'Strips all minerals. Under-extracts badly — flat, sour, paper-like.' },
  { name:'Hard tap water', note:'Scales equipment and bullies the acidity. Will ruin a good bean.' },
  { name:'Soft tap water', note:'Often passable, but chlorine and inconsistent minerals dull flavor.' },
  { name:'Filter pitcher', highlight:true, note:'Removes chlorine, keeps useful minerals. The realistic upgrade.' },
  { name:'Bottled spring', highlight:true, note:'Look for ~150 ppm TDS. Can be hard in countries with low minerelized waters. Mainly try to stand within the target range of bicarbonates.' },
  { name:'Remineralized + Distilled / Reverse Osmosis', note:'Distilled + measured mineral packets. Repeatable, ideal — and a wasteful hassle.' },
];

export default function Water() {
  return (
    <div>
      <h1 className="page-title">💧 Water</h1>
      <p className="page-sub">Your cup is ~98% water. Spend a year buying great beans and the wrong water will still flatten every one of them.</p>

      <div className="water-hero">
        <div className="water-hero-quote">
          <div className="meta">Coffee, by mass</div>
          <div className="big">98.5% water,<br/>1.5% bean.</div>
          <div className="meta">— SCA brewing standard</div>
        </div>
        <div className="water-targets">
          <div className="label">SCA target window</div>
          <div className="water-target-row">
            <span className="water-target-name"><abbr className="term-tip" data-tip="Total Dissolved Solids" aria-label="Total Dissolved Solids" tabIndex={0}>TDS</abbr></span>
            <span><span className="water-target-num">150</span><span className="water-target-unit">ppm (±50)</span></span>
          </div>
          <div className="water-target-row">
            <span className="water-target-name"><span className="term-tip" data-tip="Measures dissolved calcium (Ca²⁺) and magnesium (Mg²⁺) in your water" tabIndex={0}>Total hardness</span></span>
            <span><span className="water-target-num">50–175</span><span className="water-target-unit">ppm Ca²⁺ + Mg²⁺</span></span>
          </div>
          <div className="water-target-row">
            <span className="water-target-name"><span className="term-tip" data-tip="Measures the water's buffering capacity — mainly from bicarbonate (HCO₃⁻)" tabIndex={0}>Alkalinity</span></span>
            <span><span className="water-target-num">48–85</span><span className="water-target-unit">ppm HCO₃⁻</span></span>
          </div>
          <div className="water-target-row">
            <span className="water-target-name"><span className="term-tip" data-tip="Mostly a sanity check — readings far outside the target usually signal a mineral imbalance" tabIndex={0}>pH</span></span>
            <span><span className="water-target-num">6.5–7.5</span></span>
          </div>
        </div>
      </div>

      <div className="sk-box accent water-rule">
        <div className="label">Important rule of thumb</div>
        <div className="water-rule-text">
          If your water doesn't taste good on its own, it won't make coffee that does.
        </div>
      </div>

      <div className="label">The three minerals that matter</div>
      <div className="divider tight"></div>
      <div className="mineral-grid">
        {WATER_MINERALS.map(m =>
          <div key={m.sym} className="mineral-card">
            <div className="mineral-symbol">{m.sym}</div>
            <h4>{m.name}</h4>
            <div className="role">{m.role}</div>
            <p>{m.desc}</p>
          </div>
        )}
      </div>

      <div className="label">What to brew with</div>
      <div className="divider tight"></div>
      <div className="source-legend">
        <span className="source-legend-swatch"></span>
        The most relevant upgrades you can make to your brew water for coffee.
      </div>
      <div>
        {WATER_SOURCES.map((s, idx) =>
          <div key={s.name} className={`source-row${s.highlight ? ' highlight' : ''}`}>
            <div className="src-name">{s.name}</div>
            <div className="src-meter">
              {WATER_SOURCES.map((_, i) => <span key={i} className={i<=idx ? 'on' : ''}></span>)}
            </div>
            <div className="src-note">{s.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}
