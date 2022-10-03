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
    // Variation 1
    { time: 60, direction: 'left' },
    { time: 60.75, direction: 'right' },
    { time: 61.5, direction: 'left' },
    { time: 62, direction: 'right' },
    // Variation 2
    { time: 64, direction: 'left' },
    { time: 65, direction: 'right' },
    { time: 66, direction: 'left' },
    { time: 67, direction: 'right' },

    // Section 3: again
    { time: 68, direction: 'left' },
    { time: 68.75, direction: 'right' },
    { time: 69.5, direction: 'left' },
    { time: 70, direction: 'right' },
    { time: 71, direction: 'down' },
    // Again
    { time: 72, direction: 'left' },
    { time: 72.75, direction: 'right' },
    { time: 73.5, direction: 'left' },
    { time: 74, direction: 'right' },
    { time: 75, direction: 'down' },
    // Variation 1
    { time: 76, direction: 'left' },
    { time: 76.75, direction: 'right' },
    { time: 77.5, direction: 'left' },
    { time: 78, direction: 'right' },
    // Variation 2
    { time: 80, direction: 'left' },
    { time: 81, direction: 'right' },
    { time: 82, direction: 'left' },
    { time: 83, direction: 'right' },

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
    { time: 100, direction: 'left' },
    { time: 101.5, direction: 'right' },
    { time: 102, direction: 'left' },
    { time: 103, direction: 'right' },
    { time: 103.5, direction: 'down' },
    // Again
    { time: 104, direction: 'left' },
    { time: 105.5, direction: 'right' },
    { time: 106, direction: 'left' },
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
    { time: 114, direction: 'left' },
    { time: 115, direction: 'right' },

    // Section 5: again
    { time: 116, direction: 'left' },
    { time: 117.5, direction: 'right' },
    { time: 118, direction: 'left' },
    { time: 119, direction: 'right' },
    { time: 119.5, direction: 'down' },
    // Again
    { time: 120, direction: 'left' },
    { time: 121.5, direction: 'right' },
    { time: 122, direction: 'left' },
    { time: 123, direction: 'right' },
    { time: 123.5, direction: 'down' },
    // Again
    { time: 124, direction: 'left' },
    { time: 125.5, direction: 'right' },
    { time: 126, direction: 'left' },
    { time: 127, direction: 'right' },
    { time: 127.5, direction: 'down' },
    // Variation
    { time: 128, direction: 'left' },
    { time: 129, direction: 'right' },
    { time: 130, direction: 'left' },
    { time: 131, direction: 'right' },

    // Section 5: again
    { time: 132, direction: 'left' },
    { time: 133.5, direction: 'right' },
    { time: 134, direction: 'left' },
    { time: 135, direction: 'right' },
    { time: 135.5, direction: 'down' },
    // Again
    { time: 136, direction: 'left' },
    { time: 137.5, direction: 'right' },
    { time: 138, direction: 'left' },
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
    { time: 146, direction: 'left' },
    { time: 147, direction: 'right' },

    // Section 5: again
    { time: 148, direction: 'left' },
    { time: 149.5, direction: 'right' },
    { time: 150, direction: 'left' },
    { time: 151, direction: 'right' },
    { time: 151.5, direction: 'down' },
    // Again
    { time: 152, direction: 'left' },
    { time: 153.5, direction: 'right' },
    { time: 154, direction: 'left' },
    { time: 155, direction: 'right' },
    { time: 155.5, direction: 'down' },
    // Again
    { time: 156, direction: 'left' },
    { time: 157.5, direction: 'right' },
    { time: 158, direction: 'left' },
    { time: 159, direction: 'right' },
    { time: 159.5, direction: 'down' },
    // Again
    { time: 160, direction: 'left' },
    { time: 161.5, direction: 'right' },
    { time: 162, direction: 'left' },
    { time: 163, direction: 'right' },
    { time: 163.5, direction: 'down' },

    // Section 5: again
    { time: 164, direction: 'left' },
    { time: 165.5, direction: 'right' },
    { time: 166, direction: 'left' },
    { time: 167, direction: 'right' },
    { time: 167.5, direction: 'down' },
    // Again
    { time: 168, direction: 'left' },
    { time: 169.5, direction: 'right' },
    { time: 170, direction: 'left' },
    { time: 171, direction: 'right' },
    { time: 171.5, direction: 'down' },
    // Again
    { time: 172, direction: 'left' },
    { time: 173.5, direction: 'right' },
    { time: 174, direction: 'left' },
    { time: 175, direction: 'right' },
    { time: 175.5, direction: 'down' },
    // Again
    { time: 176, direction: 'left' },
    { time: 177.5, direction: 'right' },
    { time: 178, direction: 'left' },
    { time: 179, direction: 'right' },
    { time: 179.5, direction: 'down' },

    // End: 1:40
  ],
});
