import { beatsToSpawnTime, Song } from './song';

export const funkyLove: Song = beatsToSpawnTime({
  name: 'Funky Love',
  source: 'music/funky_love.mp3',
  baseArrowSpeed: 1.6,
  bpm: 106 / 2,
  fadeOutStart: 140,
  fadeOutEnd: 144,
  end: 144,
  notes: [],
});
