import { Container } from 'pixi.js';
import { ArrowSprite, Direction, DIRECTIONS, getDirection } from '../sprites/arrow';
import { keyboard } from '../utils/keyboard';

const TARGET_POSITION = 60;
const HIT_DISTANCE = 25;

function getArrowPosition(direction: Direction, arrowWidth: number, appWidth: number): number {
  return appWidth / 2 + (direction.order - 1.5) * arrowWidth * 1.1;
}

export class MainScene {
  container: Container;
  width: number;
  spawnTimer: number;
  speed: number;

  constructor(width: number) {
    this.container = new Container();
    this.width = width;
    this.spawnTimer = 0;
    this.speed = 1.5;

    for (const direction of DIRECTIONS) {
      // Target arrow sprite
      const arrow = ArrowSprite.realFrom('images/arrow.png', direction);
      arrow.anchor.set(0.5);
      arrow.name = direction.name;
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

  update(delta: number) {
    const arrows = this.container.getChildByName('arrows') as Container;
    for (const arrow of arrows.children as ArrowSprite[]) {
      arrow.position.y -= delta * this.speed;
      if (arrow.position.y <= TARGET_POSITION - HIT_DISTANCE) {
        console.log('miss');
        arrow.missed = true;
      }
    }
    arrows.removeChild(...(arrows.children as ArrowSprite[]).filter((arrow) => arrow.position.y < -arrow.height));

    this.spawnTimer += delta / 60;
    while (this.spawnTimer > 1) {
      this.spawnArrow(DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]);
      this.spawnTimer--;
    }
  }

  spawnArrow(direction: Direction) {
    const arrows = this.container.getChildByName('arrows') as Container;
    const arrow = ArrowSprite.realFrom('images/arrow.png', direction);
    arrow.anchor.set(0.5);
    arrow.name = direction.name;
    arrow.rotation = direction.rotation;
    arrow.tint = direction.color;
    arrow.position.set(getArrowPosition(direction, arrow.width, this.width), 600 + arrow.height);
    arrows.addChild(arrow);
  }
}
