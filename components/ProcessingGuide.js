import { useState } from 'react';
import TasteDots from './TasteDots';

const PROCESSING_METHODS = [
  { id:'washed', name:'Washed', aka:'Wet Process',
    summary:'The cherry is pulped, then fermented in water tanks to dissolve the mucilage before drying. The cleanest, most transparent expression of a bean.',
    tagline:'Maximum clarity. The bean speaks for itself.',
    cherry:['skin','pulp','parchment','bean'],
    flow:['Cherry picked','Pulped','Fermented 12–48h','Washed clean','Dried 7–12 days'],
    waterUse:'High', time:'2–4 weeks', clarity:5, sweetness:2, body:2,
    notes:['Clean','Bright','Crisp acidity','Transparent terroir'],
    pros:['Highlights origin character','Consistent, predictable cup','Showcases acidity and complexity'],
    cons:['Water-intensive (40L per kg)','Wastewater is environmental concern','Requires infrastructure'],
    origins:['Kenya','Colombia','Costa Rica','Rwanda','Ethiopia (washed)'] },
  { id:'natural', name:'Natural', aka:'Dry Process',
    summary:'The whole cherry is dried in the sun with the fruit still on. The bean absorbs sugars and fruit flavors as it dries — producing wild, jammy, fruit-bomb cups.',
    tagline:'The oldest method. The fruit goes along for the ride.',
    cherry:['skin','pulp','parchment','bean'],
    flow:['Cherry picked','Spread on raised beds','Sun-dried 3–6 weeks','Hulled (fruit removed)','Sorted'],
    waterUse:'Minimal', time:'3–6 weeks', clarity:2, sweetness:5, body:4,
    notes:['Jammy','Strawberry','Blueberry','Fermented fruit','Wine-like'],
    pros:['Almost no water needed','Pronounced sweetness','Bold, distinct flavor'],
    cons:['Inconsistent — depends on weather','Can develop off-flavors','Labor-intensive turning'],
    origins:['Ethiopia (natural)','Brazil','Yemen'] },
  { id:'honey', name:'Honey', aka:'Pulped Natural / Semi-washed',
    summary:'The skin is removed but some sticky mucilage stays on the bean while it dries. The amount of mucilage left determines the "color" — white, yellow, red, or black honey.',
    tagline:'A middle path. The best of washed and natural.',
    cherry:['mucilage','parchment','bean'],
    flow:['Cherry picked','Pulped','Mucilage retained','Dried 6–20 days','Hulled'],
    waterUse:'Low', time:'2–3 weeks', clarity:4, sweetness:4, body:3,
    notes:['Honey','Stone fruit','Caramel','Round acidity'],
    pros:['Balanced sweetness and clarity','Less water than washed','More controlled than natural'],
    cons:['Demands constant turning','Risk of mold if mishandled','Skilled labor required'],
    origins:['Costa Rica','El Salvador','Guatemala','Honduras'] },
  { id:'wethulled', name:'Wet-Hulled', aka:'Giling Basah',
    summary:'Indonesian specialty. The parchment is removed while the bean is still wet — at around 30–35% moisture — instead of after full drying. Creates the syrupy, earthy "Sumatra" cup.',
    tagline:'Indonesia’s signature. Heavy body, low acidity.',
    cherry:['parchment','bean'],
    flow:['Cherry picked','Pulped','Partial dry to 35%','Parchment hulled wet','Final drying'],
    waterUse:'Medium', time:'1–2 weeks', clarity:1, sweetness:3, body:5,
    notes:['Earthy','Cedar','Tobacco','Herbal','Syrupy body'],
    pros:['Distinctive flavor profile','Faster than full washing','Suits high-humidity climates'],
    cons:['Polarizing — earthy notes aren’t for everyone','Beans look mottled green-blue','Limited to specific regions'],
    origins:['Sumatra','Sulawesi','parts of India'] },
  { id:'anaerobic', name:'Anaerobic', aka:'Carbonic Maceration',
    summary:'Cherries (whole or pulped) ferment in sealed, oxygen-free tanks. CO₂ builds up and pressure-drives intense, exotic flavor development. The avant-garde of coffee processing.',
    tagline:'Lab-coat coffee. Wild, weird, expensive.',
    cherry:['skin','pulp','parchment','bean'],
    flow:['Cherry picked','Sealed in tank','Anaerobic ferment 24–120h','Pulped or washed','Dried slowly'],
    waterUse:'Low', time:'3–5 weeks', clarity:3, sweetness:5, body:4,
    notes:['Tropical fruit','Cinnamon','Funky','Boozy','Lychee'],
    pros:['Wildly unique flavors','Highly controlled fermentation','Premium prices'],
    cons:['Expensive equipment','Easy to over-ferment','Polarizing among purists'],
    origins:['Colombia','Costa Rica','Panama','Ethiopia (experimental)'] },
];

export default function ProcessingGuide() {
  const [selected, setSelected] = useState(PROCESSING_METHODS[0]);

  return (
    <div>
      <h1 className="page-title">🫧 Processing Guide</h1>
      <p className="page-sub">Between the cherry and the cup lies the most important — and most overlooked — choice in coffee. How the fruit is removed shapes everything that follows.</p>

      <div className="proc-grid">
        {PROCESSING_METHODS.map(p =>
          <div key={p.id} className={`proc-card${selected.id===p.id?' active':''}`} onClick={() => setSelected(p)}>
            <div className="proc-cherry">
              {p.cherry.map((layer, i) => (
                <span key={i} style={{display:'inline-flex',alignItems:'center',gap:6}}>
                  {i > 0 && <span className="proc-cherry-arrow">›</span>}
                  <span className={`proc-cherry-layer ${layer}`}>{layer}</span>
                </span>
              ))}
            </div>
            <div className="proc-body">
              <div className="proc-eyebrow">{p.aka}</div>
              <div className="proc-name">{p.name}</div>
              <div className="proc-summary">{p.summary.slice(0,90)}…</div>
              <div className="proc-meta">
                <div>
                  <div className="proc-meta-label">Water use</div>
                  <div className="proc-meta-val">{p.waterUse}</div>
                </div>
                <div>
                  <div className="proc-meta-label">Drying time</div>
                  <div className="proc-meta-val">{p.time}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="proc-detail">
        <div>
          <div className="proc-eyebrow">{selected.aka}</div>
          <div className="proc-detail-title">{selected.name}</div>
          <div className="proc-detail-tagline">{selected.tagline}</div>
          <p style={{fontSize:14,lineHeight:1.6,color:'#2c1a0e',marginBottom:14}}>{selected.summary}</p>

          <div className="proc-section-label">Process flow</div>
          <div className="proc-flow">
            {selected.flow.map((s, i) => (
              <span key={i} style={{display:'inline-flex',alignItems:'center',gap:6}}>
                {i > 0 && <span className="proc-flow-arrow">→</span>}
                <div className="proc-flow-step">
                  <span className="step-num">{String(i+1).padStart(2,'0')}</span>
                  <span>{s}</span>
                </div>
              </span>
            ))}
          </div>

          <div className="proc-section-label">Common origins</div>
          <div className="proc-origin-chips">
            {selected.origins.map(o => <span key={o} className="proc-origin-chip">{o}</span>)}
          </div>
        </div>

        <div>
          <div className="proc-section-label">Cup profile</div>
          <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:18}}>
            <div className="taste-row"><span className="taste-row-label" style={{width:80}}>Clarity</span><TasteDots value={selected.clarity}/></div>
            <div className="taste-row"><span className="taste-row-label" style={{width:80}}>Sweetness</span><TasteDots value={selected.sweetness}/></div>
            <div className="taste-row"><span className="taste-row-label" style={{width:80}}>Body</span><TasteDots value={selected.body}/></div>
          </div>

          <div className="proc-section-label">Flavor signature</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:18}}>
            {selected.notes.map(n => <span key={n} className="tag">{n}</span>)}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div>
              <div className="proc-section-label" style={{color:'#5a7a3a'}}>+ Pros</div>
              <ul className="proc-list">
                {selected.pros.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div>
              <div className="proc-section-label" style={{color:'#c4793a'}}>− Tradeoffs</div>
              <ul className="proc-list">
                {selected.cons.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
