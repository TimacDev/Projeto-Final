// Data is only used in this file, so it lives here.
const TIMELINE = [
  { year:'c. 850', place:'Ethiopia', accent:true, title:'Kaldi notices his goats dancing',
    body:'A young Ethiopian goatherd watches his flock get unusually frisky after nibbling on bright red berries from a small shrub. He tries them himself. Whether or not the story is true, every coffee tradition traces its lineage back to these Ethiopian highlands.' },
  { year:'1450s', place:'Yemen', title:'Sufi monks brew the first proper coffee',
    body:'Sufi mystics in Yemen begin roasting and brewing coffee as a way to stay awake during long evening prayers. The Yemeni port of Al-Mokha becomes the world’s first coffee export hub — and gives the world the word "mocha."' },
  { year:'1554', place:'Constantinople', accent:true, title:'The first coffeehouse opens',
    body:'Two Syrian traders open Kiva Han in Constantinople (modern Istanbul). It becomes a template for the coffeehouse as a place for political talk, gossip, music, and chess — what would eventually be called the "Penny University."' },
  { year:'1600s', place:'Europe', title:'Coffee crosses borders',
    body:'Venetian merchants bring coffee into Europe. By the late 1600s, London alone has over 300 coffeehouses, each catering to a different profession or political faction. Lloyd’s of London, the insurance market, was born inside a coffeehouse.' },
  { year:'1727', place:'Brazil', accent:true, title:'A diplomat smuggles seedlings into Brazil',
    body:'Francisco de Melo Palheta, sent to mediate a border dispute, charms the French Guianan governor’s wife into gifting him coffee seedlings hidden in a bouquet. Within a century Brazil becomes the world’s largest producer — a title it still holds.' },
  { year:'1901', place:'Tokyo / USA', title:'Instant coffee is patented',
    body:'Japanese-American chemist Satori Kato invents the first stable instant coffee. By WWII, soluble coffee becomes a staple ration — accelerating coffee’s spread but flattening its flavor for half a century.' },
  { year:'1971', place:'Seattle', title:'Second Wave begins',
    body:'Starbucks opens its first store at Pike Place Market. Over the next two decades, espresso drinks and dark-roast beans become a daily ritual for millions — the "Second Wave" of coffee culture.' },
  { year:'2000s', place:'Worldwide', accent:true, title:'The Third Wave',
    body:'Roasters begin treating coffee like wine — single-origin, single-farm, lightly roasted to showcase terroir. Direct-trade relationships replace anonymous commodity chains. The story of where a bean comes from becomes part of how it tastes.' },
];

const JOURNEY = [
  { num:'01', icon:'🌱', name:'Plant', time:'3–4 years', actors:'Farmer',
    desc:'A coffee tree grown from seed takes 3 to 4 years before it produces its first cherries. Trees can yield for 25+ years.' },
  { num:'02', icon:'🍒', name:'Cherry', time:'7–9 months', actors:'Sun & rain',
    desc:'Flowers bloom and develop into green cherries, ripening to deep red. Each cherry contains two seeds — what we call coffee beans.' },
  { num:'03', icon:'✋', name:'Harvest', time:'1 picking', actors:'Pickers',
    desc:'Cherries are hand-picked when perfectly ripe. A skilled picker collects 50–100kg per day, yielding just 10–20kg of green coffee.' },
  { num:'04', icon:'💧', name:'Process', time:'1–6 weeks', actors:'Wet mill',
    desc:'Fruit is separated from the seed — washed, natural, honey, or anaerobic. This step shapes the cup more than almost any other.' },
  { num:'05', icon:'☀️', name:'Dry & Rest', time:'2–8 weeks', actors:'Wet mill',
    desc:'Beans dry on raised beds or patios until moisture drops to ~11%. Then they rest in parchment for stability before milling.' },
  { num:'06', icon:'⚙️', name:'Mill & Grade', time:'1 week', actors:'Dry mill',
    desc:'Parchment is hulled away. Beans are sorted by size, density, and defect count, then graded — AA, screen 16, specialty, etc.' },
  { num:'07', icon:'🚢', name:'Export', time:'4–8 weeks', actors:'Trader',
    desc:'Green coffee is bagged in jute or vacuum-sealed and shipped. Most of a coffee’s life is spent in transit between farm and roaster.' },
  { num:'08', icon:'🔥', name:'Roast', time:'10–18 min', actors:'Roaster',
    desc:'The bean transforms — sugars caramelize, oils develop, hundreds of new aroma compounds form. Roast level locks in much of the final taste.' },
  { num:'09', icon:'☕', name:'Grind & Brew', time:'30s–24h', actors:'You',
    desc:'Within minutes the bean loses aroma. Grind size, water temperature, and method (espresso to cold brew) determine the cup in front of you.' },
  { num:'10', icon:'✨', name:'Cup', time:'5 min', actors:'You',
    desc:'After roughly five years of labor across three continents, a single cup of coffee reaches your hand. Worth slowing down for.' },
];

// `goTab` is passed down from the App so the CTA buttons can switch tabs.
export default function History({ goTab }) {
  return (
    <div>
      <div className="history-hero">
        <div className="history-eyebrow">Chapter 01 · Understanding</div>
        <h1 className="history-hero-title">A bean,<br/>a thousand years.</h1>
        <p className="history-hero-lead">
          Coffee has traveled further than almost any plant in human history — from a wild shrub in Ethiopian forests to a daily ritual on every continent. The story of how it got there is a story of monks, smugglers, revolutionaries, and roasters. And it begins, depending on who you ask, with a goatherd.
        </p>
        <div className="history-stats">
          <div>
            <div className="history-stat-num">2.25B</div>
            <div className="history-stat-label">Cups per day worldwide</div>
          </div>
          <div>
            <div className="history-stat-num">~70</div>
            <div className="history-stat-label">Coffee-growing countries</div>
          </div>
          <div>
            <div className="history-stat-num">~5 years</div>
            <div className="history-stat-label">From seed to your cup</div>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <span className="section-heading-num">I.</span>
        <span className="section-heading-text">A brief history</span>
        <span className="section-heading-rule"></span>
      </div>
      <p className="section-intro">
        Eight moments that shaped how the world drinks coffee — from a 9th-century legend to the specialty bag on your kitchen counter.
      </p>
      <div className="timeline">
        {TIMELINE.map((t, i) =>
          <div key={i} className={`timeline-item${t.accent ? ' accent' : ''}`}>
            <div className="timeline-year">
              {t.year}
              <span className="timeline-place">{t.place}</span>
            </div>
            <div className="timeline-title">{t.title}</div>
            <div className="timeline-body">{t.body}</div>
          </div>
        )}
      </div>

      <div className="section-heading">
        <span className="section-heading-num">II.</span>
        <span className="section-heading-text">From crop to cup</span>
        <span className="section-heading-rule"></span>
      </div>
      <p className="section-intro">
        Roughly five years pass between the day a coffee seed is planted and the morning it lands in your mug. Here is what happens in between.
      </p>
      <div className="journey">
        {JOURNEY.map(j =>
          <div key={j.num} className="journey-step">
            <div className="journey-num">{j.num}</div>
            <div className="journey-icon">{j.icon}</div>
            <div className="journey-name">{j.name}</div>
            <div className="journey-time">{j.time}</div>
            <div className="journey-desc">{j.desc}</div>
            <div className="journey-actors">{j.actors}</div>
          </div>
        )}
      </div>

      <div className="history-cta">
        <div>
          <div className="history-cta-title">Now meet the cup itself.</div>
          <div className="history-cta-sub">Trace coffee back to its origin countries, study the processing methods that shape its flavor, or jump straight to the brew bar.</div>
        </div>
        <div className="history-cta-actions">
          <button className="btn primary" onClick={() => goTab('origins')}>Explore origins →</button>
          <button className="btn" onClick={() => goTab('brew')}>Start brewing →</button>
        </div>
      </div>
    </div>
  );
}
