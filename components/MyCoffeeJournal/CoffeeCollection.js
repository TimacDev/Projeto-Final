import { useState, useMemo, useEffect } from "react";
import CoffeeModal from "./CoffeeModal";

const PAGE_SIZE = 6;

export default function CoffeeCollection({ coffees, onRated, onError, onDelete, currentUserId }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState("all");
  const [page, setPage] = useState(1);

  const filteredCoffees = useMemo(() => {
    const query = search.trim().toLowerCase();
    return coffees.filter((c) => {
      if (scope === "mine" && c.user_id !== currentUserId) return false;
      if (query && !c.name.toLowerCase().includes(query) && !c.roaster.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [coffees, search, scope, currentUserId]);

  // Filters/scope changing invalidates whatever page you were on — back to page 1.
  useEffect(() => {
    setPage(1);
  }, [search, scope]);

  const totalPages = Math.max(1, Math.ceil(filteredCoffees.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleCoffees = filteredCoffees.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div>
      <div className="log-collection-title">
        Coffee collection{" "}
        {coffees.length > 0 && (
          <span className="log-collection-count">({filteredCoffees.length} coffees)</span>
        )}
      </div>

      <div className="log-form-toggle">
        <button
          className={`btn${scope === "all" ? " primary" : ""}`}
          onClick={() => setScope("all")}
        >
          All coffees
        </button>
        <button
          className={`btn${scope === "mine" ? " primary" : ""}`}
          onClick={() => setScope("mine")}
        >
          My coffees
        </button>
      </div>

      <div className="log-collection-filters">
        <input
          className="log-input"
          placeholder="Search by name or roaster…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {coffees.length === 0 ? (
        <div className="empty-state">
          No coffees added yet.
          <br />
          Add your first one →
        </div>
      ) : filteredCoffees.length === 0 ? (
        <div className="empty-state">No coffees match your filters.</div>
      ) : (
        <div className="log-collection">
          {visibleCoffees.map((c) => (
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

      {totalPages > 1 && (
        <div className="log-pagination">
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </button>
          <span className="log-pagination-status">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {selected && (
        <CoffeeModal
          coffee={selected}
          onClose={() => setSelected(null)}
          onRated={onRated}
          onError={onError}
          onDelete={onDelete}
          isOwner={selected.user_id === currentUserId}
        />
      )}
    </div>
  );
}
