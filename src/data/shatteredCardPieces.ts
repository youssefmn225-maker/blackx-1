/**
 * 12 Exact Mathematical Pieces of ONE Master Rectangular Card (1000 × 750).
 * Every shared boundary between neighboring pieces uses the exact same vertices.
 * If united, they form a perfect 1000 × 750 rectangle with zero gaps and zero overlaps.
 */

export interface ShatteredPieceDefinition {
  id: number;
  row: number;
  col: number;
  path: string;
  cx: number;
  cy: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
  delay: number;
  baseRotate: number;
}

export const MASTER_CARD_SHARDS: ShatteredPieceDefinition[] = [
  {
    // Shard 0: Top-Left Corner Piece
    id: 0,
    row: 0,
    col: 0,
    path: 'M 0 0 L 270 0 L 295 115 L 260 230 L 130 265 L 0 240 Z',
    cx: 135,
    cy: 120,
    driftX: -4,
    driftY: -4,
    driftDuration: 6.2,
    delay: 0,
    baseRotate: -0.6,
  },
  {
    // Shard 1: Top Center-Left Piece (Shares seam with Shard 0)
    id: 1,
    row: 0,
    col: 1,
    path: 'M 270 0 L 490 0 L 465 130 L 510 270 L 390 205 L 260 230 L 295 115 Z',
    cx: 385,
    cy: 135,
    driftX: -2,
    driftY: -5,
    driftDuration: 7.0,
    delay: 0.8,
    baseRotate: 0.5,
  },
  {
    // Shard 2: Top Center-Right Piece (Shares seam with Shard 1)
    id: 2,
    row: 0,
    col: 2,
    path: 'M 490 0 L 760 0 L 785 110 L 730 235 L 620 290 L 510 270 L 465 130 Z',
    cx: 625,
    cy: 140,
    driftX: 3,
    driftY: -4,
    driftDuration: 6.6,
    delay: 1.4,
    baseRotate: -0.4,
  },
  {
    // Shard 3: Top-Right Corner Piece (Shares seam with Shard 2)
    id: 3,
    row: 0,
    col: 3,
    path: 'M 760 0 L 1000 0 L 1000 260 L 870 215 L 730 235 L 785 110 Z',
    cx: 875,
    cy: 125,
    driftX: 5,
    driftY: -3,
    driftDuration: 7.4,
    delay: 2.1,
    baseRotate: 0.7,
  },
  {
    // Shard 4: Mid-Left Piece (Shares top seam with Shard 0)
    id: 4,
    row: 1,
    col: 0,
    path: 'M 0 240 L 130 265 L 260 230 L 215 375 L 235 520 L 120 480 L 0 510 Z',
    cx: 130,
    cy: 375,
    driftX: -5,
    driftY: 0,
    driftDuration: 6.8,
    delay: 0.5,
    baseRotate: -0.5,
  },
  {
    // Shard 5: Center-Left Piece (Shares top with Shard 1, left with Shard 4)
    id: 5,
    row: 1,
    col: 1,
    path: 'M 260 230 L 390 205 L 510 270 L 535 370 L 490 480 L 360 545 L 235 520 L 215 375 Z',
    cx: 375,
    cy: 375,
    driftX: -1,
    driftY: 2,
    driftDuration: 7.2,
    delay: 1.8,
    baseRotate: 0.4,
  },
  {
    // Shard 6: Center-Right Piece (Shares top with Shard 2, left with Shard 5)
    id: 6,
    row: 1,
    col: 2,
    path: 'M 510 270 L 620 290 L 730 235 L 710 380 L 765 510 L 630 455 L 490 480 L 535 370 Z',
    cx: 625,
    cy: 375,
    driftX: 2,
    driftY: 1,
    driftDuration: 6.5,
    delay: 1.1,
    baseRotate: -0.3,
  },
  {
    // Shard 7: Mid-Right Piece (Shares top with Shard 3, left with Shard 6)
    id: 7,
    row: 1,
    col: 3,
    path: 'M 730 235 L 870 215 L 1000 260 L 1000 490 L 880 535 L 765 510 L 710 380 Z',
    cx: 865,
    cy: 375,
    driftX: 5,
    driftY: 1,
    driftDuration: 7.6,
    delay: 0.3,
    baseRotate: 0.6,
  },
  {
    // Shard 8: Bottom-Left Corner Piece (Shares top with Shard 4)
    id: 8,
    row: 2,
    col: 0,
    path: 'M 0 510 L 120 480 L 235 520 L 265 635 L 240 750 L 0 750 Z',
    cx: 130,
    cy: 625,
    driftX: -4,
    driftY: 4,
    driftDuration: 6.9,
    delay: 1.6,
    baseRotate: -0.7,
  },
  {
    // Shard 9: Bottom Center-Left Piece (Shares top with Shard 5, left with Shard 8)
    id: 9,
    row: 2,
    col: 1,
    path: 'M 235 520 L 360 545 L 490 480 L 475 615 L 520 750 L 240 750 L 265 635 Z',
    cx: 375,
    cy: 625,
    driftX: -2,
    driftY: 5,
    driftDuration: 7.1,
    delay: 2.3,
    baseRotate: 0.3,
  },
  {
    // Shard 10: Bottom Center-Right Piece (Shares top with Shard 6, left with Shard 9)
    id: 10,
    row: 2,
    col: 2,
    path: 'M 490 480 L 630 455 L 765 510 L 780 630 L 740 750 L 520 750 L 475 615 Z',
    cx: 630,
    cy: 615,
    driftX: 2,
    driftY: 4,
    driftDuration: 6.4,
    delay: 0.9,
    baseRotate: -0.4,
  },
  {
    // Shard 11: Bottom-Right Corner Piece (Shares top with Shard 7, left with Shard 10)
    id: 11,
    row: 2,
    col: 3,
    path: 'M 765 510 L 880 535 L 1000 490 L 1000 750 L 740 750 L 780 630 Z',
    cx: 875,
    cy: 625,
    driftX: 4,
    driftY: 4,
    driftDuration: 7.5,
    delay: 1.3,
    baseRotate: 0.5,
  },
];
