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
      <div style={{maxWidth:600}}>
        <div className="roast-labels">
          {ROAST_DATA.map((rd, i) => <span key={i} style={{fontWeight:i===level?700:400,color:i===level?'#1a1208':'#9c845f'}}>{rd.name.split(' ')[0]}</span>)}
        </div>
        <input type="range" min={0} max={3} step={1} value={level}
          onChange={e => setLevel(Number(e.target.value))}
          style={{width:'100%',accentColor:'#e8a05a',cursor:'pointer',marginBottom:20,height:8}}
        />
      </div>
      <div className="sk-box" style={{padding:'16px 20px',marginBottom:20}}>
        <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:30,marginBottom:8,letterSpacing:'-0.01em'}}>{r.name}</div>
        <div style={{display:'flex',gap:16,marginBottom:12,flexWrap:'wrap'}}>
          <div><span className="label">Temperature</span><br/><b>{r.temp}</b></div>
          <div><span className="label">Acidity</span><br/><b>{r.acidity}</b></div>
          <div><span className="label">Body</span><br/><b>{r.body}</b></div>
        </div>
        <div className="label">Flavor notes</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'6px 0 12px'}}>
          {r.flavor.map(f => <span key={f} className="tag">{f}</span>)}
        </div>
        <div className="divider"></div>
        <p style={{fontSize:15,lineHeight:1.5,color:'#2c1a0e',marginBottom:10}}>{r.notes}</p>
        <div className="label">Best beans for this roast</div>
        <div style={{fontSize:14,color:'#7a6245'}}>{r.beans}</div>
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
