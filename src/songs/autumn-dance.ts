import { Song } from './song';

const BASE_SPEED = 1.6;
const REAL_BASE_SPEED = BASE_SPEED * 60;
const ARROW_HEIGHT = 75;
const APP_HEIGHT = 600;
const TARGET_POSITION = 60;
const SPAWN_TO_TARGET = APP_HEIGHT + ARROW_HEIGHT - TARGET_POSITION;
const ACCELERATION_TIME_DELTA = 10;
const ACCELERATION = 1.1;
const BPM = 106 / 2;
const BASE_INTERVAL = 60 / BPM;

export function updateToSpawnTimes(song: Song): Song {
  let speedIndex = 0;
  let changeSpeedTime = 0;
  let speed = Math.pow(ACCELERATION, speedIndex);
  let previousNoteTime = 0;
  let targetTime = 0;
  for (const note of song.notes) {
    // Change note base count to note time in song
    note.time = BASE_INTERVAL * note.time + SPAWN_TO_TARGET / REAL_BASE_SPEED;

    // Change note time in song to note time in game
    while (changeSpeedTime + ACCELERATION_TIME_DELTA * speed < note.time) {
      changeSpeedTime += ACCELERATION_TIME_DELTA * speed;
      speedIndex++;
      speed = Math.pow(ACCELERATION, speedIndex);
    }
    note.time -= changeSpeedTime - ACCELERATION_TIME_DELTA * speedIndex + (note.time - changeSpeedTime) * (1 - 1 / speed);

    targetTime = note.time;
    // Change not time in game to its spawn time
    const realSpeed = speed * REAL_BASE_SPEED;
    if (note.time - SPAWN_TO_TARGET / realSpeed >= speedIndex * ACCELERATION_TIME_DELTA) {
      note.time -= SPAWN_TO_TARGET / realSpeed;
    } else {
      note.time = note.time - SPAWN_TO_TARGET * ACCELERATION / realSpeed + (ACCELERATION - 1) * (note.time - speedIndex * ACCELERATION_TIME_DELTA);
    }
    previousNoteTime = note.time;
  }
  song.notes = song.notes.sort((a, b) => a.time - b.time);
  return song;
}

export const autumnDance: Song = updateToSpawnTimes({
  name: 'autumn-dance',
  source: 'music/autumn_dance.mp3',
  baseSpeed: BASE_SPEED,
  notes: [
    { time: 0, direction: 'left' },
    { time: 1, direction: 'right' },
    { time: 2, direction: 'left' },
    { time: 3, direction: 'right' },
    { time: 4, direction: 'left' },
    { time: 5, direction: 'right' },
    { time: 6, direction: 'left' },
    { time: 7, direction: 'right' },
    { time: 8, direction: 'right' },
    { time: 9, direction: 'left' },
    { time: 10, direction: 'right' },
    { time: 11, direction: 'left' },
    { time: 12, direction: 'right' },
    { time: 13, direction: 'left' },
    { time: 14, direction: 'right' },
    { time: 15, direction: 'left' },
    { time: 16, direction: 'right' },
    { time: 17, direction: 'left' },
    { time: 18, direction: 'right' },
    { time: 19, direction: 'left' },
    { time: 20, direction: 'right' },
    { time: 21, direction: 'left' },
    { time: 22, direction: 'right' },
    { time: 23, direction: 'left' },
    { time: 24, direction: 'right' },
    { time: 25, direction: 'left' },
    { time: 26, direction: 'right' },
    { time: 27, direction: 'left' },
    { time: 28, direction: 'right' },
    { time: 29, direction: 'left' },
    { time: 30, direction: 'right' },
    { time: 31, direction: 'left' },
    { time: 32, direction: 'right' },
    { time: 33, direction: 'left' },
    { time: 34, direction: 'right' },
    { time: 35, direction: 'left' },
    { time: 36, direction: 'right' },
    { time: 37, direction: 'left' },
    { time: 38, direction: 'right' },
    { time: 39, direction: 'left' },
    { time: 40, direction: 'right' },
    { time: 41, direction: 'left' },
    { time: 42, direction: 'right' },
    { time: 43, direction: 'left' },
    { time: 44, direction: 'right' },
    { time: 45, direction: 'left' },
    { time: 46, direction: 'right' },
    { time: 47, direction: 'left' },
    { time: 48, direction: 'right' },
    { time: 49, direction: 'left' },
    { time: 50, direction: 'right' },
    { time: 51, direction: 'left' },
  ],
});
