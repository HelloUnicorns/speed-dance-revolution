import { Container, Sprite, Text } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { ArrowSprite, Direction, DIRECTIONS, getDirection } from '../sprites/arrow';
import { TargetArrowSprite } from '../sprites/targetArrow';
import { TargetArrowContainer } from '../sprites/targetArrowContainer';
import { keyboard } from '../utils/keyboard';
import { Song } from '../songs/song';
import { autumnDance } from '../songs/autumnDance';
import { ACCELERATION, ACCELERATION_TIME_DELTA, ARROW_HEIGHT, TARGET_POSITION } from '../consts';
import { Scene } from './scene';

const HIT_DISTANCE = 25;
const HIT_SCORE = 10;
const MAX_SCORE_COMBO_MULTIPLIER = 11;
const COMBO_LEVEL_LENGTH = 10;
const DEFAULT_VOLUME = 0.08;
const SPEEDING_UP_MESSAGE = 'Speeding up!';

function getArrowPosition(direction: Direction, arrowWidth: number, appWidth: number): number {
  return appWidth / 2 + (direction.order - 1.5) * arrowWidth * 1.1;
}

export class MainScene extends Scene {
  songTimer: number;
  accelerationTimer: number;
  speed: number;
  song: Song;
  currentNoteIndex: number;
  music: Sound;
  running: boolean;
  score: number;
  combo: number;
  pauseCallback: () => void;

  constructor(width: number, height: number, pauseCallback: () => void) {
    super(width, height);
    this.pauseCallback = pauseCallback;

    this.songTimer = 0;
    this.accelerationTimer = 0;
    this.speed = 1;
    this.song = autumnDance;
    this.currentNoteIndex = 0;
    this.running = false;
    this.score = 0;
    this.combo = 0;

    const startButton = Sprite.from('images/start.png');
    startButton.name = 'start-button';
    startButton.anchor.set(0.5);
    startButton.position.set(width / 2, height / 2);
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on('pointerdown', this.start, this);
    this.container.addChild(startButton);

    const scoreLabel = new Text('Score: 0', {
      fontFamily: 'Arial',
      fontSize: 32,
      fill: 0x00ff88,
      align: 'center',
    });
    scoreLabel.anchor.set(0.5, 1);
    scoreLabel.position.set(this.width / 2, this.height);
    scoreLabel.name = 'score';
    this.container.addChild(scoreLabel);

    const comboLabel = new Text('Combo: 0', {
      fontFamily: 'Arial',
      fontSize: 32,
      fill: 0xffffff,
    });
    comboLabel.anchor.set(0, 1);
    comboLabel.position.set(0, this.height);
    comboLabel.name = 'combo';
    this.container.addChild(comboLabel);
    this.updateCombo(0);

    const pause = Sprite.from('images/pause.png');
    pause.scale.set(0.25);
    pause.anchor.set(1, 1);
    pause.position.set(this.width, this.height);
    pause.on('pointerdown', this.pause, this);
    pause.interactive = true;
    pause.buttonMode = true;
    this.container.addChild(pause);

    const speedUpCounter = new Text('10', {
      fontFamily: 'Arial',
      fontSize: 32,
      fill: 0xffffff,
    });
    speedUpCounter.anchor.set(0);
    speedUpCounter.position.set(0);
    speedUpCounter.name = 'speed-up-counter';
    this.container.addChild(speedUpCounter);

    const targetArrows = new TargetArrowContainer();
    targetArrows.name = 'targetArrows';
    this.container.addChild(targetArrows);
    for (const direction of DIRECTIONS) {
      // Target arrow sprite
      const arrow = targetArrows.getChildByDirection(direction) as TargetArrowSprite;
      arrow.scale.set(ARROW_HEIGHT / arrow.height);
      arrow.anchor.set(0.5);
      arrow.position.set(getArrowPosition(direction, arrow.width, this.width), TARGET_POSITION);

      // Key handler
      const key = keyboard(direction.key);
      key.press = () => {
        if (!this.running) return;
        const arrows: Container = this.container.getChildByName('arrows');
        const hitArrow = (arrows.children as ArrowSprite[]).find(
          (arrow) =>
            arrow.direction === direction &&
            arrow.position.y < TARGET_POSITION + HIT_DISTANCE &&
            arrow.position.y > TARGET_POSITION - HIT_DISTANCE,
        );
        if (hitArrow === undefined) {
          this.miss();
          return;
        }
        this.hit(hitArrow.direction);
        arrows.removeChild(hitArrow);
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
      sprites: { song: { start: 0, end: this.song.end } },
      preload: true,
      loaded: () => {
        this.music.volume = DEFAULT_VOLUME;
        this.music.play('song');
        this.running = true;
      },
      complete: () => {
        // TODO: Add ending song scene (with the results) that afterwards leads to the song select scene.
        console.log('done');
      },
    });
  }

  pause() {
    this.running = false;
    this.music.pause();
    this.pauseCallback();
  }

  resume() {
    if (this.running) return;
    this.music.resume();
    this.running = true;
  }

  updateCombo(newCombo: number) {
    if (newCombo === this.combo) return;
    const comboLabel: Text = this.container.getChildByName('combo');
    comboLabel.tint = newCombo === 0 ? 0xff0000 : 0xffffff;
    comboLabel.text = newCombo === 0 ? 'MISS' : 'Combo: ' + newCombo.toString();
    this.combo = newCombo;
  }

  hit(direction: Direction) {
    console.log('hit');

    this.updateCombo(this.combo + 1);
    /* The score is multiplied by:
     *   1 if combo < 10
     *   2 if 10 <= combo < 20
     *   3 if 20 <= combo < 30
     *   ...
     *   11 if combo >= 100
     */
    const comboMultiplier = Math.min(MAX_SCORE_COMBO_MULTIPLIER, 1 + Math.floor(this.combo / COMBO_LEVEL_LENGTH));
    this.score += HIT_SCORE * this.speed * comboMultiplier;

    const scoreLabel: Text = this.container.getChildByName('score');
    scoreLabel.text = 'Score: ' + Math.round(this.score).toString();

    const targetArrows: TargetArrowContainer = this.container.getChildByName('targetArrows');
    const arrow = targetArrows.getChildByDirection(direction) as TargetArrowSprite;
    arrow.hit(TargetArrowSprite.DEFAULT_TIMEOUT / this.speed);
  }

  miss(arrow?: ArrowSprite) {
    console.log('miss');
    this.updateCombo(0);
    if (arrow !== undefined) {
      arrow.missed = true;
    }
  }

  update(delta: number) {
    if (!this.running) return;
    this.updateArrows(delta);
    this.updateSpeedUpCounter(delta);
    this.updateVolumeFadeOut(delta);
  }

  updateArrows(delta: number) {
    const arrows: Container = this.container.getChildByName('arrows');
    for (const arrow of arrows.children as ArrowSprite[]) {
      arrow.position.y -= delta * this.song.baseArrowSpeed * this.speed;
      if (arrow.position.y <= TARGET_POSITION - HIT_DISTANCE && !arrow.missed) {
        this.miss(arrow);
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
  }

  updateSpeedUpCounter(delta: number) {
    this.accelerationTimer += delta / 60;
    const speedUpCounter: Text = this.container.getChildByName('speed-up-counter');
    const newSpeedUpCount = 10 - Math.floor(this.accelerationTimer);
    if (
      newSpeedUpCount.toString() !== speedUpCounter.text &&
      (speedUpCounter.text !== SPEEDING_UP_MESSAGE || newSpeedUpCount <= 8)
    ) {
      speedUpCounter.text = newSpeedUpCount.toString();
    }
    while (this.accelerationTimer > ACCELERATION_TIME_DELTA) {
      speedUpCounter.text = SPEEDING_UP_MESSAGE;
      this.speed *= ACCELERATION;
      this.music.speed = this.speed;
      this.accelerationTimer -= ACCELERATION_TIME_DELTA;
    }
  }

  updateVolumeFadeOut(delta: number) {
    if (this.songTimer >= this.song.fadeOutStart && this.songTimer < this.song.fadeOutEnd) {
      this.music.volume -= ((DEFAULT_VOLUME / (this.song.fadeOutEnd - this.song.fadeOutStart)) * delta) / 60;
    } else if (this.songTimer >= this.song.fadeOutEnd) {
      this.music.volume = 0;
    }
  }

  spawnArrow(direction: Direction) {
    const arrows: Container = this.container.getChildByName('arrows');
    const arrow = ArrowSprite.realFrom('images/arrow.png', direction);
    arrow.scale.set(ARROW_HEIGHT / arrow.height);
    arrow.anchor.set(0.5);
    arrow.rotation = direction.rotation;
    arrow.tint = direction.color;
    arrow.position.set(getArrowPosition(direction, arrow.width, this.width), 600 + arrow.height);
    arrows.addChild(arrow);
  }
}
