import { beatsToSpawnTime, Song, SPAWN_TO_TARGET } from './song';

export const autumnDance: Song = beatsToSpawnTime({
  name: 'Autumn Dance',
  source: 'music/autumn_dance.mp3',
  baseArrowSpeed: 1.61 * SPAWN_TO_TARGET / 615,
  bpm: 106 / 2,
  fadeOutStart: 140,
  fadeOutEnd: 144,
  end: 1,
  notes: [
    // Section 1: only bass and snare
    { time: 0, direction: 'left' },
    { time: 0, direction: 'up' },
    { time: 0.5, direction: 'right' },
    { time: 1, direction: 'down' },
    { time: 2, direction: 'left' },
    { time: 2, direction: 'up' },
    { time: 2.25, direction: 'down' },
    { time: 2.75, direction: 'right' },
    // Again
    { time: 4, direction: 'right' },
    { time: 4, direction: 'up' },
    { time: 4.5, direction: 'left' },
    { time: 5, direction: 'down' },
    { time: 6, direction: 'right' },
    { time: 6, direction: 'up' },
    { time: 6.25, direction: 'down' },
    { time: 6.75, direction: 'left' },
    // Again
    { time: 8, direction: 'left' },
    { time: 8, direction: 'up' },
    { time: 8.5, direction: 'right' },
    { time: 9, direction: 'down' },
    { time: 10, direction: 'left' },
    { time: 10, direction: 'up' },
    { time: 10.25, direction: 'down' },
    { time: 10.75, direction: 'right' },

    // Section 2: electronic sounds added
    { time: 12, direction: 'right' },
    { time: 12, direction: 'up' },
    { time: 12.5, direction: 'left' },
    { time: 13.25, direction: 'right' },
    { time: 14, direction: 'left' },
    { time: 14.75, direction: 'right' },
    { time: 15.25, direction: 'up' },
    { time: 15.75, direction: 'down' },
    // Again
    { time: 16, direction: 'right' },
    { time: 16, direction: 'up' },
    { time: 16.5, direction: 'left' },
    { time: 17.25, direction: 'right' },
    { time: 18, direction: 'left' },
    { time: 18.75, direction: 'right' },
    { time: 19.25, direction: 'up' },
    { time: 19.75, direction: 'down' },
    // Again
    { time: 20, direction: 'right' },
    { time: 20, direction: 'left' },
    { time: 20.5, direction: 'up' },
    { time: 21.25, direction: 'right' },
    { time: 22, direction: 'left' },
    { time: 22.75, direction: 'right' },
    { time: 23.25, direction: 'left' },
    { time: 23.75, direction: 'down' },
    // Again
    { time: 24, direction: 'right' },
    { time: 24, direction: 'up' },
    { time: 24.5, direction: 'left' },
    { time: 25.25, direction: 'right' },
    { time: 26, direction: 'left' },
    { time: 26.75, direction: 'right' },
    { time: 27.25, direction: 'left' },
    { time: 27.75, direction: 'down' },

    // Section 3: flute added
    { time: 28, direction: 'up' },
    { time: 28, direction: 'left' },
    { time: 28.75, direction: 'right' },
    { time: 29.5, direction: 'left' },
    { time: 29.75, direction: 'right' },
    { time: 30.125, direction: 'left' },
    { time: 31.5, direction: 'down' },
    { time: 32, direction: 'up' },
    { time: 32.75, direction: 'right' },
    { time: 34.75, direction: 'down'},
    { time: 35.25, direction: 'left'},
    { time: 35.75, direction: 'right'},
    // Again
    { time: 36, direction: 'up' },
    { time: 36, direction: 'right' },
    { time: 36.75, direction: 'left' },
    { time: 37.5, direction: 'right' },
    { time: 37.75, direction: 'left' },
    { time: 38.125, direction: 'right' },
    { time: 39.5, direction: 'down' },
    { time: 40, direction: 'up' },
    { time: 40.75, direction: 'left' },
    { time: 42.75, direction: 'down'},
    { time: 43.25, direction: 'right'},
    { time: 43.75, direction: 'left'},
    // Again
    { time: 44, direction: 'up' },
    { time: 44, direction: 'left' },
    { time: 44.75, direction: 'right' },
    { time: 45.5, direction: 'left' },
    { time: 45.75, direction: 'right' },
    { time: 46.125, direction: 'left' },
    { time: 47.5, direction: 'down' },
    { time: 48, direction: 'up' },
    { time: 48.25, direction: 'left' }, // Variation
    { time: 48.75, direction: 'right' },
    { time: 50.75, direction: 'down'},
    { time: 51.25, direction: 'left'},
    { time: 51.75, direction: 'right'},
    // Again
    { time: 52, direction: 'up' },
    { time: 52, direction: 'right' },
    { time: 52.75, direction: 'left' },
    { time: 53.5, direction: 'right' },
    { time: 53.75, direction: 'left' },
    { time: 54.125, direction: 'right' },
    { time: 55.5, direction: 'down' },

    // Section 2 again
    { time: 56, direction: 'right' },
    { time: 56, direction: 'up' },
    { time: 56.5, direction: 'left' },
    { time: 57.25, direction: 'right' },
    { time: 58, direction: 'left' },
    { time: 58.75, direction: 'right' },
    { time: 59.25, direction: 'up' },
    { time: 59.75, direction: 'down' },
    // Again
    { time: 60, direction: 'right' },
    { time: 60, direction: 'up' },
    { time: 60.5, direction: 'left' },
    { time: 61.25, direction: 'right' },
    { time: 62, direction: 'left' },
    { time: 62.75, direction: 'right' },
    { time: 63.25, direction: 'up' },
    { time: 63.75, direction: 'down' },
    // Again
    { time: 64, direction: 'right' },
    { time: 64, direction: 'left' },
    { time: 64.5, direction: 'up' },
    { time: 65.25, direction: 'right' },
    { time: 66, direction: 'left' },
    { time: 66.75, direction: 'right' },
    { time: 67.25, direction: 'left' },
    { time: 67.75, direction: 'down' },
    // Again
    { time: 68, direction: 'right' },
    { time: 68, direction: 'up' },
    { time: 68.5, direction: 'left' },
    { time: 69.25, direction: 'right' },
    { time: 70, direction: 'left' },
    { time: 70.75, direction: 'right' },
    { time: 71.25, direction: 'left' },
    { time: 71.75, direction: 'down' },

    // Section 3 again
    { time: 72, direction: 'up' },
    { time: 72, direction: 'left' },
    { time: 72.75, direction: 'right' },
    { time: 73.5, direction: 'left' },
    { time: 73.75, direction: 'right' },
    { time: 74.125, direction: 'left' },
    { time: 75.5, direction: 'down' },
    { time: 76, direction: 'up' },
    { time: 76.75, direction: 'right' },
    { time: 78.75, direction: 'down'},
    { time: 79.25, direction: 'left'},
    { time: 79.75, direction: 'right'},
    // Again
    { time: 80, direction: 'up' },
    { time: 80, direction: 'left' },
    { time: 80.75, direction: 'right' },
    { time: 81.5, direction: 'left' },
    { time: 81.75, direction: 'right' },
    { time: 82.125, direction: 'left' },
    { time: 83.5, direction: 'down' },
    { time: 84, direction: 'up' },
    { time: 84.75, direction: 'right' },
    { time: 86.75, direction: 'down'},
    { time: 87.25, direction: 'left'},
    { time: 87.75, direction: 'right'},
    // Again
    { time: 88, direction: 'up' },
    { time: 88, direction: 'left' },
    { time: 88.75, direction: 'right' },
    { time: 89.5, direction: 'left' },
    { time: 89.75, direction: 'right' },
    { time: 90.125, direction: 'left' },
    { time: 91.5, direction: 'down' },
    { time: 92, direction: 'up' },
    { time: 92.75, direction: 'left' },
    { time: 94.75, direction: 'right'},
    { time: 95.25, direction: 'left'},
    { time: 95.75, direction: 'right'},
    // Again
    { time: 96, direction: 'up' },
    { time: 96, direction: 'left' },
    { time: 96.75, direction: 'right' },
    { time: 97.5, direction: 'left' },
    { time: 97.75, direction: 'right' },
    { time: 98.125, direction: 'left' },
    { time: 99.5, direction: 'down' },

    // Section 4
    { time: 100, direction: 'up' },
    { time: 100, direction: 'right' },
    { time: 100.5, direction: 'up' },
    { time: 100.5, direction: 'right' },
    { time: 101, direction: 'up' },
    { time: 101, direction: 'right' },
    // Again
    { time: 104, direction: 'right' },
    { time: 104, direction: 'down' },
    { time: 104.5, direction: 'right' },
    { time: 104.5, direction: 'down' },
    { time: 105, direction: 'right' },
    { time: 105, direction: 'down' },
    // Again
    { time: 108, direction: 'left' },
    { time: 108, direction: 'down' },
    { time: 108.5, direction: 'left' },
    { time: 108.5, direction: 'down' },
    { time: 109, direction: 'left' },
    { time: 109, direction: 'down' },
    // Again
    { time: 112, direction: 'left' },
    { time: 112, direction: 'up' },
    { time: 112.5, direction: 'left' },
    { time: 112.5, direction: 'up' },
    { time: 113, direction: 'left' },
    { time: 113, direction: 'up' },
    // Again
    { time: 116, direction: 'left' },
    { time: 116, direction: 'right' },
    { time: 116.5, direction: 'left' },
    { time: 116.5, direction: 'right' },
    { time: 117, direction: 'left' },
    { time: 117, direction: 'right' },

    // End: 2:24
  ],
});
