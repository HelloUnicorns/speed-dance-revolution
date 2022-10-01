import { Container, PI_2, Sprite } from 'pixi.js';
import { keyboard } from '../utils/keyboard';

interface Direction {
  order: number;
  name: string;
  rotation: number;
  color: number;
  key: string;
}

const DIRECTIONS: Direction[] = [
  { order: 0, name: 'left', rotation: 0, color: 0xff3300, key: 'ArrowLeft' },
  { order: 1, name: 'down', rotation: 0.75 * PI_2, color: 0xffff00, key: 'ArrowDown' },
  { order: 2, name: 'up', rotation: 0.25 * PI_2, color: 0x00ff00, key: 'ArrowUp' },
  { order: 3, name: 'right', rotation: 0.5 * PI_2, color: 0x3377ff, key: 'ArrowRight' },
];

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
      // Static arrow sprite
      const arrow = Sprite.from('images/arrow.png');
      arrow.anchor.set(0.5);
      arrow.name = direction.name;
      arrow.rotation = direction.rotation;
      arrow.position.set(getArrowPosition(direction, arrow.width, this.width), 60);
      this.container.addChild(arrow);

      // Key handler
      const key = keyboard(direction.key);
      key.press = () => {
        console.log(`${direction.name} pressed`);
      };
    }

    const arrows = new Container();
    arrows.name = 'arrows';
    this.container.addChild(arrows);
  }

  update(delta: number) {
    const arrows = this.container.getChildByName('arrows') as Container;
    for (const arrow of arrows.children as Sprite[]) {
      arrow.position.y -= delta * this.speed;
    }
    arrows.removeChild(...(arrows.children as Sprite[]).filter((arrow) => arrow.position.y < -arrow.height));

    this.spawnTimer += delta / 60;
    while (this.spawnTimer > 1) {
      this.spawnArrow(DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)].name);
      this.spawnTimer--;
    }
  }

  spawnArrow(direction: string) {
    const arrows = this.container.getChildByName('arrows') as Container;
    const arrow = Sprite.from('images/arrow.png');
    arrow.anchor.set(0.5);
    const directionInfo = DIRECTIONS.filter((value) => value.name === direction)[0];
    arrow.rotation = directionInfo.rotation;
    arrow.tint = directionInfo.color;
    arrow.position.set(getArrowPosition(directionInfo, arrow.width, this.width), 600 + arrow.height);
    arrows.addChild(arrow);
  }
}
