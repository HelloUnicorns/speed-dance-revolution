import { Container, Sprite } from 'pixi.js';

export class ArrowsContainer {
  container: Container;

  constructor(width: number, _: number) {
    this.container = new Container();

    const topArrows = Sprite.from('images/arrows.png');
    topArrows.anchor.set(0.5, 0);
    topArrows.position.set(width / 2, 20);

    this.container.addChild(topArrows);
  }
}
