import { Text } from 'pixi.js';
import { Song } from '../songs/song';
import { createSongSelectButton } from '../sprites/songSelectButton';
import { Scene } from './scene';

export class SelectSongScene extends Scene {
  constructor(width: number, height: number, songs: Song[], songSelectCallback: (song: Song) => void) {
    super(width, height);

    const header = new Text('Select song:', {
      fontFamily: 'Arial',
      fontSize: this.height / 12,
      fill: 0xffffff,
      align: 'center',
    });
    header.anchor.set(0.5, 0);
    header.position.set(width / 2, height / 6);
    this.container.addChild(header);

    songs.forEach((song, index) => {
      const button = createSongSelectButton(song, width, height, songSelectCallback);
      button.position.set(width / 2 - button.width / 2, height / 2.3 - button.height / 2 + height / 4 * index);
      this.container.addChild(button);
    });
  }
}
