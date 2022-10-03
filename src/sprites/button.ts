import { EventEmitter } from "@pixi/utils";
import { Container, Sprite, Texture, Text } from "pixi.js";

export class Button extends Container {
  constructor(width: number, height: number, fontSize: number, text: string, callback: EventEmitter.ListenerFn) {
    super();
    const rectangle = Sprite.from(Texture.WHITE);
    rectangle.width = width;
    rectangle.height = height;
    rectangle.interactive = true;
    rectangle.buttonMode = true;
    rectangle.on('pointerdown', () => callback());
    this.addChild(rectangle);
  
    const label = new Text(text, {
      fontFamily: 'Dunk Tank',
      fontSize: fontSize,
      fill: 0x000000,
      align: 'center',
    });
    label.anchor.set(0.5);
    label.position.set(rectangle.width / 2, rectangle.height / 2);
    this.addChild(label);
  }
}
