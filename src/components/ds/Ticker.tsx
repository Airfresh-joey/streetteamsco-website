/**
 * CSS-only marquee ticker (no JS animation loop). Content is duplicated so the
 * -50% keyframe loops seamlessly. Animation is disabled under prefers-reduced-motion
 * via the .ds-ticker-anim rule in design-system.css.
 */
interface TickerProps {
  items: string[];
  className?: string;
}

export default function Ticker({ items, className = '' }: TickerProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`ds-ticker-band ${className}`} aria-hidden="true">
      <div className="ds-ticker-track ds-ticker-anim">
        {doubled.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
