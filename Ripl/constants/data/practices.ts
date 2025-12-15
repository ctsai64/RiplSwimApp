import { Practice } from '../interfaces';

export const practices: Practice[] = [
  {
    id: 'p1',
    dateTime: '2025-12-12T06:00:00Z',
    name: 'Fly Friday',
    type: 'Endurance',
    attendees: ['aaron, cymberly'],
    location: 'Sheer Pool',
    units: 'meters',
    sets: [
      {
        name: 'Warmup',
        things: [
          { id: 1, iterations: 1, distance: 500, time: 0, description: 'warmup' },
          { id: 2, iterations: 8, distance: 50, time: 60, description: 'every third fl' },
          { id: 3, iterations: 1, distance: 100, time: 129, description: 'ez' },
        ]
      },
      {
        name: 'Main Set',
        things: [
          { id: 4, iterations: 4, distance: 50, time: 50, description: 'alternate fr/fl' },
          { id: 5, iterations: 4, distance: 100, time: 90, description: '50fr/50fl' },
          { id: 6, iterations: 4, distance: 200, time: 150, description: 'rotate 50fl' },
          { id: 7, iterations: 4, distance: 100, time: 90, description: '50fr/50fl' },
          { id: 8, iterations: 4, distance: 50, time: 50, description: 'alternate free/fly' },
        ]
      },
      {
        name: 'Ending',
        things: [
          { id: 9, iterations: 4, distance: 50, time: 60, description: 'ez, build, sprint, sprint harder' },
          { id: 9, iterations: 1, distance: 200, time: 0, description: 'cool down' },
        ]
      }
    ],
    splits: [],
    physicalRating: 8,
    emotionalRating: 7
  },
  {
    id: 'p2',
    dateTime: '2023-01-02T18:00:00Z',
    name: 'Evening Sprints',
    type: 'Sprints',
    attendees: ['aaron', 'dom'],
    location: 'Sheer Pool',
    units: 'yards',
    sets: [
      {
        name: 'Sprint Set',
        things: [
          { id: 3, iterations: 8, distance: 50, time: 50, description: 'free sprint' },
          { id: 3, iterations: 8, distance: 50, time: 50, description: 'free sprint' },
          { id: 3, iterations: 8, distance: 50, time: 50, description: 'free sprint' }
        ]
      }
    ],
    splits: [],
    physicalRating: 9,
    emotionalRating: 8
  }
];

