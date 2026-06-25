const HW_PRIORITY = [
  { name:'Grinder',  pct:50, desc:'Particle size and consistency control everything downstream.' },
  { name:'Water',    pct:25, desc:'The solvent. Wrong chemistry, no amount of fancy gear helps.' },
  { name:'Beans',    pct:15, desc:'Fresh and well-roasted matters — but only after the above.' },
  { name:'Brewer',   pct:10, desc:'A Hario V60 is $25. The brewer is the smallest variable.' },
];

const HW_KIT = [
  { icon:'⚖️', name:'Gram scale (0.1g)', why:'Brewing is a ratio. Volume scoops lie. Get one that reads in tenths of a gram.', price:'$20–40' },
  { icon:'🫖', name:'Gooseneck kettle',   why:'Slow, controlled pour. Variable temp is a nice-to-have, not essential.', price:'$40–120' },
  { icon:'⏱️', name:'Timer',              why:'Most scales have one built in. Brew time = extraction control.', price:'free' },
  { icon:'🌡️', name:'Thermometer',        why:'Or just boil and rest 30 seconds — that lands you at ~93°C.', price:'$10' },
];

export default function Hardware() {
  return (
    <div>
      <h1 className="page-title">⚙️ Hardware</h1>
      <p className="page-sub">There is one piece of equipment that matters more than every other piece of equipment combined.</p>

      <div className="hw-callout">
        <div>
          <h2>Buy the grinder.</h2>
          <p>If you can only afford to upgrade one thing in your setup, make it the grinder. A $30 burr grinder paired with a $25 V60 will outperform a $1,000 espresso machine fed by a blade grinder. Particle consistency is the foundation everything else stands on.</p>
        </div>
        <div className="badge">Rule #1</div>
      </div>

      <div className="label">Where your money actually shows up in the cup</div>
      <div className="divider tight"></div>
      <div className="hw-rank">
        {HW_PRIORITY.map((p, i) =>
          <div key={p.name} className={`hw-rank-row${i===0 ? ' first' : ''}`}>
            <div className="hw-rank-num">{i+1}</div>
            <div className="hw-rank-name">{p.name}</div>
            <div className="hw-rank-bar"><div className="hw-rank-fill" style={{'--fill':`${p.pct}%`}}></div></div>
            <div className="hw-rank-pct">{p.pct}%</div>
          </div>
        )}
      </div>
      <p className="hw-note">
        Rough impact-on-cup-quality estimate. Spend accordingly.
      </p>

      <div className="label">Why the grinder, specifically</div>
      <div className="divider tight"></div>
      <div className="hw-vs">
        <div className="hw-vs-col">
          <h4>Blade grinder</h4>
          <div className="verdict">Avoid</div>
          <ul>
            <li>Smashes beans randomly with a spinning propeller</li>
            <li>Produces dust + boulders in the same grind</li>
            <li>Dust over-extracts (bitter) while boulders under-extract (sour) — in the <em>same cup</em></li>
            <li>Heats the grounds; degrades aromatics</li>
          </ul>
        </div>
        <div className="hw-vs-divider">vs</div>
        <div className="hw-vs-col win">
          <h4>Burr grinder</h4>
          <div className="verdict">The only answer</div>
          <ul>
            <li>Two abrasive surfaces crush beans to a set gap</li>
            <li>Uniform particles → uniform extraction</li>
            <li>One clean flavor profile instead of three muddled ones</li>
            <li>Entry-level hand grinders start around $40</li>
          </ul>
        </div>
      </div>

      <div className="label">Burr shape — conical vs flat</div>
      <div className="divider tight"></div>
      <div className="hw-grinder-types">
        <div className="hw-grinder-card">
          <h4>Conical burrs</h4>
          <div className="sub">Cone inside a ring</div>
          <p>Bimodal particle distribution — produces both fines and larger grounds. The fines add body and mouthfeel. Quieter, slower, cheaper. Most hand grinders use these.</p>
          <div className="best-for">Best for: espresso, French press, body-forward cups</div>
        </div>
        <div className="hw-grinder-card">
          <h4>Flat burrs</h4>
          <div className="sub">Two parallel discs</div>
          <p>More uniform particle size, fewer fines. Cleaner, more transparent cup that highlights origin character — at the cost of body. Faster, louder, more expensive.</p>
          <div className="best-for">Best for: pour-over, light roasts, clarity-forward cups</div>
        </div>
      </div>

      <div className="label">The rest of the kit</div>
      <div className="divider tight"></div>
      <div className="hw-kit">
        {HW_KIT.map(k =>
          <div key={k.name} className="hw-kit-item">
            <div className="hw-kit-icon">{k.icon}</div>
            <div>
              <h5>{k.name}</h5>
              <p>{k.why}</p>
              <div className="price">{k.price}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
