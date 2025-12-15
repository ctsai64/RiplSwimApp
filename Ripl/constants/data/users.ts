import { User } from '../interfaces';

export const users: User[] = [
  { username: 'aaron', 
    bio: 'I am a swimmer and I love to swim.', 
    practiceIds: ['p1', 'p2', 'p3'], groupIds: ['g1'], friends: [], locations: [], splits: [] },
  { username: 'cymberly', bio: 'Swimming makes me smile, I guess I\'ll swim a while.', practiceIds: ['p1', 'p2'], groupIds: ['g1', 'g2'], friends: [], locations: [], splits: [] },
  { username: 'dom', bio: 'I love swimming so much I\'ll help make an app for it.', practiceIds: ['p2'], groupIds: ['g1'], friends: [], locations: [], splits: [] },
];

export const currentUserUsername = 'aaron';