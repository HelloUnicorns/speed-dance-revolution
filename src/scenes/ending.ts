import { Scene } from "./scene";
import { Text } from 'pixi.js';
import { Button } from "../sprites/button";
import { Statistics } from "../utils/statistics";

export class EndingScene extends Scene {
  constructor(width: number, height: number, songName: string, statistics: Statistics, replayCallback: () => void) {
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

    const details = new Text(`
      Max Combo: ${statistics.maxCombo}\n
      Perfect: ${statistics.perfect}\n
      Great: ${statistics.great}\n
      Good: ${statistics.good}\n
      O.K.: ${statistics.ok}\n
      Missed: ${statistics.miss}\n
      Total Score: ${Math.round(statistics.score)}`, {
        fontFamily: 'Arial',
        fontSize: height / 32,
        fill: 0xffffff,
        align: 'center',
    });
    details.style.lineHeight = details.style.lineHeight / 2;
    details.anchor.set(0.5, 0.5);
    details.position.set(width / 2, height / 2);
    details.name = 'details';
    this.container.addChild(details);

    const replayButton = new Button(
        this.height / 1.5, this.height / 5, this.height / 15, 'Start a new game', replayCallback);
    replayButton.position.set(width / 2 - replayButton.width / 2, height  - replayButton.height - 20);
    this.container.addChild(replayButton);
  }
}