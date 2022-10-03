import { beatsToSpawnTime, Song } from './song';

export const funkyLove: Song = beatsToSpawnTime({
  name: 'Funky Love',
  source: 'music/funky_love.mp3',
  baseArrowSpeed: 1.22,
  bpm: 115,
  fadeOutStart: 140,
  fadeOutEnd: 144,
  end: 144,
  notes: [
    { time: 0, direction: 'left' },
    { time: 1, direction: 'right' },
    { time: 2, direction: 'left' },
    { time: 3, direction: 'right' },
    { time: 4, direction: 'left' },
    { time: 5, direction: 'right' },
    { time: 6, direction: 'left' },
    { time: 7, direction: 'right' },
  ],
});
