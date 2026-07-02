import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function CoffeeModal({ coffee, onClose, onRated, onError, onDelete, isOwner }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [myRating, setMyRating] = useState(null);
  const [ratingAvg, setRatingAvg] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`/api/coffees/${coffee.id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        setDetails(data);
        setComments(data.comments ?? []);
        setMyRating(data.your_rating);
        setRatingAvg(data.rating_avg);
        setRatingCount(data.rating_count);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        onError(["Couldn't load this coffee's details. Please try again."]);
        onClose();
      });
    return () => {
      active = false;
    };
  }, [coffee.id]);

  async function handleRate(value) {
    try {
      const res = await fetch(`/api/coffees/${coffee.id}/rating`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: value }),
      });
      if (!res.ok) {
        const data = await res.json();
        onError(data.errors ?? ["Couldn't save your rating. Please try again."]);
        return;
      }
      const data = await res.json();
      setMyRating(data.your_rating);
      setRatingAvg(data.rating_avg);
      setRatingCount(data.rating_count);
      onRated(coffee.id, data.rating_avg);
    } catch {
      onError(["Couldn't save your rating. Please try again."]);
    }
  }

  async function handlePostComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const res = await fetch(`/api/coffees/${coffee.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) {
        const data = await res.json();
        onError(data.errors ?? ["Couldn't post your comment. Please try again."]);
        return;
      }
      const created = await res.json();
      setComments((prev) => [created, ...prev]);
      setComment("");
    } catch {
      onError(["Couldn't post your comment. Please try again."]);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      const res = await fetch(`/api/coffees/${coffee.id}/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        onError(["Couldn't delete your comment. Please try again."]);
        return;
      }
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      onError(["Couldn't delete your comment. Please try again."]);
    }
  }

  function handleDelete() {
    if (
      !window.confirm(
        "Delete this coffee? This also removes its ratings, comments, and any brew logs — including other people's — that reference it. This can't be undone.",
      )
    ) {
      return;
    }
    onDelete(coffee);
    onClose();
  }

  const notes = details?.roaster_notes
    ? details.roaster_notes.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  // Portal to body so position:fixed escapes the transformed .stage-track and centers on the viewport.
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className="log-entry-title">{coffee.name}</div>

        {isOwner && (
          <button className="btn danger" type="button" onClick={handleDelete}>
            Delete coffee
          </button>
        )}

        {loading ? (
          <div className="log-entry-meta">Loading…</div>
        ) : (
          <>
            <div className="log-entry-meta">
              {details.roaster}
              {details.country && ` · ${details.country}`}
              {details.region && ` · ${details.region}`}
              {details.producer && ` · ${details.producer}`}
              {details.variety && ` · ${details.variety}`}
              {details.coffee_process && ` · ${details.coffee_process}`}
              {details.roast_level && ` · ${details.roast_level}`}
              {details.roast_date &&
                ` · roasted ${new Date(details.roast_date).toLocaleDateString()}`}
            </div>

            {notes.length > 0 && (
              <div className="log-entry-tags">
                {notes.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="modal-section-title">
              {ratingCount > 0
                ? `${ratingAvg}/10 ⭐ (${ratingCount} rating${ratingCount === 1 ? "" : "s"})`
                : "No ratings yet"}
            </div>

            <div className="modal-section-label">Your rating</div>
            <div className="coffee-rating">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`coffee-rating-btn${n === myRating ? " selected" : ""}`}
                  onClick={() => handleRate(n)}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="modal-section-label">
              Comments{comments.length > 0 && ` (${comments.length})`}
            </div>
            <form className="comment-form" onSubmit={handlePostComment}>
              <textarea
                className="log-input"
                rows={2}
                placeholder="Share your thoughts on this coffee…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="btn primary" type="submit" disabled={!comment.trim()}>
                Post comment
              </button>
            </form>

            <div className="comment-list">
              {comments.length === 0 ? (
                <div className="log-entry-meta">No comments yet. Be the first.</div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="comment">
                    <div className="comment-head">
                      <span className="comment-author">{c.author}</span>
                      <span className="comment-date">
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                      {c.is_mine && (
                        <button
                          className="comment-delete"
                          aria-label="Delete comment"
                          onClick={() => handleDeleteComment(c.id)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <div className="comment-body">{c.comment}</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
