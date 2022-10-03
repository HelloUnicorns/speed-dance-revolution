import { Container, Sprite, Text, Texture } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { ArrowSprite, Direction, DIRECTIONS, getDirection } from '../sprites/arrow';
import { TargetArrowSprite } from '../sprites/targetArrow';
import { TargetArrowContainer } from '../sprites/targetArrowContainer';
import { keyboard } from '../utils/keyboard';
import { Song } from '../songs/song';
import { ACCELERATION, ACCELERATION_TIME_DELTA, ARROW_HEIGHT, HIT_DISTANCE, HIT_MESSAGES, TARGET_POSITION } from '../consts';
import { getMissMessage } from '../utils/messages';
import { Scene } from './scene';
import { AppOptions } from '../options';
import { HitMessage } from '../sprites/hitMessage';
import { Statistics } from '../utils/statistics';


const HIT_SCORE = 10;
const MAX_SCORE_COMBO_MULTIPLIER = 11;
const COMBO_LEVEL_LENGTH = 10;
const SPEEDING_UP_MESSAGE = 'Speeding up!';

function getArrowPosition(direction: Direction, arrowWidth: number, appWidth: number): number {
  return appWidth / 2 + (direction.order - 1.5) * arrowWidth * 1.1;
}

export class MainScene extends Scene {
  songTimer = 0;
  accelerationTimer = 0;
  speed = 1;
  song: Song;
  currentNoteIndex = 0;
  music: Sound;
  paused = false;
  running = false;
  score = 0;
  combo = 0;
  options: AppOptions;
  pauseCallback: () => void;
  endCallback: (songName: string, statistics: Statistics) => void;
  statistics = new Statistics();

  constructor(
    width: number,
    height: number,
    song: Song,
    options: AppOptions,
    pauseCallback: () => void,
    endCallback: (songName: string, statistics: Statistics) => void,
  ) {
    super(width, height);
    this.pauseCallback = pauseCallback;
    this.endCallback = endCallback;
    this.song = song;
    this.options = options;

    const scoreLabel = new Text('Score: 0', {
      fontFamily: 'Arial',
      fontSize: this.height / 15,
      fill: 0x00ff88,
      align: 'center',
    });
    scoreLabel.anchor.set(0.5, 1);
    scoreLabel.position.set(this.width / 2, this.height);
    scoreLabel.name = 'score';
    this.container.addChild(scoreLabel);

    const comboLabel = new Text('Combo: 0', {
      fontFamily: 'Arial',
      fontSize: this.height / 15,
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
      fontSize: this.height / 15,
      fill: 0xffffff,
    });
    speedUpCounter.anchor.set(0);
    speedUpCounter.position.set(0);
    speedUpCounter.name = 'speed-up-counter';
    this.container.addChild(speedUpCounter);

    const loadingLabel = new Text('Loading...', {
      fontFamily: 'Arial',
      fontSize: this.height / 15,
      fill: 0xffffff,
    });
    loadingLabel.anchor.set(0.5);
    loadingLabel.position.set(this.width / 2, this.height / 2);
    loadingLabel.name = 'loading';
    this.container.addChild(loadingLabel);

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
        this.hit(hitArrow.direction, Math.abs(hitArrow.position.y - TARGET_POSITION));
        arrows.removeChild(hitArrow);
      };

      if (options.touchPadEnabled) {
        // Touch handler right side
        const touchArrowLeft = ArrowSprite.realFrom('images/arrow.png', direction);
        touchArrowLeft.scale.set(ARROW_HEIGHT / touchArrowLeft.height);
        touchArrowLeft.anchor.set(0.5);
        touchArrowLeft.rotation = direction.rotation;
        touchArrowLeft.tint = direction.name == 'left' || direction.name == 'right' ? 0xff00ff : 0x3377ff;
        touchArrowLeft.position.set(this.width * 0.85, this.height / 2);
        switch (direction.name) {
          case 'left':
            touchArrowLeft.position.x -= arrow.width;
            break;
          case 'right':
            touchArrowLeft.position.x += arrow.width;
            break;
          case 'up':
            touchArrowLeft.position.y -= arrow.height;
            break;
          case 'down':
            touchArrowLeft.position.y += arrow.height;
            break;
        }
        touchArrowLeft.interactive = true;
        touchArrowLeft.buttonMode = true;
        touchArrowLeft.on('pointerdown', () => {
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
          this.hit(hitArrow.direction, Math.abs(hitArrow.position.y - TARGET_POSITION));
          arrows.removeChild(hitArrow);
        });
        this.container.addChild(touchArrowLeft);

        // Touch handler left side
        const touchArrowRight = ArrowSprite.realFrom('images/arrow.png', direction);
        touchArrowRight.scale.set(ARROW_HEIGHT / touchArrowRight.height);
        touchArrowRight.anchor.set(0.5);
        touchArrowRight.rotation = direction.rotation;
        touchArrowRight.tint = direction.name == 'left' || direction.name == 'right' ? 0xff00ff : 0x3377ff;
        touchArrowRight.position.set(this.width * 0.15, this.height / 2);
        switch (direction.name) {
          case 'left':
            touchArrowRight.position.x -= arrow.width;
            break;
          case 'right':
            touchArrowRight.position.x += arrow.width;
            break;
          case 'up':
            touchArrowRight.position.y -= arrow.height;
            break;
          case 'down':
            touchArrowRight.position.y += arrow.height;
            break;
        }
        touchArrowRight.interactive = true;
        touchArrowRight.buttonMode = true;
        touchArrowRight.on('pointerdown', () => {
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
          this.hit(hitArrow.direction, Math.abs(hitArrow.position.y - TARGET_POSITION));
          arrows.removeChild(hitArrow);
        });
        this.container.addChild(touchArrowRight);
      }
    }

    if (!options.touchPadEnabled) {
      const stickLeft = Sprite.from('images/stick-miss.png');
      stickLeft.scale.set(
        Math.min(
          Math.min(stickLeft.width, this.width / 3) / stickLeft.width,
          Math.min(stickLeft.height, this.height) / stickLeft.height,
        ),
      );
      stickLeft.anchor.set(0.5);
      stickLeft.position.set(this.width / 6, this.height / 2);
      stickLeft.name = 'stick-left';
      this.container.addChild(stickLeft);

      const stickRight = Sprite.from('images/stick-miss.png');
      stickRight.scale.set(
        Math.min(
          Math.min(stickRight.width, this.width / 3) / stickRight.width,
          Math.min(stickRight.height, this.height) / stickRight.height,
        ),
      );
      stickRight.anchor.set(0.5);
      stickRight.position.set((this.width * 5) / 6, this.height / 2);
      stickRight.name = 'stick-right';
      this.container.addChild(stickRight);
    }

    const arrows = new Container();
    arrows.name = 'arrows';
    this.container.addChild(arrows);

    const hitMessage = new HitMessage();
    hitMessage.name = 'hit';
    hitMessage.anchor.set(0.5, 0.5);
    hitMessage.position.set(width / 2, height / 2);
    hitMessage.style.fontSize = height / 8;
    this.container.addChild(hitMessage);
  }

  start() {
    this.music = Sound.from({
      url: this.song.source,
      sprites: { song: { start: 0, end: this.song.end } },
      preload: true,
      loaded: async () => {
        this.container.removeChild(this.container.getChildByName('loading'));
        this.music.volume = this.options.volume;

        /* Starting the song even if it gets immediately paused,
         *   otherwise this.music.resume() doesn't work in this.resume() */
        (await this.music.play('song')).on('end', () => {
          console.log('song ended');
          this.endCallback(this.song.name, this.statistics);
        });

        if (!this.paused) {
          this.running = true;
        } else {
          this.music.pause();
        }
      },
    });
  }

  pause() {
    this.running = false;
    this.paused = true;
    this.music.pause();
    this.pauseCallback();
  }

  resume() {
    if (this.running) return;
    this.paused = false;
    this.music.resume();
    this.running = true;
  }

  updateCombo(newCombo: number) {
    if (newCombo === this.combo) return;
    const comboLabel: Text = this.container.getChildByName('combo');
    comboLabel.tint = newCombo === 0 ? 0xff0000 : 0xffffff;
    comboLabel.text = newCombo === 0 ? 'MISS' : 'Combo: ' + newCombo.toString();
    this.combo = newCombo;
    this.statistics.maxCombo = Math.max(this.statistics.maxCombo, this.combo);
  }

  hit(direction: Direction, hitDelta: number) {
    console.log('hit');

    const hitMessageData = hitDelta === HIT_DISTANCE 
      ? HIT_MESSAGES[HIT_MESSAGES.length - 1]
      : HIT_MESSAGES[Math.floor(HIT_MESSAGES.length * (1 - hitDelta / HIT_DISTANCE))];
      (this.container.getChildByName('hit') as HitMessage).setMessage(
        hitMessageData[0], hitMessageData[1], HitMessage.DEFAULT_TIMEOUT / this.speed);
    this.statistics.noteIncrease(hitMessageData[0]);

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
    this.statistics.score = this.score;

    const scoreLabel: Text = this.container.getChildByName('score');
    scoreLabel.text = 'Score: ' + Math.round(this.score).toString();

    const targetArrows: TargetArrowContainer = this.container.getChildByName('targetArrows');
    const arrow = targetArrows.getChildByDirection(direction) as TargetArrowSprite;
    arrow.hit(TargetArrowSprite.DEFAULT_TIMEOUT / this.speed);

    if (!this.options.touchPadEnabled) {
      console.log(`stick-${direction.name}.png`);
      (this.container.getChildByName('stick-left') as Sprite).texture = Texture.from(
        `images/stick-${direction.name}.png`,
      );
      (this.container.getChildByName('stick-right') as Sprite).texture = Texture.from(
        `images/stick-${direction.name}.png`,
      );
    }
  }

  miss(arrow?: ArrowSprite) {
    console.log('miss');
    const missMessage = getMissMessage();
    this.statistics.noteIncrease(missMessage);
    (this.container.getChildByName('hit') as HitMessage).setMessage(
      missMessage, 0xFF0000, HitMessage.DEFAULT_TIMEOUT / this.speed);

    this.updateCombo(0);
    if (arrow !== undefined) {
      arrow.missed = true;
    }
    if (!this.options.touchPadEnabled) {
      (this.container.getChildByName('stick-left') as Sprite).texture = Texture.from(`images/stick-miss.png`);
      (this.container.getChildByName('stick-right') as Sprite).texture = Texture.from(`images/stick-miss.png`);
    }
  }

  update(delta: number) {
    if (!this.running) return;
    this.updateArrows(delta);
    this.updateSpeedUpCounter(delta);
    this.updateVolumeFadeOut(delta);
    (this.container.getChildByName('hit') as HitMessage).update(delta);
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
      this.music.volume -= ((this.options.volume / (this.song.fadeOutEnd - this.song.fadeOutStart)) * delta) / 60;
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
    arrow.position.set(getArrowPosition(direction, arrow.width, this.width), this.height + arrow.height);
    arrows.addChild(arrow);
  }
}
