import { Graphics, Sprite } from "pixi.js";
import { Scene } from "./scene";

export class OptionsScene extends Scene {
  constructor(width: number, height: number, exitOptionsCallback: () => void) {
    super(width, height);

    const graphics = new Graphics();
    graphics.name = 'mask';
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, width, height);
    this.container.addChild(graphics);

    const options = Sprite.from('images/options.png');
    options.scale.set(0.25);
    options.anchor.set(1, 1);
    options.position.set(this.width, this.height);
    options.on('pointerdown', exitOptionsCallback);
    options.interactive = true;
    options.buttonMode = true;
    this.container.addChild(options);
  }
}
