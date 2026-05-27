import React from 'react';

const W = 560, PAD_TOP = 52, CURVE_H = 120, PAD_BOT = 48;
const TOTAL_H = PAD_TOP + CURVE_H + PAD_BOT;

const ZONES = [
  { label: '미흡', x: 0,           w: W * 3 / 9, color: '#E0E0E0' },
  { label: '보통', x: W * 3 / 9,  w: W * 3 / 9, color: '#DFC8FA' },
  { label: '우수', x: W * 6 / 9,  w: W * 2 / 9, color: '#CE93FF' },
  { label: '탁월', x: W * 8 / 9,  w: W * 1 / 9, color: '#AB47FF' },
];

const buildCurvePoints = () => {
  const pts = [[0, PAD_TOP + CURVE_H]];
  for (let x = 0; x <= W; x += 2) {
    const z = (x / W) * 6 - 3;
    pts.push([x, PAD_TOP + CURVE_H - Math.exp(-0.5 * z * z) * (CURVE_H - 4)]);
  }
  pts.push([W, PAD_TOP + CURVE_H]);
  return pts;
};

const curvePoints = buildCurvePoints();
const polyStr = curvePoints.map(([x, y]) => `${x},${y}`).join(' ');
const lineStr = curvePoints.slice(1, -1).map(([x, y]) => `${x},${y}`).join(' ');

const BellCurveSVG = ({ percentile }) => {
  const markerX = (1 - percentile / 100) * W;
  const markerZ = (markerX / W) * 6 - 3;
  const markerCurveY = PAD_TOP + CURVE_H - Math.exp(-0.5 * markerZ * markerZ) * (CURVE_H - 4);
  const labelAnchor = markerX > W * 0.85 ? 'end' : markerX < W * 0.15 ? 'start' : 'middle';

  return (
    <svg viewBox={`0 0 ${W} ${TOTAL_H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        {ZONES.map((z, i) => (
          <clipPath key={i} id={`zc-${i}`}>
            <rect x={z.x} y={0} width={z.w} height={TOTAL_H} />
          </clipPath>
        ))}
      </defs>

      {ZONES.map((z, i) => (
        <polygon key={i} points={polyStr} fill={z.color} clipPath={`url(#zc-${i})`} />
      ))}

      {[3 / 9, 6 / 9, 8 / 9].map((r, i) => (
        <line key={i} x1={r * W} y1={PAD_TOP} x2={r * W} y2={PAD_TOP + CURVE_H}
          stroke="white" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.8" />
      ))}

      <polyline points={lineStr} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />

      {ZONES.map((z, i) => (
        <text key={i} x={z.x + z.w / 2} y={PAD_TOP + CURVE_H + 20}
          textAnchor="middle" fontSize="13" fontWeight="700"
          fill={i === 3 ? '#AB47FF' : i === 2 ? '#9B59B6' : i === 1 ? '#A888CC' : '#999'}>
          {z.label}
        </text>
      ))}

      {[100, 75, 50, 25, 0].map((pct, i) => (
        <text key={i} x={(i / 4) * W} y={PAD_TOP + CURVE_H + 38}
          textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'}
          fontSize="10" fill="#BBBBBB">
          {pct}%
        </text>
      ))}

      <line x1={markerX} y1={markerCurveY - 12} x2={markerX} y2={markerCurveY - 42}
        stroke="#F53102" strokeWidth="1.5" />
      <polygon
        points={`${markerX - 3},${markerCurveY - 12 - 5} ${markerX + 3},${markerCurveY - 12 - 5} ${markerX},${markerCurveY - 12}`}
        fill="#F53102" />
      <text x={markerX} y={markerCurveY - 48} textAnchor={labelAnchor}
        fontSize="12" fontWeight="700" fill="#F53102">
        상위 {percentile}%
      </text>
    </svg>
  );
};

export default BellCurveSVG;
