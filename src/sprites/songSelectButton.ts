import { Song } from '../songs/song';
import { Button } from './button';

export function createSongSelectButton(song: Song, screenWidth: number, screenHeight: number, fontColor: number, songSelectCallback: (song: Song) => void): Button {
  return new Button(screenHeight / 1.5, screenHeight / 5, screenHeight / 15, fontColor, song.name, () => songSelectCallback(song));
}
