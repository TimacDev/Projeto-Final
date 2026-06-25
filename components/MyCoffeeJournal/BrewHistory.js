import { useState } from "react";
import { createPortal } from "react-dom";

export default function BrewHistory({ entries, onEdit, onDelete }) {
  const [selected, setSelected] = useState(null);

  function closeModal() {
    setSelected(null);
  }

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
            <div
              key={e.id}
              className="log-entry"
              role="button"
              tabIndex={0}
              onClick={() => setSelected(e)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setSelected(e);
                }
              }}
            >
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

      {/* Portal to body so position:fixed escapes the transformed .stage-track and centers on the viewport. */}
      {selected && createPortal(
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(ev) => ev.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close"
              onClick={closeModal}
            >
              ×
            </button>
            <div className="log-entry-title">{selected.name}</div>
            <div className="log-entry-meta">
              {selected.date}
              {selected.method && ` · ${selected.method}`}
              {selected.dose_g && ` · ${selected.dose_g}g`}
              {selected.water_temp_c && ` · ${selected.water_temp_c}°C`}
              {selected.rating && ` · ${selected.rating}/10`}
            </div>
            {selected.notes && (
              <div className="log-entry-tags">
                {selected.notes
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
            <div className="modal-actions">
              <button
                className="btn primary"
                onClick={() => {
                  onEdit?.(selected);
                  closeModal();
                }}
              >
                Edit
              </button>
              <button
                className="btn danger"
                onClick={() => {
                  onDelete?.(selected);
                  closeModal();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
