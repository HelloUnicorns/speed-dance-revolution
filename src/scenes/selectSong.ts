import { Container, Text } from 'pixi.js';
import { Song } from '../songs/song';
import { createSongSelectButton } from '../sprites/songSelectButton';
import { Scene } from './scene';

export class SelectSongScene extends Scene {
  constructor(width: number, height: number, songs: Song[], songSelectCallback: (song: Song) => void) {
    super(width, height);

    const header = new Text('Select song', {
      fontFamily: 'Confetti Stream',
      fontSize: this.height / 8,
      fill: 0xff3399,
      align: 'center',
    });
    header.anchor.set(0.5, 0);
    header.position.set(width / 2, height / 6);
    this.container.addChild(header);

    songs.forEach((song, index) => {
      let fontColor = 0x000000;
      if (song.name == 'Autumn Dance') fontColor = 0xff7700;
      else if (song.name == 'Funky Love') fontColor = 0xff0000;
      const button = createSongSelectButton(song, width, height, fontColor, songSelectCallback);
      button.position.set(width / 2 - button.width / 2, height / 2.2 - button.height / 2 + height / 4.4 * index);
      this.container.addChild(button);
    });
  }
}
