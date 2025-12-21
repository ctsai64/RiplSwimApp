import { Group } from '../interfaces';

export const groups: Group[] = [
  { id: 'g1', name: 'Penn Club Swm', numberOfMembers: 3, members: ['aaron', 'cymberly', 'dom'], description: 'The best swim team', practiceIds: ['p1', 'p2'] },
  { id: 'g2', name: 'Council Rock North Swim Team', numberOfMembers: 1, members: ['cymberly'], description: 'A swim team', practiceIds: ['p1'] },
];

// Default selected group ID (can be null or a specific group ID)
export const selectedGroup: string | null = null;