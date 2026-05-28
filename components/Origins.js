import { useState } from 'react';
import TasteDots from './TasteDots';

const ORIGINS = [
  { id:1, country:'Ethiopia', region:'africa', subregion:'Yirgacheffe',
    altitude:'1,750–2,200 m', harvest:'Oct – Dec', process:'Washed / Natural',
    body:2, acidity:5, sweetness:4,
    notes:['Jasmine','Lemon','Blueberry','Bergamot'],
    brews:['Pour-Over','AeroPress'],
    desc:'The birthplace of coffee. Yirgacheffe sits in the southern Ethiopian highlands where Arabica still grows wild. Expect a tea-like body, electric acidity, and a perfume that hangs in the cup long after the last sip.',
    fact:'Legend says a 9th-century goatherd named Kaldi noticed his goats dancing after eating red coffee cherries.' },
  { id:2, country:'Kenya', region:'africa', subregion:'Nyeri / Kirinyaga',
    altitude:'1,400–2,100 m', harvest:'Oct – Dec (main)', process:'Washed, double-fermented',
    body:3, acidity:5, sweetness:4,
    notes:['Blackcurrant','Tomato','Grapefruit','Wine'],
    brews:['Pour-Over','Filter'],
    desc:'Kenya AA is famous for its piercing acidity and savory-sweet complexity. The SL-28 and SL-34 cultivars, paired with rigorous double-fermentation, create cups that taste like crushed berries with a squeeze of citrus.',
    fact:'Beans are graded AA, AB, PB by size — AA is the largest and most prized at auction.' },
  { id:3, country:'Rwanda', region:'africa', subregion:'Western Province',
    altitude:'1,500–2,000 m', harvest:'Mar – Jul', process:'Washed',
    body:2, acidity:4, sweetness:4,
    notes:['Red apple','Brown sugar','Floral','Black tea'],
    brews:['Pour-Over','AeroPress'],
    desc:'Rwanda came late to specialty coffee but quickly became a darling of the third wave. Smallholder farms and cooperative washing stations produce delicate, clean cups with red-fruit sweetness.',
    fact:'The "potato defect" — a rare flavor flaw caused by an insect — is the famous quirk of Rwandan beans. Washing stations now hand-sort for it.' },
  { id:4, country:'Colombia', region:'americas', subregion:'Huila',
    altitude:'1,200–1,800 m', harvest:'Two harvests per year', process:'Washed',
    body:3, acidity:4, sweetness:4,
    notes:['Caramel','Red apple','Toffee','Citrus'],
    brews:['Espresso','Pour-Over','French Press'],
    desc:'Colombia has two harvests a year thanks to its position straddling the equator. Huila in the south produces some of the cleanest, sweetest cups in the country — versatile enough for any brew method.',
    fact:'Colombia is the only major producer that grows 100% Arabica — no robusta allowed.' },
  { id:5, country:'Brazil', region:'americas', subregion:'Cerrado / Sul de Minas',
    altitude:'800–1,300 m', harvest:'May – Sep', process:'Natural / Pulped Natural',
    body:4, acidity:2, sweetness:5,
    notes:['Milk chocolate','Hazelnut','Peanut','Brown sugar'],
    brews:['Espresso','French Press'],
    desc:'The world’s largest producer and the spine of most espresso blends. Brazilian coffees are low-acid, full-bodied, and unmistakably nutty-chocolatey. They’re the comfort food of coffee.',
    fact:'Brazil produces about a third of the world’s coffee — roughly one in every three cups globally.' },
  { id:6, country:'Guatemala', region:'americas', subregion:'Antigua',
    altitude:'1,500–1,700 m', harvest:'Nov – Mar', process:'Washed',
    body:3, acidity:4, sweetness:4,
    notes:['Cocoa','Orange zest','Spice','Caramel'],
    brews:['Pour-Over','Espresso'],
    desc:'Three volcanoes surround the Antigua valley. The mineral-rich soil and shade-grown Bourbon trees yield coffee with a velvety body and a smoky-sweet finish that hints at chocolate and spice.',
    fact:'Antigua coffees often carry a faint smokiness — a trace memory of the active volcano Fuego nearby.' },
  { id:7, country:'Costa Rica', region:'americas', subregion:'Tarrazú',
    altitude:'1,200–1,900 m', harvest:'Dec – Mar', process:'Honey / Washed',
    body:3, acidity:4, sweetness:4,
    notes:['Honey','Stone fruit','Almond','Bright citrus'],
    brews:['Pour-Over','AeroPress'],
    desc:'Costa Rica banned robusta in 1989 — only Arabica may be grown here. Tarrazú’s "Strictly Hard Bean" coffees, grown above 1,200 m, are dense, sweet, and remarkably clean.',
    fact:'Costa Rica pioneered the honey process — where some fruit pulp is left clinging to the bean while drying.' },
  { id:8, country:'Sumatra', region:'asia', subregion:'Mandheling / Lintong',
    altitude:'900–1,500 m', harvest:'Oct – Mar', process:'Wet-hulled (Giling Basah)',
    body:5, acidity:1, sweetness:3,
    notes:['Cedar','Tobacco','Dark chocolate','Earthy spice'],
    brews:['French Press','Espresso'],
    desc:'Sumatra is unmistakable. The wet-hulling process strips the bean of its parchment while still wet, producing the syrupy, low-acid, earthy cup the island is famous for. Polarizing — you either love it or you don’t.',
    fact:'The blue-green tinge of unroasted Sumatran beans is the visual signature of wet-hulling — not a defect.' },
  { id:9, country:'Yemen', region:'asia', subregion:'Haraz / Bani Matar',
    altitude:'1,500–2,400 m', harvest:'Oct – Dec', process:'Natural (sun-dried)',
    body:4, acidity:3, sweetness:3,
    notes:['Dried fruit','Wine','Cardamom','Cocoa nibs'],
    brews:['Pour-Over','Turkish'],
    desc:'Coffee’s adolescence happened in Yemen. The world’s first commercial coffee — shipped from the port of Mocha — came from these terraced mountainsides. Wild, complex, and unlike anything else on earth.',
    fact:'The word "mocha" originally meant "from the port of Al-Mokha in Yemen" — not chocolate.' },
  { id:10, country:'Papua New Guinea', region:'asia', subregion:'Eastern Highlands',
    altitude:'1,300–1,900 m', harvest:'Apr – Sep', process:'Washed',
    body:3, acidity:3, sweetness:4,
    notes:['Tropical fruit','Brown sugar','Floral','Light spice'],
    brews:['Pour-Over','French Press'],
    desc:'PNG coffee comes almost entirely from smallholder "garden farms" — typically fewer than 20 trees per family. The result is a clean, fruit-forward cup that bridges African brightness and Asian body.',
    fact:'Coffee arrived in PNG via Jamaican Blue Mountain seedlings in the 1920s.' },
];

const REGIONS = {
  africa:   { label:'Africa',       short:'Africa' },
  americas: { label:'The Americas', short:'Americas' },
  asia:     { label:'Asia-Pacific', short:'Asia-Pacific' },
};

export default function Origins() {
  const [region, setRegion] = useState('all');
  const [selected, setSelected] = useState(null);
  const filters = ['all','africa','americas','asia'];
  const shown = region === 'all' ? ORIGINS : ORIGINS.filter(o => o.region === region);

  const counts = {
    africa: ORIGINS.filter(o => o.region === 'africa').length,
    americas: ORIGINS.filter(o => o.region === 'americas').length,
    asia: ORIGINS.filter(o => o.region === 'asia').length,
  };

  return (
    <div>
      <h1 className="page-title">🌍 Origins Guide</h1>
      <p className="page-sub">Every great cup starts somewhere. Trace coffee back to its roots — from Ethiopian highlands to Sumatran lowlands.</p>

      <div className="origins-intro">
        <div>
          <div className="belt-stat">10 countries</div>
          <div className="belt-stat-label">in the bean belt</div>
        </div>
        <div className="belt-key">
          <div className="belt-key-row"><span className="belt-dot africa"></span> Africa <span style={{color:'#9c845f'}}>· {counts.africa}</span></div>
          <div className="belt-key-row"><span className="belt-dot americas"></span> Americas <span style={{color:'#9c845f'}}>· {counts.americas}</span></div>
          <div className="belt-key-row"><span className="belt-dot asia"></span> Asia-Pacific <span style={{color:'#9c845f'}}>· {counts.asia}</span></div>
        </div>
        <div style={{flex:1,minWidth:0,fontSize:13,color:'#7a6245',fontStyle:'italic',fontFamily:'var(--font-display)'}}>
          Coffee grows in a narrow band 25° north to 25° south of the equator — the "Bean Belt."
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label">Region</span>
        {filters.map(f =>
          <button key={f} className={`chip${region===f?' active':''}`} onClick={() => setRegion(f)}>
            {f === 'all' ? 'All' : REGIONS[f].short}
          </button>
        )}
      </div>

      <div className="cards-grid">
        {shown.map(o =>
          <div key={o.id} className="origin-card" onClick={() => setSelected(o)}>
            <div className={`origin-card-stripe ${o.region}`}></div>
            <div className="origin-card-body">
              <div className="origin-card-region">{REGIONS[o.region].short}</div>
              <div className="origin-card-country">{o.country}</div>
              <div className="origin-card-sub">{o.subregion}</div>
              <div className="origin-card-notes">
                {o.notes.slice(0,3).map(n => <span key={n} className="origin-card-note">{n}</span>)}
              </div>
              <div className="origin-card-taste">
                <div className="taste-row"><span className="taste-row-label">Body</span><TasteDots value={o.body}/></div>
                <div className="taste-row"><span className="taste-row-label">Acidity</span><TasteDots value={o.acidity}/></div>
                <div className="taste-row"><span className="taste-row-label">Sweetness</span><TasteDots value={o.sweetness}/></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="overlay-bg" onClick={() => setSelected(null)}>
          <div className="overlay-card" onClick={e => e.stopPropagation()}>
            <button className="overlay-close" onClick={() => setSelected(null)}>✕ close</button>
            <div className="origin-detail-header">
              <div>
                <span className={`origin-region-badge ${selected.region}`}>{REGIONS[selected.region].label}</span>
                <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:36,marginTop:10,lineHeight:1,letterSpacing:'-0.01em'}}>{selected.country}</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:16,color:'#7a6245',marginTop:4}}>{selected.subregion}</div>
              </div>
            </div>

            <div className="origin-stats">
              <div>
                <div className="origin-stat-label">Altitude</div>
                <div className="origin-stat-val">{selected.altitude}</div>
              </div>
              <div>
                <div className="origin-stat-label">Harvest</div>
                <div className="origin-stat-val">{selected.harvest}</div>
              </div>
              <div style={{gridColumn:'1 / -1'}}>
                <div className="origin-stat-label">Processing</div>
                <div className="origin-stat-val">{selected.process}</div>
              </div>
            </div>

            <div className="label" style={{marginBottom:6}}>Tasting profile</div>
            <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:14}}>
              <div className="taste-row"><span className="taste-row-label" style={{width:80}}>Body</span><TasteDots value={selected.body}/></div>
              <div className="taste-row"><span className="taste-row-label" style={{width:80}}>Acidity</span><TasteDots value={selected.acidity}/></div>
              <div className="taste-row"><span className="taste-row-label" style={{width:80}}>Sweetness</span><TasteDots value={selected.sweetness}/></div>
            </div>

            <div className="label">Flavor notes</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
              {selected.notes.map(n => <span key={n} className="tag">{n}</span>)}
            </div>

            <p style={{fontSize:15,lineHeight:1.55,color:'#2c1a0e',marginBottom:14}}>{selected.desc}</p>

            <div className="label">Best brewed as</div>
            <div className="brew-pills" style={{marginBottom:6}}>
              {selected.brews.map(b => <span key={b} className="brew-pill">{b}</span>)}
            </div>

            <div className="origin-fact">
              <span className="origin-fact-tag">Did you know</span>
              {selected.fact}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
