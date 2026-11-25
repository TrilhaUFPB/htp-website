/** Stepped radial blades echo the HTP fan, with an open center for the copy. */
export function Aperture() {
  const point = (r: number, degrees: number) => {
    const a = (degrees * Math.PI) / 180;
    return `${(Math.cos(a) * r).toFixed(3)},${(Math.sin(a) * r).toFixed(3)}`;
  };

  const bands = [
    { inner: 270, outer: 425, offset: 0 },
    { inner: 425, outer: 890, offset: 2.6 },
  ];

  return (
    <svg
      className="aperture"
      viewBox="-800 -400 1600 800"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="aperture-inner" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="425">
          <stop offset="0.63" stopColor="#000" />
          <stop offset="0.70" stopColor="#020308" />
          <stop offset="0.78" stopColor="#11182b" />
          <stop offset="0.87" stopColor="#3b5088" />
          <stop offset="0.96" stopColor="#7894ef" />
          <stop offset="1" stopColor="#91a8ff" />
        </radialGradient>
        <radialGradient id="aperture-outer" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="890">
          <stop offset="0.47" stopColor="#87a0ff" />
          <stop offset="0.55" stopColor="#4b609e" />
          <stop offset="0.64" stopColor="#1c253e" />
          <stop offset="0.73" stopColor="#05070d" />
          <stop offset="0.82" stopColor="#000" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
      </defs>
      <g>
        {bands.flatMap(({ inner, outer, offset }, band) =>
          Array.from({ length: 40 }, (_, i) => {
            const start = i * 9 + offset;
            const end = start + 4.15;
            return (
              <path
                key={`${band}-${i}`}
                fill={band === 0 ? "url(#aperture-inner)" : "url(#aperture-outer)"}
                d={`M${point(inner, start)} L${point(outer, start)} A${outer},${outer} 0 0 1 ${point(outer, end)} L${point(inner, end)} A${inner},${inner} 0 0 0 ${point(inner, start)}Z`}
              />
            );
          }),
        )}
      </g>
    </svg>
  );
}
