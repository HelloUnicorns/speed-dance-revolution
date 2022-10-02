import { Container, Text } from 'pixi.js';
import { ArrowSprite, Direction, DIRECTIONS } from '../sprites/arrow';
import { TargetArrowSprite } from '../sprites/targetArrow';
import { TargetArrowContainer } from '../sprites/targetArrowContainer';
import { keyboard } from '../utils/keyboard';

const TARGET_POSITION = 60;
const HIT_DISTANCE = 25;
const ACCELERATION = 1.1;
const ACCELERATION_TIME_DELTA = 10;
const HIT_SCORE = 10;
const MAX_SCORE_COMBO_MULTIPLIER = 11;
const COMBO_LEVEL_LENGTH = 10;

function getArrowPosition(direction: Direction, arrowWidth: number, appWidth: number): number {
  return appWidth / 2 + (direction.order - 1.5) * arrowWidth * 1.1;
}

export class MainScene {
  width: number;
  height: number;
  spawnTimer: number;
  accelerationTimer: number;
  speed: number;
  score: number;
  combo: number;

  // Graphics
  container: Container;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.spawnTimer = 0;
    this.accelerationTimer = 0;
    this.speed = 1.5;
    this.score = 0;
    this.combo = 0;

    // Graphics
    this.container = new Container();

    const scoreLabel = new Text('Score: 0', {
      fontFamily : 'Arial',
      fontSize: 32,
      fill : 0x00FF88,
      align : 'center',
    });
    scoreLabel.anchor.set(0.5, 1);
    scoreLabel.position.set(this.width / 2, this.height);
    scoreLabel.name = 'score';
    this.container.addChild(scoreLabel);

    const comboLabel = new Text('Combo: 0', {
      fontFamily : 'Arial',
      fontSize: 32,
      fill : 0xFFFFFF
    });
    comboLabel.anchor.set(0, 1);
    comboLabel.position.set(0, this.height);
    comboLabel.name = 'combo';
    this.container.addChild(comboLabel);
    this.updateCombo(0);


    const targetArrows = new TargetArrowContainer();
    targetArrows.name = 'targetArrows'
    this.container.addChild(targetArrows);
    for (const direction of DIRECTIONS) {
      // Target arrow sprite
      const arrow = targetArrows.getChildByDirection(direction) as TargetArrowSprite;
      arrow.anchor.set(0.5);
      arrow.position.set(getArrowPosition(direction, arrow.width, this.width), TARGET_POSITION);

      // Key handler
      const key = keyboard(direction.key);
      key.press = () => {
        const arrows : Container = this.container.getChildByName('arrows');
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

  updateCombo(newCombo: number) {
    if (newCombo === this.combo) return;
    const comboLabel : Text = this.container.getChildByName('combo');
    comboLabel.tint = newCombo === 0 ? 0xFF0000 : 0xFFFFFF;
    comboLabel.text = newCombo === 0 ? "MISS" : "Combo: " + newCombo.toString();
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
    const comboMultiplier = Math.min(MAX_SCORE_COMBO_MULTIPLIER,
      1 + Math.floor(this.combo / COMBO_LEVEL_LENGTH));
    this.score += HIT_SCORE * this.speed * comboMultiplier;

    const scoreLabel : Text = this.container.getChildByName('score');
    scoreLabel.text = "Score: " + Math.round(this.score).toString();

    const targetArrows : TargetArrowContainer = this.container.getChildByName('targetArrows');
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
    const arrows : Container = this.container.getChildByName('arrows');
    for (const arrow of arrows.children as ArrowSprite[]) {
      arrow.position.y -= delta * this.speed;
      if (arrow.position.y <= TARGET_POSITION - HIT_DISTANCE && !arrow.missed) {
        this.miss(arrow);
      }
    }
    arrows.removeChild(...(arrows.children as ArrowSprite[]).filter((arrow) => arrow.position.y < -arrow.height));

    this.spawnTimer += delta / 60;
    while (this.spawnTimer > 1 / this.speed) {
      this.spawnArrow(DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]);
      this.spawnTimer -= 1 / this.speed;
    }

    this.accelerationTimer += delta / 60;
    while (this.accelerationTimer > ACCELERATION_TIME_DELTA) {
      console.log("speeding up!");
      this.speed *= ACCELERATION;
      this.accelerationTimer -= ACCELERATION_TIME_DELTA;
    }
  }

  spawnArrow(direction: Direction) {
    const arrows : Container = this.container.getChildByName('arrows');
    const arrow = ArrowSprite.realFrom('images/arrow.png', direction);
    arrow.anchor.set(0.5);
    arrow.rotation = direction.rotation;
    arrow.tint = direction.color;
    arrow.position.set(getArrowPosition(direction, arrow.width, this.width), 600 + arrow.height);
    arrows.addChild(arrow);
  }
}
