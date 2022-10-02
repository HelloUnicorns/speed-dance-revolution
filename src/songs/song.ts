interface Note {
  time: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

export interface Song {
  name: string;
  source: string;
  baseSpeed: number;
  notes: Note[];
}
