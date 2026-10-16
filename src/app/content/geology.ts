import type { Boundary } from './catalogue';

/** Position from oldest (left) to present (right), without widening short intervals. */
export function positionPercent(age: number, oldest: number): number {
  return ((oldest - age) / oldest) * 100;
}

export function durationPercent(start: number, end: number, oldest: number): number {
  return ((start - end) / oldest) * 100;
}

export function formatBoundary(boundary: Boundary): string {
  if (boundary.age === 0) return 'present';
  return boundary.uncertainty === undefined
    ? `${boundary.age} Ma`
    : `${boundary.age} ± ${boundary.uncertainty} Ma`;
}

export function formatRange(start: number, end: number): string {
  return end === 0 ? `${start} Ma–present` : `${start}–${end} Ma`;
}
