export interface PracticeSet {
  name: string;
  description: string;
}

export interface Practice {
  id: string;
  title: string;
  dateLabel: string;
  people: string;
  sets: PracticeSet[];
}

export const PRACTICES: Practice[] = [
  {
    id: 'jan-15',
    title: 'Workout',
    dateLabel: 'Mon, Jan 15 - 6:00 AM',
    people: '3 swimmers confirmed',
    sets: [
      { name: 'Example Set 1', description: '300m easy swim + drills' },
      { name: 'Example Set 1', description: '6 x 200m negative split' },
      { name: 'Example Set 1', description: '200m choice' },
    ],
  },
  {
    id: 'jan-17',
    title: 'Midweek Speed',
    dateLabel: 'Wed, Jan 17 - 6:15 AM',
    people: '5 swimmers confirmed',
    sets: [
      { name: 'Warm-up', description: '200m easy + 4 x 50 build' },
      { name: 'Speed', description: '12 x 50m @ :55' },
      { name: 'Cool Down', description: '100m choice' },
    ],
  },
];
