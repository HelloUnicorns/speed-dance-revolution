import { Scene } from "./scene";
import { Text } from 'pixi.js';
import { Button } from "../sprites/button";

export class EndingScene extends Scene {
  constructor(width: number, height: number, songName: string, score: number, replayCallback: () => void) {
    super(width, height);

    const header = new Text(songName, {
        fontFamily: 'Arial',
        fontSize: height / 12,
        fill: 0xffffff,
        align: 'center',
    });
    header.anchor.set(0.5, 0);
    header.position.set(width / 2, 60);
    header.name = 'songName';
    this.container.addChild(header);

    const details = new Text(`Total Score: ${score}`, {
        fontFamily: 'Arial',
        fontSize: height / 18,
        fill: 0xffffff,
        align: 'center',
    });
    details.anchor.set(0.5, 0.5);
    details.position.set(width / 2, height / 2);
    details.name = 'details';
    this.container.addChild(details);

    const replayButton = new Button(height / 1.875, height / 7.5, 'Start a new game', replayCallback);
    replayButton.position.set(width / 2 - replayButton.width / 2, height  - replayButton.height - 20);
    this.container.addChild(replayButton);
  }
}