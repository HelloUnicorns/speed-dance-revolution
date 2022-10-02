import { Container, Sprite, Text, Texture } from 'pixi.js';
import { Song } from '../songs/song';

export class SongSelectButton extends Container {
  song: Song;

  constructor(song: Song, songSelectCallback: (song: Song) => void) {
    super();
    this.song = song;
  }

  static create(song: Song, songSelectCallback: (song: Song) => void): SongSelectButton {
    const container = new SongSelectButton(song, songSelectCallback);

    const rectangle = Sprite.from(Texture.WHITE);
    rectangle.width = 320;
    rectangle.height = 80;
    rectangle.interactive = true;
    rectangle.buttonMode = true;
    rectangle.on('pointerdown', () => {
      songSelectCallback(container.song);
    });
    container.addChild(rectangle);

    const label = new Text(song.name, {
      fontFamily: 'Arial',
      fontSize: 32,
      fill: 0x000000,
      align: 'center',
    });
    label.anchor.set(0.5);
    label.position.set(rectangle.width / 2, rectangle.height / 2);
    container.addChild(label);

    return container;
  }
}
