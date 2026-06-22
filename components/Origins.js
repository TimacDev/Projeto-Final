import { useState } from 'react';
import { createPortal } from 'react-dom';
import TasteDots from './TasteDots';
import { ORIGINS, REGIONS } from '../data/origins';

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
      <h1 className="page-title">Origins Guide</h1>
      <p className="page-sub">Every great cup starts somewhere. Trace coffee back to its roots — from Ethiopian highlands to Sumatran lowlands.</p>

      <div className="origins-intro">
        <div>
          <div className="belt-stat">10 countries</div>
          <div className="belt-stat-label">in the bean belt</div>
        </div>
        <div className="belt-key">
          <div className="belt-key-row"><span className="belt-dot africa"></span> Africa <span className="belt-key-count">· {counts.africa}</span></div>
          <div className="belt-key-row"><span className="belt-dot americas"></span> Americas <span className="belt-key-count">· {counts.americas}</span></div>
          <div className="belt-key-row"><span className="belt-dot asia"></span> Asia-Pacific <span className="belt-key-count">· {counts.asia}</span></div>
        </div>
        <div className="belt-fact">
          Fun fact : Coffee grows in a narrow band 25° north to 25° south of the equator — the "Bean Belt."
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
                {o.notes.slice(0,4).map(n => <span key={n} className="origin-card-note">{n}</span>)}
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

      {selected && createPortal(
        <div className="overlay-bg" onClick={() => setSelected(null)}>
          <div className="overlay-card" onClick={e => e.stopPropagation()}>
            <button className="overlay-close" onClick={() => setSelected(null)}>✕</button>
            <div className="origin-detail-header">
              <div>
                <span className={`origin-region-badge ${selected.region}`}>{REGIONS[selected.region].label}</span>
                <div className="origin-detail-country">{selected.country}</div>
                <div className="origin-detail-sub">{selected.subregion}</div>
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
              <div className="origin-stat-full">
                <div className="origin-stat-label">Common processing</div>
                <div className="origin-stat-val">{selected.process}</div>
              </div>
            </div>

            <div className="label origin-taste-label">Tasting profile</div>
            <div className="origin-taste-list">
              <div className="taste-row"><span className="taste-row-label wide">Body</span><TasteDots value={selected.body}/></div>
              <div className="taste-row"><span className="taste-row-label wide">Acidity</span><TasteDots value={selected.acidity}/></div>
              <div className="taste-row"><span className="taste-row-label wide">Sweetness</span><TasteDots value={selected.sweetness}/></div>
            </div>

            <div className="label">Flavor notes</div>
            <div className="origin-detail-notes">
              {selected.notes.map(n => <span key={n} className="tag">{n}</span>)}
            </div>

            <p className="origin-detail-desc">{selected.desc}</p>

            <div className="label">Best brewed as</div>
            <div className="brew-pills origin-detail-brews">
              {selected.brews.map(b => <span key={b} className="brew-pill">{b}</span>)}
            </div>

            <div className="origin-fact">
              <span className="origin-fact-tag">Did you know</span>
              {selected.fact}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
