import { Text } from 'pixi.js';
import { Scene } from './scene';

export class StartScene extends Scene {
  constructor(width: number, height: number) {
    super(width, height);

    const header = new Text('Speed Dance\nRevolution', {
      fontFamily: 'Arial',
      fontSize: this.width / 8,
      fill: 0xff3399,
      align: 'center',
    });
    header.anchor.set(0.5);
    header.position.set(width / 2, height / 2);
    this.container.addChild(header);    
  }
}
