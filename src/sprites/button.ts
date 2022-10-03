import { EventEmitter } from "@pixi/utils";
import { Container, Sprite, Text } from "pixi.js";

export class Button extends Container {
  constructor(width: number, height: number, fontSize: number, fontColor: number, text: string, callback: EventEmitter.ListenerFn) {
    super();
    const rectangle = Sprite.from('images/button.png');
    rectangle.width = width;
    rectangle.height = height;
    rectangle.interactive = true;
    rectangle.buttonMode = true;
    rectangle.on('pointerdown', () => callback());
    this.addChild(rectangle);
  
    const label = new Text(text, {
      fontFamily: 'Dunk Tank',
      fontSize: fontSize,
      fill: fontColor,
      align: 'center',
    });
    label.anchor.set(0.5);
    label.position.set(rectangle.width / 2, rectangle.height / 2);
    this.addChild(label);
  }
}
