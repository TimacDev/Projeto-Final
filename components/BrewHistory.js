export default function BrewHistory({ entries }) {
  return (
    <div>
      <div className="log-history-title">
        Brew history{" "}
        {entries.length > 0 && (
          <span className="log-history-count">({entries.length} cups)</span>
        )}
      </div>
      {entries.length === 0 ? (
        <div className="empty-state">
          No cups logged yet.
          <br />
          Add your first one →
        </div>
      ) : (
        <div className="log-history">
          {entries.map((e) => (
            <div key={e.id} className="log-entry">
              <div className="log-entry-title">{e.name}</div>
              <div className="log-entry-meta">
                {e.date}
                {e.method && ` · ${e.method}`}
                {e.dose_g && ` · ${e.dose_g}g`}
                {e.water_temp_c && ` · ${e.water_temp_c}°C`}
                {e.rating && ` · ${e.rating}/10`}
              </div>
              {e.notes && (
                <div className="log-entry-tags">
                  {e.notes
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
