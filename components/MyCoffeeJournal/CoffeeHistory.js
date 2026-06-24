export default function CoffeeHistory({ coffees }) {
  return (
    <div>
      <div className="log-history-title">
        Coffee collection{" "}
        {coffees.length > 0 && (
          <span className="log-history-count">({coffees.length} coffees)</span>
        )}
      </div>
      {coffees.length === 0 ? (
        <div className="empty-state">
          No coffees added yet.
          <br />
          Add your first one →
        </div>
      ) : (
        <div className="log-history">
          {coffees.map((c) => (
            <div key={c.id} className="log-entry">
              <div className="log-entry-title">{c.name}</div>
              <div className="log-entry-meta">
                {c.roaster}
                {c.country && ` · ${c.country}`}
                {c.roast_level && ` · ${c.roast_level}`}
                {c.rating && ` · ${c.rating}/10`}
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
    </div>
  );
}
