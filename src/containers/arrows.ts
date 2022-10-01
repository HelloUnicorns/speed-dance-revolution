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

export class ArrowsContainer {
  static create(width: number, _: number): Container {
    const container = new Container();

    for (const direction of DIRECTIONS) {
      const arrow = Sprite.from('images/arrow.png');
      arrow.anchor.set(0.5);
      arrow.name = direction.name;
      arrow.rotation = direction.rotation;
      arrow.position.set(width / 2 + (direction.order - 1.5) * arrow.width * 1.1, 60);
      container.addChild(arrow);
    }

    return container;
  }
}
