import { Scene } from './scene';
import { Text } from 'pixi.js';
import { Button } from '../sprites/button';
import { Statistics } from '../utils/statistics';

export class EndingScene extends Scene {
  constructor(width: number, height: number, songName: string, statistics: Statistics, replayCallback: () => void) {
    super(width, height);

    const header = new Text(songName, {
      fontFamily: 'Stick To It',
      fontSize: height / 12,
      fill: 0xffffff,
      align: 'center',
    });
    header.anchor.set(0.5, 0);
    header.position.set(width / 2, 60);
    header.name = 'songName';
    this.container.addChild(header);

    const maxCombo = new Text(`Max Combo: ${statistics.maxCombo}`, {
      fontFamily: 'Party Confetti',
      fontSize: height / 20,
      fill: 0xffffff,
      align: 'center',
    });
    maxCombo.anchor.set(0.5, 0.5);
    maxCombo.position.set(width / 2, height * 5 / 16);
    this.container.addChild(maxCombo);

    const perfect = new Text(`Perfect: ${statistics.perfect}`, {
      fontFamily: 'Party Confetti',
      fontSize: height / 20,
      fill: 0xFFFF00,
      align: 'center',
    });
    perfect.anchor.set(0.5, 0.5);
    perfect.position.set(width / 2, height * 3 / 8);
    this.container.addChild(perfect);

    const great = new Text(`Great: ${statistics.great}`, {
      fontFamily: 'Party Confetti',
      fontSize: height / 20,
      fill: 0x00FF00,
      align: 'center',
    });
    great.anchor.set(0.5, 0.5);
    great.position.set(width / 2, height * 7 / 16);
    this.container.addChild(great);

    const good = new Text(`Good: ${statistics.good}`, {
      fontFamily: 'Party Confetti',
      fontSize: height / 20,
      fill: 0xFF00FF,
      align: 'center',
    });
    good.anchor.set(0.5, 0.5);
    good.position.set(width / 2, height / 2);
    this.container.addChild(good);

    const ok = new Text(`O.K.: ${statistics.ok}`, {
      fontFamily: 'Party Confetti',
      fontSize: height / 20,
      fill: 0x0055FF,
      align: 'center',
    });
    ok.anchor.set(0.5, 0.5);
    ok.position.set(width / 2, height * 9 / 16);
    this.container.addChild(ok);

    const missed = new Text(`Missed: ${statistics.miss}`, {
      fontFamily: 'Party Confetti',
      fontSize: height / 20,
      fill: 0xff0000,
      align: 'center',
    });
    missed.anchor.set(0.5, 0.5);
    missed.position.set(width / 2, height * 5 / 8);
    this.container.addChild(missed);

    const totalScore = new Text(`Total Score: ${Math.round(statistics.score)}`, {
      fontFamily: 'Party Confetti',
      fontSize: height / 20,
      fill: 0xffffff,
      align: 'center',
    });
    totalScore.anchor.set(0.5, 0.5);
    totalScore.position.set(width / 2, height * 11 / 16);
    this.container.addChild(totalScore);

    const replayButton = new Button(
      this.height / 1.5,
      this.height / 5,
      this.height / 15,
      0,
      'Start a new game',
      replayCallback,
    );
    replayButton.position.set(width / 2 - replayButton.width / 2, height - replayButton.height - 20);
    this.container.addChild(replayButton);
  }
}
