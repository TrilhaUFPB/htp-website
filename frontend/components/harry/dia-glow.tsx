// Tallest in the middle, falling off almost linearly to about half at the
// edges, as in Dia's footer.
const COLUMNS = Array.from({ length: 25 }, (_, i) => {
  const x = Math.abs(i - 12) / 12;
  return Math.round((0.98 - 0.44 * x ** 1.2) * 1000) / 10;
});

/**
 * Dia's gradient: overlapping columns, each carrying the same bottom-to-top
 * ramp, blurred together into one soft mountain. Placement, blur and the ramp
 * itself come from the className (see .dia-glow in globals.css).
 */
export function DiaGlow({ className }: { className: string }) {
  return (
    <div className={`dia-glow ${className}`} aria-hidden="true">
      {COLUMNS.map((height, i) => (
        <span key={i} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}
