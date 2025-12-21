import { Practice } from '../constants/interfaces';

export function computeEstimatedDistance(practice: Practice): number {
  return practice.sets.reduce(
    (total, set) =>
      total + set.things.reduce((setTotal, thing) => setTotal + thing.distance * thing.iterations, 0),
    0
  );
}

export function computeEstimatedDuration(practice: Practice): string {
  const totalSeconds = practice.sets.reduce((total, set) => {
    if (!set.things?.length) return total;

    return (
      total +
      set.things.reduce(
        (setTotal, thing) =>
          setTotal + thing.time * thing.iterations,
        0
      )
    );
  }, 0);

  if (totalSeconds <= 0) return '0 min';

  const totalMinutes = Math.round(totalSeconds / 60);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min`;
  }

  if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }

  return `${minutes} min`;
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

export function formatPracticeTime(practice: Practice): string {
  if (!practice.dateTime) return '';
  const date = new Date(practice.dateTime);
  
  if (isNaN(date.getTime())) return '';

  return date.toLocaleString(undefined, {
    hour: "numeric",
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

export function formatPracticeMembers(practice: Practice): string {
  const attendees = Array.isArray(practice.attendees) ? practice.attendees : [];

  if (attendees.length === 0) return "";

  const capitalized = attendees.map(name => {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  if (capitalized.length === 1) return capitalized[0];

  const [first, ...rest] = capitalized;
  const suffix = rest.length === 1 ? "other" : "others";

  return `${first} and ${rest.length} ${suffix}`;
}

export function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getPracticeDates(practices: Practice[]): string[] {
  return practices
    .map(p => {
      if (!p.dateTime) return null;
      const date = new Date(p.dateTime);
      if (isNaN(date.getTime())) return null;
      return formatYMD(date);
    })
    .filter((d): d is string => d !== null);
}
