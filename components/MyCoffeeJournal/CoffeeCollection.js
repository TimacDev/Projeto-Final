import { useState } from "react";
import CoffeeModal from "./CoffeeModal";

export default function CoffeeCollection({ coffees, onRated, onError }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="log-collection-title">
        Coffee collection{" "}
        {coffees.length > 0 && (
          <span className="log-collection-count">({coffees.length} coffees)</span>
        )}
      </div>
      {coffees.length === 0 ? (
        <div className="empty-state">
          No coffees added yet.
          <br />
          Add your first one →
        </div>
      ) : (
        <div className="log-collection">
          {coffees.map((c) => (
            <div
              key={c.id}
              className="log-entry"
              role="button"
              tabIndex={0}
              onClick={() => setSelected(c)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setSelected(c);
                }
              }}
            >
              <div className="log-entry-title">{c.name}</div>
              <div className="log-entry-meta">
                {c.roaster}
                {c.country && ` · ${c.country}`}
                {c.roast_level && ` · ${c.roast_level}`}
                {` · ${c.rating != null ? `${c.rating}/10 ⭐ (average of all ratings)` : "NA"}`}
              </div>
              {c.roaster_notes && (
                <div className="log-entry-tags">
                  {c.roaster_notes
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selected && (
        <CoffeeModal
          coffee={selected}
          onClose={() => setSelected(null)}
          onRated={onRated}
          onError={onError}
        />
      )}
    </div>
  );
}
