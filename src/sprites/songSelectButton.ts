import { Song } from '../songs/song';
import { Button } from './button';

export function createSongSelectButton(song: Song, songSelectCallback: (song: Song) => void): Button {
  return new Button(320, 80, song.name, () => songSelectCallback(song));
}
