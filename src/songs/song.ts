interface Note {
  time: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

export interface Song {
  name: string;
  source: string;
  baseArrowSpeed: number;
  bpm: number;
  notes: Note[];
}

const FPS = 60;
const SECONDS_IN_MINUTE = 60;

// Song acceleration constants
const ACCELERATION_TIME_DELTA = 10;
const ACCELERATION = 1.1;

// Arrow location constants
const ARROW_HEIGHT = 75;
const APP_HEIGHT = 600;
const TARGET_POSITION = 60;
const SPAWN_TO_TARGET = APP_HEIGHT + ARROW_HEIGHT - TARGET_POSITION;

export function beatsToSpawnTime(song: Song): Song {
  const realBaseArrowSpeed = song.baseArrowSpeed * FPS;
  const beatsInterval = SECONDS_IN_MINUTE / song.bpm;

  let speedIndex = 0;
  let changeSpeedTime = 0;
  let speed = Math.pow(ACCELERATION, speedIndex);
  let previousNoteTime = 0;
  let targetTime = 0;
  for (const note of song.notes) {
    // Change note base count to note time in song
    note.time = beatsInterval * note.time + SPAWN_TO_TARGET / realBaseArrowSpeed;

    // Change note time in song to note time in game
    while (changeSpeedTime + ACCELERATION_TIME_DELTA * speed < note.time) {
      changeSpeedTime += ACCELERATION_TIME_DELTA * speed;
      speedIndex++;
      speed = Math.pow(ACCELERATION, speedIndex);
    }
    note.time -= changeSpeedTime - ACCELERATION_TIME_DELTA * speedIndex + (note.time - changeSpeedTime) * (1 - 1 / speed);

    targetTime = note.time;
    // Change not time in game to its spawn time
    const realSpeed = speed * realBaseArrowSpeed;
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
