import { User, Group } from '../constants/interfaces';

export function displayUsername(user: User): string {
  if (!user?.username) return '';
  return user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase();
}

export function displayBio(user: User): string {
  if (!user?.bio) return '';
  return user.bio.charAt(0).toUpperCase() + user.bio.slice(1);
}

export function getGroupsForUser(groupIds: string[], allGroups: Group[]): Group[] {
    if (!Array.isArray(groupIds)) return [];
    return groupIds
      .map(pid => allGroups.find(p => p.id === pid))
      .filter((p): p is Group => Boolean(p));
  }

