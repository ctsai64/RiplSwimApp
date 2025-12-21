// User is referenced by username (string)
export interface User {
  username: string;
  bio: string;
  practiceIds: string[]; // List of referenced Practice IDs
  groupIds: string[];
  friends: string[]; // Username list, ordered by frequency in practices
  locations: string[]; // Location string list, ordered by frequency in practices
  splits: Split[]; // All splits ever
}

// Practice is referenced by date-time (ideally UTC ISO string)
export interface Practice {
  id: string;
  dateTime: string; // ISO date string
  name: string;
  type: string;
  attendees: string[]; // Username list
  location: string;
  units: 'yards' | 'meters' | string;
  sets: Set[];
  estimatedDistance?: number; // Calculated from sets
  estimatedDuration?: number; // Calculated from sets, in seconds/minutes
  splits: Split[]; // Splits for this practice
  physicalRating: number | null; // e.g., 1-10
  emotionalRating: number | null; // e.g., 1-10
}

// Set is referenced by name
export interface Set {
  name: string;
  things: Thing[];
}

// Thing is referenced by id
export interface Thing {
  id: number;
  iterations: number;
  distance: number;
  time: number; // In seconds
  description: string;
}

// Split is referenced by instance (timestamp)
export interface Split {
  instance: string; // ISO date string
  distance: number;
  stroke: string;
  time: number; // Duration in seconds
}

// Group is referenced by name
export interface Group {
  id: string;
  name: string;
  numberOfMembers: number;
  members: string[]; // Username list
  description: string;
  practiceIds: string[];
}

