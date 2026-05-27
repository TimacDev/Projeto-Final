'use client';

import { useState } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

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

const BREW_METHODS = [
  { id:'pourover', name:'Pour-Over', icon:'☕', time:'3–4 min', ratio:'1:15', difficulty:'Medium',
    steps:[
      'Boil water and let it cool to 93°C (just off boil).',
      'Place a paper filter in the dripper and rinse it with hot water — this removes papery taste.',
      'Grind coffee to a medium-fine consistency (like table salt).',
      'Add grounds and create a small well in the center.',
      'Pour 50ml of water to "bloom" the grounds — wait 30 seconds as CO₂ escapes.',
      'Continue pouring in slow, steady spirals until you reach 300ml total.',
      'Total brew time should be 3–4 minutes. Adjust grind if needed.',
    ] },
  { id:'espresso', name:'Espresso', icon:'◆', time:'25–30 sec', ratio:'1:2', difficulty:'Hard',
    steps:[
      'Grind coffee very fine — finer than table salt, almost like flour.',
      'Dose 18–20g of ground coffee into the portafilter basket.',
      'Tamp the grounds firmly and evenly with about 15kg of pressure.',
      'Lock the portafilter into the machine and start the shot immediately.',
      'A good shot runs 25–30 seconds and produces 36–40ml of espresso.',
      'Look for a golden-brown crema on top — sign of a well-extracted shot.',
      'If too fast: grind finer. If too slow: grind coarser.',
    ] },
  { id:'frenchpress', name:'French Press', icon:'▲', time:'4 min', ratio:'1:12', difficulty:'Easy',
    steps:[
      'Heat water to 93°C. Preheat the French press with hot water, then discard.',
      'Grind coffee coarsely — like rough sea salt.',
      'Add grounds to the press (use about 30g per 360ml of water).',
      'Pour all the hot water at once and stir gently.',
      'Place the plunger on top without pressing and let it steep for 4 minutes.',
      'Press the plunger down slowly and steadily.',
      'Pour immediately — leaving it too long makes it bitter.',
    ] },
  { id:'aeropress', name:'AeroPress', icon:'◉', time:'1–2 min', ratio:'1:12', difficulty:'Easy',
    steps:[
      'Place a paper filter in the cap and rinse with hot water.',
      'Set the AeroPress in inverted position on a table.',
      'Add 15g of medium-fine ground coffee.',
      'Pour 180ml of 85–90°C water (slightly cooler than other methods).',
      'Stir 3–4 times and place the cap on top.',
      'After 1 minute, flip onto your mug and press down gently for 20–30 seconds.',
      'A hiss means all water has passed through — you\'re done.',
    ] },
  { id:'coldbrew', name:'Cold Brew', icon:'◐', time:'12–24 hrs', ratio:'1:8', difficulty:'Easy',
    steps:[
      'Grind coffee very coarsely — like breadcrumbs.',
      'Combine 100g of coffee with 800ml of cold or room-temperature water.',
      'Stir to ensure all grounds are saturated.',
      'Cover and refrigerate for 12–24 hours. Longer = stronger.',
      'Strain through a fine mesh sieve or cheesecloth.',
      'The concentrate can be diluted 1:1 with water or milk when serving.',
      'Keeps refrigerated for up to 2 weeks.',
    ] },
];

const QUIZ_QUESTIONS = [
  { q: 'When you think of a perfect drink, you prefer it to be…',
    options: ['Sweet and smooth', 'Bold and intense', 'Bright and refreshing', 'Mild and comforting'] },
  { q: 'Which food flavor do you enjoy most?',
    options: ['Fresh berries or citrus fruit', 'Dark chocolate or caramel', 'Roasted nuts or toffee', 'Earthy mushroom or cedar'] },
  { q: 'How do you feel about acidity (think lemon, vinegar, sourdough)?',
    options: ['I love it — bright and lively!', 'A little is fine but not too much', 'I prefer things smooth and mellow', 'I actively avoid acidic foods'] },
  { q: 'What sounds most appealing for your morning coffee?',
    options: ['A delicate, floral pour-over', 'A punchy double espresso', 'A smooth, chocolatey latte', 'A cold brew over ice'] },
  { q: 'How do you usually take your coffee?',
    options: ['Black — I want to taste everything', 'With a little milk or cream', 'Sweet — sugar or flavored syrup', 'I\'m still figuring that out'] },
];

const QUIZ_RESULTS = [
  { title:'The Bright Explorer', tags:['Fruity','Floral','Light Roast'], desc:'You love vibrant, complex flavors. Ethiopian and Kenyan light roasts are made for you.', recs:['Ethiopian Yirgacheffe','Kenyan AA','Guatemalan Antigua'] },
  { title:'The Bold Purist', tags:['Intense','Dark','Espresso'], desc:'You want coffee that punches back. Dark roasts and well-pulled espressos are your territory.', recs:['Sumatra Mandheling','Italian-style espresso blend','Vietnamese robusta'] },
  { title:'The Smooth Sipper', tags:['Caramel','Balanced','Medium Roast'], desc:'You like comfort and sweetness. Colombian and Brazilian medium roasts will become your go-to.', recs:['Colombian Huila','Brazilian Santos','Honduras Marcala'] },
  { title:'The Curious Taster', tags:['Versatile','Open to all'], desc:'You\'re still exploring — which is the best place to be. Try one coffee from each roast level and see what surprises you.', recs:['Ethiopian Yirgacheffe (light)','Colombian Huila (medium)','Sumatra Mandheling (dark)'] },
];

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

const REGIONS = {
  africa:   { label:'Africa',       short:'Africa' },
  americas: { label:'The Americas', short:'Americas' },
  asia:     { label:'Asia-Pacific', short:'Asia-Pacific' },
};

const WATER_MINERALS = [
  { sym:'Ca', name:'Calcium', role:'The extractor',
    desc:'Binds to coffee compounds and pulls them out of the grounds. Too little — your cup tastes empty and thin. Too much — it scales your machine.' },
  { sym:'Mg', name:'Magnesium', role:'The flavor amplifier',
    desc:'Pulls fruit, sweetness, and aromatic compounds more aggressively than calcium. High-magnesium water makes a noticeably juicier, more vibrant cup.' },
  { sym:'HCO₃', name:'Bicarbonates', role:'The buffer',
    desc:'Neutralizes acidity. A little balances brightness; too much flattens the cup into something dull and chalky. The most common reason tap water tastes bad.' },
];

const WATER_SOURCES = [
  { name:'Distilled / RO',     score:1, note:'Strips all minerals. Under-extracts badly — flat, sour, paper-like.' },
  { name:'Soft tap water',     score:2, note:'Often passable, but chlorine and inconsistent minerals dull flavor.' },
  { name:'Hard tap water',     score:1, note:'Scales equipment and bullies the acidity. Will ruin a good bean.' },
  { name:'Filter pitcher',     score:3, note:'Removes chlorine, keeps useful minerals. The realistic upgrade.' },
  { name:'Bottled spring',     score:4, note:'Look for ~150 ppm TDS. Volvic and similar are café favorites.' },
  { name:'Remineralized RO',   score:5, note:'Distilled + measured mineral packets. Repeatable, ideal — and a hassle.' },
];

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

const ROAST_DATA = [
  { name:'Light ☀️', temp:'196–205°C', acidity:'High', body:'Light', flavor:['Fruity','Floral','Citrus','Bright'], notes:'The bean’s origin character shines through. More caffeine, complex aromas, and the most nuanced flavor. Harder to brew well.', beans:'Ethiopian Yirgacheffe, Kenyan AA, Guatemalan Antigua' },
  { name:'Medium 🌤️', temp:'210–220°C', acidity:'Medium', body:'Medium', flavor:['Caramel','Chocolate','Nutty','Balanced'], notes:'The sweet spot for most people. Roast flavors begin to emerge but origin character is still present. Forgiving to brew.', beans:'Colombian Huila, Brazilian Santos, Honduras Marcala' },
  { name:'Medium-Dark 🌥️', temp:'225°C', acidity:'Low', body:'Full', flavor:['Dark chocolate','Toffee','Roasty','Bold'], notes:'Rich and full-bodied. The roast starts to dominate. Common for espresso blends — handles milk well.', beans:'Sumatra Mandheling, Ethiopian Harrar (dark), Espresso blends' },
  { name:'Dark 🌑', temp:'230°C+', acidity:'Very Low', body:'Heavy', flavor:['Bitter','Smoky','Burnt caramel','Spicy'], notes:'Intense and polarizing. Origin character is almost entirely replaced by roast flavor. Low caffeine relative to weight.', beans:'Italian espresso blends, French roast, Chicory blend' },
];

// ─── SHARED ──────────────────────────────────────────────────────────────────

function TasteDots({ value }) {
  return (
    <div className="taste-dots">
      {[1,2,3,4,5].map(i =>
        <span key={i} className={`taste-dot${i<=value?' on':''}`}></span>
      )}
    </div>
  );
}

// ─── HISTORY ─────────────────────────────────────────────────────────────────

function History({ goTab }) {
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
            <div className="history-stat-num">5 yrs</div>
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
        {TIMELINE.map((t,i) =>
          <div key={i} className={`timeline-item${t.accent?' accent':''}`}>
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
          <button className="btn primary" onClick={()=>goTab('origins')}>Explore origins →</button>
          <button className="btn" onClick={()=>goTab('brew')}>Start brewing →</button>
        </div>
      </div>
    </div>
  );
}

// ─── ORIGINS ─────────────────────────────────────────────────────────────────

function Origins() {
  const [region, setRegion] = useState('all');
  const [selected, setSelected] = useState(null);
  const filters = ['all','africa','americas','asia'];
  const shown = region === 'all' ? ORIGINS : ORIGINS.filter(o => o.region === region);

  const counts = {
    africa: ORIGINS.filter(o=>o.region==='africa').length,
    americas: ORIGINS.filter(o=>o.region==='americas').length,
    asia: ORIGINS.filter(o=>o.region==='asia').length,
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
          <button key={f} className={`chip${region===f?' active':''}`} onClick={()=>setRegion(f)}>
            {f==='all' ? 'All' : REGIONS[f].short}
          </button>
        )}
      </div>

      <div className="cards-grid">
        {shown.map(o =>
          <div key={o.id} className="origin-card" onClick={()=>setSelected(o)}>
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
        <div className="overlay-bg" onClick={()=>setSelected(null)}>
          <div className="overlay-card" onClick={e=>e.stopPropagation()}>
            <button className="overlay-close" onClick={()=>setSelected(null)}>✕ close</button>
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

// ─── BREW GUIDE ──────────────────────────────────────────────────────────────

function BrewGuide() {
  const [method, setMethod] = useState(BREW_METHODS[0]);
  const [step, setStep] = useState(0);
  return (
    <div>
      <h1 className="page-title">⚗️ Brew Methods</h1>
      <p className="page-sub">Pick a brew method and follow the steps.</p>
      <div className="method-grid">
        {BREW_METHODS.map(m =>
          <div key={m.id} className={`method-btn${method.id===m.id?' active':''}`} onClick={()=>{ setMethod(m); setStep(0); }}>
            <span className="method-icon">{m.icon}</span>
            {m.name}
          </div>
        )}
      </div>
      <div className="brew-stats">
        <div className="brew-stat"><div className="brew-stat-val">{method.time}</div><div className="brew-stat-key">Brew time</div></div>
        <div className="brew-stat"><div className="brew-stat-val">{method.ratio}</div><div className="brew-stat-key">Coffee:water</div></div>
        <div className="brew-stat"><div className="brew-stat-val">{method.difficulty}</div><div className="brew-stat-key">Difficulty</div></div>
      </div>
      <div className="divider"></div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div className="label">Step {step+1} of {method.steps.length}</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}>← Back</button>
          <button className="btn accent" onClick={()=>setStep(s=>Math.min(method.steps.length-1,s+1))} disabled={step===method.steps.length-1}>Next →</button>
          {step===method.steps.length-1 && <button className="btn primary" onClick={()=>setStep(0)}>Start over</button>}
        </div>
      </div>
      <div className="progress-bar" style={{marginBottom:20}}>
        <div className="progress-fill" style={{width:`${((step+1)/method.steps.length)*100}%`}}></div>
      </div>
      <div className="steps-list">
        {method.steps.map((s,i) =>
          <div key={i} className="step-row" style={{opacity: i===step?1 : i<step?0.5:0.3}}>
            <div className={`step-num${i<step?' done':''}`}>{i<step?'✓':i+1}</div>
            <div className="step-text" style={{fontWeight: i===step?700:400}}>{s}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── WATER ───────────────────────────────────────────────────────────────────

function WaterGuide() {
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
          <div className="label" style={{marginBottom:4}}>SCA target window</div>
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

      <div className="label">The three minerals that matter</div>
      <div className="divider" style={{marginTop:4}}></div>
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
      <div className="divider" style={{marginTop:4}}></div>
      <div style={{marginBottom:24}}>
        {WATER_SOURCES.map(s =>
          <div key={s.name} className={`source-row${s.score>=4?' best':''}`}>
            <div className="src-name">{s.name}</div>
            <div className="src-meter">
              {[1,2,3,4,5].map(i => <span key={i} className={i<=s.score?'on':''}></span>)}
            </div>
            <div className="src-note">{s.note}</div>
          </div>
        )}
      </div>

      <div className="sk-box accent" style={{padding:'16px 20px'}}>
        <div className="label" style={{color:'#5a4632',marginBottom:2}}>Rule of thumb</div>
        <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:22,lineHeight:1.25,letterSpacing:'-0.01em'}}>
          If your tap water doesn't taste good on its own, it won't make coffee that does.
        </div>
      </div>
    </div>
  );
}

// ─── HARDWARE ────────────────────────────────────────────────────────────────

function HardwareGuide() {
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
      <div className="divider" style={{marginTop:4}}></div>
      <div className="hw-rank">
        {HW_PRIORITY.map((p,i) =>
          <div key={p.name} className={`hw-rank-row${i===0?' first':''}`}>
            <div className="hw-rank-num">{i+1}</div>
            <div className="hw-rank-name">{p.name}</div>
            <div className="hw-rank-bar"><div className="hw-rank-fill" style={{width:`${p.pct}%`}}></div></div>
            <div className="hw-rank-pct">{p.pct}%</div>
          </div>
        )}
      </div>
      <p style={{fontSize:13,color:'#7a6245',fontStyle:'italic',marginBottom:32,marginTop:8}}>
        Rough impact-on-cup-quality estimate. Spend accordingly.
      </p>

      <div className="label">Why the grinder, specifically</div>
      <div className="divider" style={{marginTop:4}}></div>
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
      <div className="divider" style={{marginTop:4}}></div>
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
      <div className="divider" style={{marginTop:4}}></div>
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

// ─── PROCESSING ──────────────────────────────────────────────────────────────

function ProcessingGuide() {
  const [selected, setSelected] = useState(PROCESSING_METHODS[0]);
  return (
    <div>
      <h1 className="page-title">🫧 Processing Guide</h1>
      <p className="page-sub">Between the cherry and the cup lies the most important — and most overlooked — choice in coffee. How the fruit is removed shapes everything that follows.</p>

      <div className="proc-grid">
        {PROCESSING_METHODS.map(p =>
          <div key={p.id} className={`proc-card${selected.id===p.id?' active':''}`} onClick={()=>setSelected(p)}>
            <div className="proc-cherry">
              {p.cherry.map((layer,i) => (
                <span key={i} style={{display:'inline-flex',alignItems:'center',gap:6}}>
                  {i>0 && <span className="proc-cherry-arrow">›</span>}
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
            {selected.flow.map((s,i) => (
              <span key={i} style={{display:'inline-flex',alignItems:'center',gap:6}}>
                {i>0 && <span className="proc-flow-arrow">→</span>}
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

// ─── ROAST ───────────────────────────────────────────────────────────────────

function RoastGuide() {
  const [level, setLevel] = useState(1);
  const r = ROAST_DATA[level];
  return (
    <div>
      <h1 className="page-title">🔥 Roast Types</h1>
      <p className="page-sub">Slide to explore how roast level changes flavor.</p>
      <div style={{maxWidth:600}}>
        <div className="roast-labels">
          {ROAST_DATA.map((rd,i)=><span key={i} style={{fontWeight:i===level?700:400,color:i===level?'#1a1208':'#9c845f'}}>{rd.name.split(' ')[0]}</span>)}
        </div>
        <input type="range" min={0} max={3} step={1} value={level}
          onChange={e=>setLevel(Number(e.target.value))}
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
          {r.flavor.map(f=><span key={f} className="tag">{f}</span>)}
        </div>
        <div className="divider"></div>
        <p style={{fontSize:15,lineHeight:1.5,color:'#2c1a0e',marginBottom:10}}>{r.notes}</p>
        <div className="label">Best beans for this roast</div>
        <div style={{fontSize:14,color:'#7a6245'}}>{r.beans}</div>
      </div>
      <div className="roast-compare">
        {ROAST_DATA.map((rd,i)=>
          <div key={i} className={`roast-col${i===level?' active':''}`} onClick={()=>setLevel(i)}>
            <div className="roast-col-title">{rd.name}</div>
            <div className="roast-col-tags">{rd.flavor.slice(0,2).map(f=><span key={f}>{f}</span>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ ────────────────────────────────────────────────────────────────────

function TasteQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  function pickResult(ans) {
    const counts = [0,0,0,0];
    ans.forEach(a => counts[a]++);
    const max = Math.max(...counts);
    return QUIZ_RESULTS[counts.indexOf(max)];
  }

  function choose(idx) {
    setSelected(idx);
    setTimeout(() => {
      const next = [...answers, idx];
      setAnswers(next);
      setSelected(null);
      if (step < QUIZ_QUESTIONS.length - 1) setStep(s=>s+1);
      else setStep(5);
    }, 320);
  }

  function restart() { setStep(0); setAnswers([]); setSelected(null); }

  if (step === 5) {
    const result = pickResult(answers);
    return (
      <div className="quiz-wrap">
        <h1 className="page-title">Your Coffee Profile</h1>
        <div className="sk-box result-box" style={{marginTop:16}}>
          <div className="result-title">{result.title}</div>
          <div className="result-tags">{result.tags.map(t=><span key={t} className="result-tag">{t}</span>)}</div>
          <p style={{fontSize:16,lineHeight:1.5,color:'#2c1a0e',marginBottom:16}}>{result.desc}</p>
          <div className="divider"></div>
          <div className="label">Coffees to try</div>
          <div className="rec-grid">
            {result.recs.map(r=><div key={r} className="sk-box dashed" style={{textAlign:'center',fontSize:15}}>{r}</div>)}
          </div>
        </div>
        <button className="btn" style={{marginTop:12}} onClick={restart}>← Retake quiz</button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  return (
    <div className="quiz-wrap">
      <h1 className="page-title">Taste Quiz</h1>
      <p className="page-sub">5 quick questions to find your flavor profile.</p>
      <div className="progress-bar" style={{marginBottom:24}}>
        <div className="progress-fill" style={{width:`${(step/QUIZ_QUESTIONS.length)*100}%`}}></div>
      </div>
      <div className="label">Question {step+1} of {QUIZ_QUESTIONS.length}</div>
      <div className="quiz-question">{q.q}</div>
      <div className="quiz-options">
        {q.options.map((opt,i)=>
          <button key={i} className={`quiz-option${selected===i?' selected':''}`} onClick={()=>choose(i)}>
            {opt}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── LOG ─────────────────────────────────────────────────────────────────────

function MyLog() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name:'', method:'', roast:'', notes:'' });

  function addEntry(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setEntries(prev => [{ ...form, id: Date.now(), date: new Date().toLocaleDateString() }, ...prev]);
    setForm({ name:'', method:'', roast:'', notes:'' });
  }

  return (
    <div>
      <h1 className="page-title">📓 My Log</h1>
      <p className="page-sub">Record every cup you drink and build your taste history.</p>
      <div className="log-layout">
        <form className="sk-box log-form" onSubmit={addEntry} style={{padding:20}}>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:22,marginBottom:4,letterSpacing:'-0.01em'}}>Log a cup</div>
          <div>
            <div className="log-field-label">Coffee name *</div>
            <input className="log-input" placeholder="e.g. Ethiopian Yirgacheffe" value={form.name}
              onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          </div>
          <div>
            <div className="log-field-label">Brew method</div>
            <select className="log-input" value={form.method} onChange={e=>setForm(f=>({...f,method:e.target.value}))}>
              <option value="">— select —</option>
              {BREW_METHODS.map(m=><option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <div className="log-field-label">Roast level</div>
            <select className="log-input" value={form.roast} onChange={e=>setForm(f=>({...f,roast:e.target.value}))}>
              <option value="">— select —</option>
              {['Light','Medium','Medium-Dark','Dark'].map(r=><option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <div className="log-field-label">Tasting notes</div>
            <input className="log-input" placeholder="e.g. fruity, bright, chocolatey" value={form.notes}
              onChange={e=>setForm(f=>({...f,notes:e.target.value}))} />
          </div>
          <button className="btn primary" type="submit">Add entry ✓</button>
        </form>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:22,marginBottom:14,letterSpacing:'-0.01em'}}>
            History {entries.length>0 && <span style={{fontSize:15,color:'#9c845f'}}>({entries.length} cups)</span>}
          </div>
          {entries.length === 0
            ? <div className="empty-state">No cups logged yet.<br/>Add your first one →</div>
            : <div className="log-history">
                {entries.map(e=>(
                  <div key={e.id} className="log-entry">
                    <div className="log-entry-title">{e.name}</div>
                    <div className="log-entry-meta">{e.date}{e.method && ` · ${e.method}`}{e.roast && ` · ${e.roast} roast`}</div>
                    {e.notes && (
                      <div className="log-entry-tags">
                        {e.notes.split(',').map(t=>t.trim()).filter(Boolean).map(t=>
                          <span key={t} className="tag">{t}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

const GUIDE_GROUPS = [
  { theme:'Understanding', tabs: [{ id:'history', label:'History' }] },
  { theme:'Exploring',     tabs: [{ id:'origins', label:'Origins' }, { id:'processing', label:'Processing' }] },
  { theme:'Brewing',       tabs: [{ id:'brew', label:'Methods' }, { id:'water', label:'Water' }, { id:'hardware', label:'Hardware' }, { id:'roast', label:'Roast' }] },
];
const PERSONAL_TABS = [
  { id:'quiz', label:'Taste Quiz', icon:'✦' },
  { id:'log',  label:'My Log',     icon:'❒' },
];

export default function App() {
  const [landingUp, setLandingUp] = useState(false);
  const [tab, setTab] = useState('history');

  function renderActive() {
    switch (tab) {
      case 'history':    return <History goTab={setTab}/>;
      case 'origins':    return <Origins/>;
      case 'processing': return <ProcessingGuide/>;
      case 'brew':       return <BrewGuide/>;
      case 'water':      return <WaterGuide/>;
      case 'hardware':   return <HardwareGuide/>;
      case 'roast':      return <RoastGuide/>;
      case 'quiz':       return <TasteQuiz/>;
      case 'log':        return <MyLog/>;
      default:           return null;
    }
  }

  return (
    <div className="stage">
      <div className={`stage-track${landingUp ? ' move-up' : ''}`}>
        <div className="panel landing">
          <div className="landing-eyebrow">A field guide for the curious</div>
          <h1 className="landing-title">Grounds.</h1>
          <p className="landing-sub">
            Discover the world of coffee — from origin to cup. Explore brew methods, find your flavor profile, and log every cup along the way.
          </p>
          <button className="landing-btn" onClick={()=>setLandingUp(true)}>Enter the guide</button>
          <div className="landing-footer">Est. 2026 — For coffee aficionados in training</div>
        </div>

        <div className="panel app-shell">
          <header className="app-header">
            <button className="app-logo" onClick={()=>setLandingUp(false)}>Grounds</button>
            <nav className="app-nav">
              {GUIDE_GROUPS.map((g, gi) =>
                <span key={g.theme} style={{display:'flex',alignItems:'center',gap:4}}>
                  {gi > 0 && <span className="nav-group-sep"></span>}
                  <div className="nav-group">
                    <span className="nav-group-label">{g.theme}</span>
                    {g.tabs.map(tt =>
                      <button key={tt.id} className={`nav-tab${tab===tt.id?' active':''}`} onClick={()=>setTab(tt.id)}>{tt.label}</button>
                    )}
                  </div>
                </span>
              )}
              <div className="nav-personal">
                <span className="nav-divider"></span>
                {PERSONAL_TABS.map(tt=>
                  <button key={tt.id} className={`nav-tab personal${tab===tt.id?' active':''}`} onClick={()=>setTab(tt.id)}>
                    <span className="nav-icon">{tt.icon}</span>{tt.label}
                  </button>
                )}
              </div>
            </nav>
          </header>
          <main className="main">{renderActive()}</main>
        </div>
      </div>
    </div>
  );
}
