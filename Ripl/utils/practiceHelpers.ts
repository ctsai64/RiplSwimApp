import { Practice } from '../constants/interfaces';

export function computeEstimatedDistance(practice: Practice): number {
  return practice.sets.reduce(
    (total, set) =>
      total + set.things.reduce((setTotal, thing) => setTotal + thing.distance * thing.iterations, 0),
    0
  );
}

export function computeEstimatedDuration(practice: Practice): number {
  return practice.sets.reduce(
    (total, set) =>
      total + set.things.reduce((setTotal, thing) => setTotal + thing.time * thing.iterations, 0),
    0
  );
}

export function parseDateTime(practice: Practice): string {
  if (!practice.dateTime) return '';
  const date = new Date(practice.dateTime);
  if (isNaN(date.getTime())) return practice.dateTime;
  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getPracticesForUser(practiceIds: string[], allPractices: Practice[]): Practice[] {
  if (!Array.isArray(practiceIds)) return [];
  return practiceIds
    .map(pid => allPractices.find(p => p.id === pid))
    .filter((p): p is Practice => Boolean(p));
}

