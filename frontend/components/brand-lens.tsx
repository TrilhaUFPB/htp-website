/**
 * The HTP sphere mark: two overlapping lenses of vertical bars. Geometry is
 * lifted from the brand file (bars 8.7 wide on a 17.4 pitch, mirrored heights
 * around y=150) so the drawn shape stays identical to the asset — rebuilding it
 * in markup is what lets each bar carry its own colour and breathing delay.
 */
const BAR_WIDTH = 8.7;
const PITCH = 17.4;
const CENTER_Y = 150;
const HEIGHTS = [47.42, 110.85, 144.64, 165.96, 178.1, 182.56, 178.1, 165.96, 144.64, 110.85, 47.42];

const LENSES = [
  { x: 28.2, fill: "#ffffff" },
  { x: 89.1, fill: "#7a94fd" },
] as const;

export function BrandLens({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      // Tight to the drawn bars (x 28.2–271.8, y 58.72–241.28) so the mark has
      // no dead padding when it is placed inline.
      viewBox="28.2 58.72 243.6 182.56"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {LENSES.map((lens, lensIndex) =>
        HEIGHTS.map((height, index) => (
          <rect
            key={`${lensIndex}-${index}`}
            className="brand-lens-bar"
            x={lens.x + index * PITCH}
            y={CENTER_Y - height / 2}
            width={BAR_WIDTH}
            height={height}
            fill={lens.fill}
            // Bars breathe outward from the middle of each lens, so the two
            // lenses pulse a beat apart instead of moving as one block.
            style={{ animationDelay: `${(Math.abs(index - 5) * 0.12 + lensIndex * 0.3).toFixed(2)}s` }}
          />
        )),
      )}
    </svg>
  );
}
