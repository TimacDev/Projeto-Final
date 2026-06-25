import { useState } from 'react';

const ROAST_DATA = [
  { name:'Light ☀️', temp:'196–205°C', acidity:'High', body:'Light', flavor:['Fruity','Floral','Citrus','Bright'], notes:'The bean’s origin character shines through. More caffeine, complex aromas, and the most nuanced flavor. Harder to brew well.', beans:'Ethiopian Yirgacheffe, Kenyan AA, Guatemalan Antigua' },
  { name:'Medium 🌤️', temp:'210–220°C', acidity:'Medium', body:'Medium', flavor:['Caramel','Chocolate','Nutty','Balanced'], notes:'The sweet spot for most people. Roast flavors begin to emerge but origin character is still present. Forgiving to brew.', beans:'Colombian Huila, Brazilian Santos, Honduras Marcala' },
  { name:'Medium-Dark 🌥️', temp:'225°C', acidity:'Low', body:'Full', flavor:['Dark chocolate','Toffee','Roasty','Bold'], notes:'Rich and full-bodied. The roast starts to dominate. Common for espresso blends — handles milk well.', beans:'Sumatra Mandheling, Ethiopian Harrar (dark), Espresso blends' },
  { name:'Dark 🌑', temp:'230°C+', acidity:'Very Low', body:'Heavy', flavor:['Bitter','Smoky','Burnt caramel','Spicy'], notes:'Intense and polarizing. Origin character is almost entirely replaced by roast flavor. Low caffeine relative to weight.', beans:'Italian espresso blends, French roast, Chicory blend' },
];

export default function RoastGuide() {
  const [level, setLevel] = useState(1);
  const r = ROAST_DATA[level];

  return (
    <div>
      <h1 className="page-title">🔥 Roast Types</h1>
      <p className="page-sub">Slide to explore how roast level changes flavor.</p>
      <div className="roast-slider">
        <div className="roast-labels">
          {ROAST_DATA.map((rd, i) => <span key={i} className={i===level ? 'active' : undefined}>{rd.name.split(' ')[0]}</span>)}
        </div>
        <input type="range" min={0} max={3} step={1} value={level}
          onChange={e => setLevel(Number(e.target.value))}
          className="roast-range"
        />
      </div>
      <div className="sk-box roast-card">
        <div className="roast-name">{r.name}</div>
        <div className="roast-stats">
          <div><span className="label">Temperature</span><br/><b>{r.temp}</b></div>
          <div><span className="label">Acidity</span><br/><b>{r.acidity}</b></div>
          <div><span className="label">Body</span><br/><b>{r.body}</b></div>
        </div>
        <div className="label">Flavor notes</div>
        <div className="roast-flavors">
          {r.flavor.map(f => <span key={f} className="tag">{f}</span>)}
        </div>
        <div className="divider"></div>
        <p className="roast-notes">{r.notes}</p>
        <div className="label">Best beans for this roast</div>
        <div className="roast-beans">{r.beans}</div>
      </div>
      <div className="roast-compare">
        {ROAST_DATA.map((rd, i) =>
          <div key={i} className={`roast-col${i===level ? ' active' : ''}`} onClick={() => setLevel(i)}>
            <div className="roast-col-title">{rd.name}</div>
            <div className="roast-col-tags">{rd.flavor.slice(0,2).map(f => <span key={f}>{f}</span>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
