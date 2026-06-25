const WATER_MINERALS = [
  { sym:'Ca', name:'Calcium', role:'The extractor',
    desc:'Binds to coffee compounds and pulls them out of the grounds. Too little — your cup tastes empty and thin. Too much — it scales your machine.' },
  { sym:'Mg', name:'Magnesium', role:'The flavor amplifier',
    desc:'Pulls fruit, sweetness, and aromatic compounds more aggressively than calcium. High-magnesium water makes a noticeably juicier, more vibrant cup.' },
  { sym:'HCO₃', name:'Bicarbonates', role:'The buffer',
    desc:'Neutralizes acidity. A little balances brightness; too much flattens the cup into something dull and chalky. The most common reason tap water tastes bad.' },
];

const WATER_SOURCES = [
  { name:'Distilled / Pure Reverse Osmosis',     score:1, note:'Strips all minerals. Under-extracts badly — flat, sour, paper-like.' },
  { name:'Soft tap water',     score:2, note:'Often passable, but chlorine and inconsistent minerals dull flavor.' },
  { name:'Hard tap water',     score:1, note:'Scales equipment and bullies the acidity. Will ruin a good bean.' },
  { name:'Filter pitcher',     score:3, note:'Removes chlorine, keeps useful minerals. The realistic upgrade.' },
  { name:'Bottled spring',     score:4, note:'Look for ~150 ppm TDS. Volvic and similar are café favorites.' },
  { name:'Remineralized Reverse Osmosis',   score:5, note:'Distilled + measured mineral packets. Repeatable, ideal — and a hassle.' },
];

export default function Water() {
  return (
    <div>
      <h1 className="page-title">💧 Water</h1>
      <p className="page-sub">Your cup is 98% water. Spend a year buying better beans and the wrong water will still flatten every one of them.</p>

      <div className="water-hero">
        <div className="water-hero-quote">
          <div className="meta">Coffee, by mass</div>
          <div className="big">98.6% water,<br/>1.4% bean.</div>
          <div className="meta">— SCA brewing standard</div>
        </div>
        <div className="water-targets">
          <div className="label">SCA target window</div>
          <div className="water-target-row">
            <span className="water-target-name">TDS</span>
            <span><span className="water-target-num">150</span><span className="water-target-unit">ppm (±50)</span></span>
          </div>
          <div className="water-target-row">
            <span className="water-target-name">Total hardness</span>
            <span><span className="water-target-num">50–175</span><span className="water-target-unit">ppm CaCO₃</span></span>
          </div>
          <div className="water-target-row">
            <span className="water-target-name">Alkalinity</span>
            <span><span className="water-target-num">40</span><span className="water-target-unit">ppm CaCO₃</span></span>
          </div>
          <div className="water-target-row">
            <span className="water-target-name">pH</span>
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
      <div>
        {WATER_SOURCES.map(s =>
          <div key={s.name} className={`source-row${s.score>=4 ? ' best' : ''}`}>
            <div className="src-name">{s.name}</div>
            <div className="src-meter">
              {[1,2,3,4,5].map(i => <span key={i} className={i<=s.score ? 'on' : ''}></span>)}
            </div>
            <div className="src-note">{s.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}
