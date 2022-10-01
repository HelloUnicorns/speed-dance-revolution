import { Container, Sprite } from 'pixi.js';

export class ArrowsContainer {
  static create(width: number, _: number): Container {
    const container = new Container();

    const topArrows = Sprite.from('images/arrows.png');
    topArrows.anchor.set(0.5, 0);
    topArrows.position.set(width / 2, 20);

    container.addChild(topArrows);

    return container;
  }
}
