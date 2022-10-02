import { Container, Sprite } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { ArrowSprite, Direction, DIRECTIONS, getDirection } from '../sprites/arrow';
import { keyboard } from '../utils/keyboard';
import { Song } from '../songs/song';
import { autumnDance } from '../songs/autumn-dance';

const TARGET_POSITION = 60;
const HIT_DISTANCE = 25;
const ACCELERATION = 1.1;
const ACCELERATION_TIME_DELTA = 10;

function getArrowPosition(direction: Direction, arrowWidth: number, appWidth: number): number {
  return appWidth / 2 + (direction.order - 1.5) * arrowWidth * 1.1;
}

export class MainScene {
  container: Container;
  width: number;
  songTimer: number;
  accelerationTimer: number;
  speed: number;
  song: Song;
  currentNoteIndex: number;
  music: Sound;
  started: boolean;

  constructor(width: number, height: number) {
    this.container = new Container();
    this.width = width;
    this.songTimer = 0;
    this.accelerationTimer = 0;
    this.speed = 1;
    this.song = autumnDance;
    this.currentNoteIndex = 0;
    this.started = false;

    const startButton = Sprite.from('images/start.png');
    startButton.name = 'start-button';
    startButton.anchor.set(0.5);
    startButton.position.set(width / 2, height / 2);
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on('pointerdown', this.start, this);
    this.container.addChild(startButton);

    for (const direction of DIRECTIONS) {
      // Target arrow sprite
      const arrow = ArrowSprite.realFrom('images/arrow.png', direction);
      arrow.anchor.set(0.5);
      arrow.rotation = direction.rotation;
      arrow.position.set(getArrowPosition(direction, arrow.width, this.width), TARGET_POSITION);
      this.container.addChild(arrow);

      // Key handler
      const key = keyboard(direction.key);
      key.press = () => {
        const arrows = this.container.getChildByName('arrows') as Container;
        const hit = (arrows.children as ArrowSprite[]).find(
          (arrow) =>
            arrow.direction === direction &&
            arrow.position.y < TARGET_POSITION + HIT_DISTANCE &&
            arrow.position.y > TARGET_POSITION - HIT_DISTANCE,
        );
        if (hit === undefined) {
          console.log('miss');
          return;
        }
        console.log('hit');
        arrows.removeChild(hit);
      };
    }

    const arrows = new Container();
    arrows.name = 'arrows';
    this.container.addChild(arrows);
  }

  start() {
    this.container.removeChild(this.container.getChildByName('start-button'));
    this.music = Sound.from({
      url: this.song.source,
      preload: true,
      loaded: () => {
        this.music.volume = 0.08;
        this.music.play();
        this.started = true;
      },
    });
  }

  update(delta: number) {
    if (!this.started) {
      return;
    }

    const arrows = this.container.getChildByName('arrows') as Container;
    for (const arrow of arrows.children as ArrowSprite[]) {
      if (arrow.position.y <= TARGET_POSITION - HIT_DISTANCE && !arrow.missed) {
        console.log('miss');
        arrow.missed = true;
      }
    }
    arrows.removeChild(...(arrows.children as ArrowSprite[]).filter((arrow) => arrow.position.y < -arrow.height));

    this.songTimer += delta / 60;
    while (
      this.currentNoteIndex < this.song.notes.length &&
      this.songTimer > this.song.notes[this.currentNoteIndex].time
    ) {
      this.spawnArrow(getDirection(this.song.notes[this.currentNoteIndex].direction));
      this.currentNoteIndex++;
    }

    this.accelerationTimer += delta / 60;
    while (this.accelerationTimer > ACCELERATION_TIME_DELTA) {
      console.log('speeding up!');
      this.speed *= ACCELERATION;
      this.music.speed = this.speed;
      this.accelerationTimer -= ACCELERATION_TIME_DELTA;
    }
  }

  spawnArrow(direction: Direction) {
    const arrows = this.container.getChildByName('arrows') as Container;
    const arrow = ArrowSprite.realFrom('images/arrow.png', direction);
    arrow.anchor.set(0.5);
    arrow.rotation = direction.rotation;
    arrow.tint = direction.color;
    arrow.position.set(getArrowPosition(direction, arrow.width, this.width), 600 + arrow.height);
    arrows.addChild(arrow);
  }
}
