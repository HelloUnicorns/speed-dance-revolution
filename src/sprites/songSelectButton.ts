import { Container, Sprite, Text, Texture } from 'pixi.js';
import { Song } from '../songs/song';

export function createSongSelectButton(song: Song, screenWidth: number, screenHeight: number, songSelectCallback: (song: Song) => void): Container {
  const container = new Container();

  const rectangle = Sprite.from(Texture.WHITE);
  rectangle.width = screenHeight / 1.5;
  rectangle.height = screenHeight / 5;
  rectangle.interactive = true;
  rectangle.buttonMode = true;
  rectangle.on('pointerdown', () => songSelectCallback(song));
  container.addChild(rectangle);

  const label = new Text(song.name, {
    fontFamily: 'Arial',
    fontSize: screenHeight / 15,
    fill: 0x000000,
    align: 'center',
  });
  label.anchor.set(0.5);
  label.position.set(rectangle.width / 2, rectangle.height / 2);
  container.addChild(label);

  return container;
}
