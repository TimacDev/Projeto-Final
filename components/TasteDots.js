// Shared 5-dot rating used by Origins and ProcessingGuide.
export default function TasteDots({ value }) {
  return (
    <div className="taste-dots">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`taste-dot${i <= value ? ' on' : ''}`}></span>
      ))}
    </div>
  );
}
