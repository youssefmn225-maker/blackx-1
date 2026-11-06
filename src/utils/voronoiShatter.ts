export interface Point {
  x: number;
  y: number;
}

export interface VoronoiShard {
  id: number;
  points: Point[];
  clipPathPercent: string;
  centroid: Point;
  dirX: number;
  dirY: number;
  dist: number;
  scatterDistance: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  zDistance: number;
  area: number;
  isEpicenter: boolean;
}

// Clip polygon with a half-plane: keeps points where (p - mid) . normal <= 0
function clipPolygonWithHalfPlane(
  poly: Point[],
  mid: Point,
  normal: Point
): Point[] {
  if (poly.length === 0) return [];
  const output: Point[] = [];

  for (let i = 0; i < poly.length; i++) {
    const curr = poly[i];
    const next = poly[(i + 1) % poly.length];

    const currVal = (curr.x - mid.x) * normal.x + (curr.y - mid.y) * normal.y;
    const nextVal = (next.x - mid.x) * normal.x + (next.y - mid.y) * normal.y;

    if (currVal <= 0) {
      output.push(curr);
    }

    if ((currVal <= 0 && nextVal > 0) || (currVal > 0 && nextVal <= 0)) {
      const t = currVal / (currVal - nextVal);
      output.push({
        x: curr.x + t * (next.x - curr.x),
        y: curr.y + t * (next.y - curr.y),
      });
    }
  }

  return output;
}

// Generate high-performance 14-16 crystal Voronoi shards
export function generateVoronoiShatter(
  width: number,
  height: number,
  clickX: number,
  clickY: number
): VoronoiShard[] {
  const cx = Math.max(12, Math.min(width - 12, clickX));
  const cy = Math.max(12, Math.min(height - 12, clickY));

  let seed = Math.sin(cx * 12.9898 + cy * 78.233) * 43758.5453;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const sites: { pt: Point; isEpicenter: boolean }[] = [];

  // 1. Core inner ring (6 shards)
  const numCoreSites = 6;
  for (let i = 0; i < numCoreSites; i++) {
    const angle = (i / numCoreSites) * Math.PI * 2 + (rnd() - 0.5) * 0.4;
    const radius = 12 + rnd() * 25;
    sites.push({
      pt: {
        x: Math.max(4, Math.min(width - 4, cx + Math.cos(angle) * radius)),
        y: Math.max(4, Math.min(height - 4, cy + Math.sin(angle) * radius)),
      },
      isEpicenter: true,
    });
  }

  // 2. Mid outer ring (6 shards)
  const numMidSites = 6;
  for (let i = 0; i < numMidSites; i++) {
    const angle = (i / numMidSites) * Math.PI * 2 + (rnd() - 0.5) * 0.4;
    const radius = 45 + rnd() * 60;
    sites.push({
      pt: {
        x: Math.max(4, Math.min(width - 4, cx + Math.cos(angle) * radius)),
        y: Math.max(4, Math.min(height - 4, cy + Math.sin(angle) * radius)),
      },
      isEpicenter: false,
    });
  }

  // 3. Corner anchors (4 shards)
  sites.push({ pt: { x: 4, y: 4 }, isEpicenter: false });
  sites.push({ pt: { x: width - 4, y: 4 }, isEpicenter: false });
  sites.push({ pt: { x: width - 4, y: height - 4 }, isEpicenter: false });
  sites.push({ pt: { x: 4, y: height - 4 }, isEpicenter: false });

  const shards: VoronoiShard[] = [];

  for (let i = 0; i < sites.length; i++) {
    const site = sites[i];
    let poly: Point[] = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
    ];

    for (let j = 0; j < sites.length; j++) {
      if (i === j) continue;
      const other = sites[j];

      const mid: Point = {
        x: (site.pt.x + other.pt.x) / 2,
        y: (site.pt.y + other.pt.y) / 2,
      };

      const normal: Point = {
        x: other.pt.x - site.pt.x,
        y: other.pt.y - site.pt.y,
      };

      poly = clipPolygonWithHalfPlane(poly, mid, normal);
      if (poly.length < 3) break;
    }

    if (poly.length >= 3) {
      let area = 0;
      let cX = 0;
      let cY = 0;
      for (let p = 0; p < poly.length; p++) {
        const a = poly[p];
        const b = poly[(p + 1) % poly.length];
        const cross = a.x * b.y - b.x * a.y;
        area += cross;
        cX += (a.x + b.x) * cross;
        cY += (a.y + b.y) * cross;
      }
      area = Math.abs(area) / 2;
      const centroid: Point =
        area > 1
          ? { x: cX / (6 * (area > 0 ? area : 1)), y: cY / (6 * (area > 0 ? area : 1)) }
          : site.pt;

      const dx = centroid.x - cx;
      const dy = centroid.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const dirX = dx / dist;
      const dirY = dy / dist;

      const isEpicenter = site.isEpicenter || dist < 45;
      const scatterDistance = isEpicenter ? 400 + rnd() * 300 : 280 + rnd() * 260;
      const zDistance = isEpicenter ? 350 + rnd() * 250 : 180 + rnd() * 200;

      const rotX = (rnd() - 0.5) * (isEpicenter ? 110 : 70);
      const rotY = (rnd() - 0.5) * (isEpicenter ? 110 : 70);
      const rotZ = (rnd() - 0.5) * (isEpicenter ? 140 : 80);

      const clipPathPercent = `polygon(${poly
        .map(
          (pt) =>
            `${((pt.x / width) * 100).toFixed(2)}% ${((pt.y / height) * 100).toFixed(2)}%`
        )
        .join(', ')})`;

      shards.push({
        id: i,
        points: poly,
        clipPathPercent,
        centroid,
        dirX,
        dirY,
        dist,
        scatterDistance,
        rotX,
        rotY,
        rotZ,
        zDistance,
        area,
        isEpicenter,
      });
    }
  }

  return shards;
}
