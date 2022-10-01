import { Container, PI_2, Sprite } from 'pixi.js';

interface Direction {
  order: number;
  name: string;
  rotation: number;
}

const DIRECTIONS: Direction[] = [
  { order: 0, name: 'left', rotation: 0 },
  { order: 1, name: 'down', rotation: 0.75 * PI_2 },
  { order: 2, name: 'up', rotation: 0.25 * PI_2 },
  { order: 3, name: 'right', rotation: 0.5 * PI_2 },
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
      const arrow = Sprite.from('images/arrow.png');
      arrow.anchor.set(0.5);
      arrow.name = direction.name;
      arrow.rotation = direction.rotation;
      arrow.position.set(getArrowPosition(direction, arrow.width, this.width), 60);
      this.container.addChild(arrow);
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
      this.spawn(DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)].name);
      this.spawnTimer--;
    }
  }

  spawn(direction: string) {
    const arrows = this.container.getChildByName('arrows') as Container;
    const arrow = Sprite.from('images/arrow.png');
    arrow.anchor.set(0.5);
    const directionInfo = DIRECTIONS.filter((value) => value.name === direction)[0];
    arrow.rotation = directionInfo.rotation;
    arrow.position.set(getArrowPosition(directionInfo, arrow.width, this.width), 600 + arrow.height);
    arrows.addChild(arrow);
  }
}
