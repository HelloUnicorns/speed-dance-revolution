import { Sprite, Text } from 'pixi.js';
import { Song } from '../songs/song';
import { createSongSelectButton } from '../sprites/songSelectButton';
import { Scene } from './scene';

const MARGIN = 5;

export class SelectSongScene extends Scene {
  constructor(width: number, height: number, songs: Song[], enterOptionsCallback: () => void, songSelectCallback: (song: Song) => void) {
    super(width, height);

    const header = new Text('Select song', {
      fontFamily: 'Bubblegum',
      fontSize: this.height / 8,
      fill: 0xff3399,
      align: 'center',
    });
    header.anchor.set(0.5, 0);
    header.position.set(width / 2, height / 6);
    this.container.addChild(header);

    songs.forEach((song, index) => {
      let fontColor = 0x000000;
      if (song.name == 'Autumn Dance') fontColor = 0xdd5501;
      else if (song.name == 'Funky Love') fontColor = 0xcc0000;
      const button = createSongSelectButton(song, width, height, fontColor, songSelectCallback);
      button.position.set(width / 2 - button.width / 2, height / 2.2 - button.height / 2 + height / 4.4 * index);
      this.container.addChild(button);
    });

    const options = Sprite.from('images/options.png');
    options.scale.set(0.25);
    options.anchor.set(1, 1);
    options.position.set(this.width - MARGIN, this.height - MARGIN);
    options.on('pointerdown', enterOptionsCallback);
    options.interactive = true;
    options.buttonMode = true;
    this.container.addChild(options);

    const turnOnVolumeLabel = new Text('Turn on your volume!', {
      fontFamily: 'Party Confetti',
      fontSize: this.height / 20,
      fill: 0xffffff,
      align: 'center',
    });
    turnOnVolumeLabel.anchor.set(0.5, 0);
    turnOnVolumeLabel.position.set(width/2, MARGIN);
    this.container.addChild(turnOnVolumeLabel);

    const touchPadInfo = new Text('From your computer? Use the arrow keys\nFrom your phone? Enable the touch pad in the options!', {
      fontFamily: 'Party Confetti',
      fontSize: this.height / 20,
      fill: 0xffffff,
      align: 'center',
    });
    touchPadInfo.anchor.set(0.5, 1);
    touchPadInfo.position.set(width/2, height - MARGIN);
    this.container.addChild(touchPadInfo);
  }
}
