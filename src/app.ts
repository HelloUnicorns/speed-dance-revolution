import { Application } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { MainScene } from './scenes/main';
import { APP_HEIGHT } from './consts';
import { autumnDance } from './songs/autumnDance';
import { funkyLove } from './songs/funkyLove';
import { SelectSongScene } from './scenes/selectSong';
import { Song } from './songs/song';

const app = new Application({ width: 800, height: APP_HEIGHT, autoStart: false });
Assets.load(['images/arrow.png', 'images/arrow_hit.png']).then(onAssetsLoaded);

const songs: Song[] = [autumnDance, funkyLove];

let selectSongScene: SelectSongScene;
let mainScene: MainScene;
function onAssetsLoaded() {
  selectSongScene = new SelectSongScene(app.view.width, app.view.height, songs, onSongSelect);
  app.stage.addChild(selectSongScene.container);
  app.start();
}

function onSongSelect(song: Song) {
  app.stop();
  app.stage.removeChild(selectSongScene.container);
  mainScene = new MainScene(app.view.width, app.view.height, song);
  app.stage.addChild(mainScene.container);
  app.start();
}

let mainSceneStarted = false;
app.ticker.add((delta: number) => {
  if (mainScene !== undefined) {
    if (!mainSceneStarted) {
      mainSceneStarted = true;
      mainScene.start();
    }
    mainScene.update(delta);
  }
});

export default app;
