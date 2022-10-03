import { beatsToSpawnTime, Song, SPAWN_TO_TARGET } from './song';

export const funkyLove: Song = beatsToSpawnTime({
  name: 'Funky Love',
  source: 'music/funky_love.mp3',
  baseArrowSpeed: 1.61 * SPAWN_TO_TARGET / 615,
  bpm: 115,
  fadeOutStart: 140,
  fadeOutEnd: 144,
  end: 144,
  notes: [
    // Section 1: only electronic and bass
    { time: 4, direction: 'left' },
    { time: 4.5, direction: 'right' },
    { time: 4.75, direction: 'left' },
    { time: 5.5, direction: 'right' },
    { time: 6, direction: 'left' },
    { time: 6.5, direction: 'right' },
    // Again
    { time: 8, direction: 'left' },
    { time: 8.5, direction: 'right' },
    { time: 8.75, direction: 'left' },
    { time: 9.5, direction: 'right' },
    { time: 10, direction: 'left' },
    { time: 10.5, direction: 'right' },
    // Again
    { time: 12, direction: 'left' },
    { time: 12.5, direction: 'right' },
    { time: 12.75, direction: 'left' },
    { time: 13.5, direction: 'right' },
    { time: 14, direction: 'left' },
    { time: 14.5, direction: 'right' },
    // Variation
    { time: 16, direction: 'left' },
    { time: 16.5, direction: 'right' },
    { time: 17, direction: 'left' },
    { time: 17.5, direction: 'right' },
    { time: 18, direction: 'left' },
    { time: 18.5, direction: 'right' },
    { time: 19, direction: 'down' },
    
    // Section 2: added more bass
    { time: 20, direction: 'left' },
    { time: 21.5, direction: 'right' },
    { time: 22, direction: 'left' },
    { time: 23, direction: 'right' },
    // Again
    { time: 24, direction: 'left' },
    { time: 25.5, direction: 'right' },
    { time: 26, direction: 'left' },
    { time: 27, direction: 'right' },
    // Again
    { time: 28, direction: 'left' },
    { time: 29.5, direction: 'right' },
    { time: 30, direction: 'left' },
    { time: 31, direction: 'right' },
    // Variation
    { time: 32, direction: 'left' },
    { time: 33, direction: 'right' },
    { time: 34, direction: 'left' },
    { time: 35, direction: 'right' },

    // Section 2: again
    { time: 36, direction: 'left' },
    { time: 37.5, direction: 'right' },
    { time: 38, direction: 'left' },
    { time: 39, direction: 'right' },
    // Again
    { time: 40, direction: 'left' },
    { time: 41.5, direction: 'right' },
    { time: 42, direction: 'left' },
    { time: 43, direction: 'right' },
    // Again
    { time: 44, direction: 'left' },
    { time: 45.5, direction: 'right' },
    { time: 46, direction: 'left' },
    { time: 47, direction: 'right' },
    // Variation
    { time: 48, direction: 'left' },
    { time: 49, direction: 'right' },
    { time: 50, direction: 'left' },
    { time: 51, direction: 'right' },

    // Section 3: high synth
    { time: 52, direction: 'left' },
    { time: 52.75, direction: 'right' },
    { time: 53.5, direction: 'left' },
    { time: 54, direction: 'right' },
    { time: 55, direction: 'down' },
    // Again
    { time: 56, direction: 'left' },
    { time: 56.75, direction: 'right' },
    { time: 57.5, direction: 'left' },
    { time: 58, direction: 'right' },
    { time: 59, direction: 'down' },
  ],
});
