import { Container, Text } from 'pixi.js';
import { Song } from '../songs/song';
import { SongSelectButton } from '../sprites/songSelectButton';

export class SelectSongScene {
  container: Container;

  constructor(width: number, height: number, songs: Song[], songSelectCallback: (song: Song) => void) {
    this.container = new Container();

    const header = new Text('Select song:', {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0xffffff,
      align: 'center',
    });
    header.anchor.set(0.5, 0);
    header.position.set(width / 2, 60);
    this.container.addChild(header);

    songs.forEach((song, index) => {
      const button = SongSelectButton.create(song, songSelectCallback);
      button.position.set(width / 2 - button.width / 2, 200 - button.height / 2 + 120 * index);
      this.container.addChild(button);
    });
  }
}
