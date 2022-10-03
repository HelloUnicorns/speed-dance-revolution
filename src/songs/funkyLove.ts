import { beatsToSpawnTime, Song, SPAWN_TO_TARGET } from './song';

export const funkyLove: Song = beatsToSpawnTime({
  name: 'Funky Love',
  source: 'music/funky_love.mp3',
  baseArrowSpeed: 1.61 * SPAWN_TO_TARGET / 615,
  bpm: 115,
  fadeOutStart: 98,
  fadeOutEnd: 100.5,
  end: 100.5,
  notes: [
    // Section 1: only electronic and bass
    { time: 4, direction: 'left' },
    { time: 4.5, direction: 'right' },
    { time: 4.75, direction: 'left' },
    { time: 5.5, direction: 'down' },
    { time: 6, direction: 'left' },
    { time: 6.5, direction: 'right' },
    // Again
    { time: 8, direction: 'left' },
    { time: 8.5, direction: 'right' },
    { time: 8.75, direction: 'left' },
    { time: 9.5, direction: 'down' },
    { time: 10, direction: 'left' },
    { time: 10.5, direction: 'right' },
    // Again
    { time: 12, direction: 'left' },
    { time: 12.5, direction: 'right' },
    { time: 12.75, direction: 'left' },
    { time: 13.5, direction: 'down' },
    { time: 14, direction: 'left' },
    { time: 14.5, direction: 'right' },
    // Variation
    { time: 16, direction: 'down' },
    { time: 16.5, direction: 'right' },
    { time: 17, direction: 'down' },
    { time: 17.5, direction: 'up' },
    { time: 18, direction: 'right' },
    { time: 18.5, direction: 'left' },
    { time: 19, direction: 'down' },
    
    // Section 2: added more bass
    { time: 20, direction: 'up' },
    { time: 20, direction: 'left' },
    { time: 21.5, direction: 'right' },
    { time: 22, direction: 'left' },
    { time: 23, direction: 'down' },
    // Again
    { time: 24, direction: 'up' },
    { time: 24, direction: 'right' },
    { time: 25.5, direction: 'left' },
    { time: 26, direction: 'right' },
    { time: 27, direction: 'down' },
    // Again
    { time: 28, direction: 'up' },
    { time: 28, direction: 'left' },
    { time: 29.5, direction: 'right' },
    { time: 30, direction: 'left' },
    { time: 31, direction: 'down' },
    // Variation
    { time: 32, direction: 'left' },
    { time: 33, direction: 'right' },
    { time: 34, direction: 'up' },
    { time: 35, direction: 'down' },

    // Section 2: again
    { time: 36, direction: 'up' },
    { time: 36, direction: 'left' },
    { time: 37.5, direction: 'right' },
    { time: 38, direction: 'left' },
    { time: 39, direction: 'down' },
    // Again
    { time: 40, direction: 'up' },
    { time: 40, direction: 'right' },
    { time: 41.5, direction: 'left' },
    { time: 42, direction: 'right' },
    { time: 43, direction: 'down' },
    // Again
    { time: 44, direction: 'up' },
    { time: 44, direction: 'left' },
    { time: 45.5, direction: 'right' },
    { time: 46, direction: 'left' },
    { time: 47, direction: 'down' },
    // Variation
    { time: 48, direction: 'left' },
    { time: 49, direction: 'right' },
    { time: 50, direction: 'up' },
    { time: 51, direction: 'down' },

    // Section 3: high synth
    { time: 52, direction: 'up' },
    { time: 52.75, direction: 'right' },
    { time: 53.5, direction: 'left' },
    { time: 54, direction: 'down' },
    { time: 55, direction: 'up' },
    // Again
    { time: 56, direction: 'up' },
    { time: 56.75, direction: 'left' },
    { time: 57.5, direction: 'right' },
    { time: 58, direction: 'down' },
    { time: 59, direction: 'up' },
    // Variation 1
    { time: 60, direction: 'up' },
    { time: 60.75, direction: 'right' },
    { time: 61.5, direction: 'left' },
    { time: 62, direction: 'down' },
    // Variation 2
    { time: 64, direction: 'left' },
    { time: 65, direction: 'right' },
    { time: 66, direction: 'up' },
    { time: 67, direction: 'down' },

    // Section 3: again
    { time: 68, direction: 'up' },
    { time: 68.75, direction: 'right' },
    { time: 69.5, direction: 'left' },
    { time: 70, direction: 'down' },
    { time: 71, direction: 'up' },
    // Again
    { time: 72, direction: 'up' },
    { time: 72.75, direction: 'left' },
    { time: 73.5, direction: 'right' },
    { time: 74, direction: 'down' },
    { time: 75, direction: 'up' },
    // Variation 1
    { time: 76, direction: 'up' },
    { time: 76.75, direction: 'right' },
    { time: 77.5, direction: 'left' },
    { time: 78, direction: 'down' },
    // Variation 2
    { time: 80, direction: 'left' },
    { time: 81, direction: 'right' },
    { time: 82, direction: 'up' },
    { time: 83, direction: 'down' },

    // // Section 4
    // { time: 84, direction: 'left' },
    // { time: 84.5, direction: 'right' },
    // { time: 85, direction: 'left' },
    // { time: 85.5, direction: 'right' },
    // { time: 86, direction: 'left' },
    // { time: 86.5, direction: 'right' },
    // { time: 87, direction: 'left' },
    // { time: 87.5, direction: 'right' },
    // // Again
    // { time: 88, direction: 'left' },
    // { time: 88.5, direction: 'right' },
    // { time: 89, direction: 'left' },
    // { time: 89.5, direction: 'right' },
    // { time: 90, direction: 'left' },
    // { time: 90.5, direction: 'right' },
    // { time: 91, direction: 'left' },
    // { time: 91.5, direction: 'right' },
    // // Again
    // { time: 92, direction: 'left' },
    // { time: 92.5, direction: 'right' },
    // { time: 93, direction: 'left' },
    // { time: 93.5, direction: 'right' },
    // { time: 94, direction: 'left' },
    // { time: 94.5, direction: 'right' },
    // { time: 95, direction: 'left' },
    // { time: 95.5, direction: 'right' },
    // // Again
    // { time: 96, direction: 'left' },
    // { time: 96.5, direction: 'right' },
    // { time: 97, direction: 'left' },
    // { time: 97.5, direction: 'right' },
    // { time: 98, direction: 'left' },
    // { time: 98.5, direction: 'right' },
    // { time: 99, direction: 'left' },
    // { time: 99.5, direction: 'right' },

    // Section 5
    { time: 100, direction: 'up' },
    { time: 101.5, direction: 'right' },
    { time: 102, direction: 'up' },
    { time: 103, direction: 'left' },
    { time: 103.5, direction: 'down' },
    // Again
    { time: 104, direction: 'up' },
    { time: 105.5, direction: 'left' },
    { time: 106, direction: 'up' },
    { time: 107, direction: 'right' },
    { time: 107.5, direction: 'down' },
    // Again
    { time: 108, direction: 'left' },
    { time: 109.5, direction: 'right' },
    { time: 110, direction: 'left' },
    { time: 111, direction: 'right' },
    { time: 111.5, direction: 'down' },
    // Variation
    { time: 112, direction: 'left' },
    { time: 113, direction: 'right' },
    { time: 114, direction: 'up' },
    { time: 115, direction: 'down' },

    // Section 5: again
    { time: 116, direction: 'down' },
    { time: 117.5, direction: 'right' },
    { time: 118, direction: 'down' },
    { time: 119, direction: 'left' },
    { time: 119.5, direction: 'up' },
    // Again
    { time: 120, direction: 'down' },
    { time: 121.5, direction: 'left' },
    { time: 122, direction: 'down' },
    { time: 123, direction: 'right' },
    { time: 123.5, direction: 'up' },
    // Again
    { time: 124, direction: 'left' },
    { time: 125.5, direction: 'right' },
    { time: 126, direction: 'left' },
    { time: 127, direction: 'right' },
    { time: 127.5, direction: 'up' },
    // Variation
    { time: 128, direction: 'left' },
    { time: 129, direction: 'right' },
    { time: 130, direction: 'up' },
    { time: 131, direction: 'down' },

    // Section 5: again
    { time: 132, direction: 'up' },
    { time: 133.5, direction: 'right' },
    { time: 134, direction: 'up' },
    { time: 135, direction: 'left' },
    { time: 135.5, direction: 'down' },
    // Again
    { time: 136, direction: 'up' },
    { time: 137.5, direction: 'left' },
    { time: 138, direction: 'up' },
    { time: 139, direction: 'right' },
    { time: 139.5, direction: 'down' },
    // Again
    { time: 140, direction: 'left' },
    { time: 141.5, direction: 'right' },
    { time: 142, direction: 'left' },
    { time: 143, direction: 'right' },
    { time: 143.5, direction: 'down' },
    // Variation
    { time: 144, direction: 'left' },
    { time: 145, direction: 'right' },
    { time: 146, direction: 'up' },
    { time: 147, direction: 'down' },

    // Section 5: again
    { time: 148, direction: 'down' },
    { time: 149.5, direction: 'right' },
    { time: 150, direction: 'down' },
    { time: 151, direction: 'left' },
    { time: 151.5, direction: 'up' },
    // Again
    { time: 152, direction: 'down' },
    { time: 153.5, direction: 'left' },
    { time: 154, direction: 'down' },
    { time: 155, direction: 'right' },
    { time: 155.5, direction: 'up' },
    // Again
    { time: 156, direction: 'down' },
    { time: 157.5, direction: 'right' },
    { time: 158, direction: 'down' },
    { time: 159, direction: 'left' },
    { time: 159.5, direction: 'up' },
    // Again
    { time: 160, direction: 'down' },
    { time: 161.5, direction: 'left' },
    { time: 162, direction: 'down' },
    { time: 163, direction: 'right' },
    { time: 163.5, direction: 'up' },

    // Section 5: again
    { time: 164, direction: 'left' },
    { time: 165.5, direction: 'right' },
    { time: 166, direction: 'up' },
    { time: 167, direction: 'down' },
    { time: 167.5, direction: 'up' },
    // Again
    { time: 168, direction: 'right' },
    { time: 169.5, direction: 'up' },
    { time: 170, direction: 'down' },
    { time: 171, direction: 'left' },
    { time: 171.5, direction: 'down' },
    // Again
    { time: 172, direction: 'up' },
    { time: 173.5, direction: 'down' },
    { time: 174, direction: 'left' },
    { time: 175, direction: 'right' },
    { time: 175.5, direction: 'left' },
    // Again
    { time: 176, direction: 'down' },
    { time: 177.5, direction: 'left' },
    { time: 178, direction: 'right' },
    { time: 179, direction: 'up' },
    { time: 179.5, direction: 'right' },

    // End: 1:40
  ],
});
