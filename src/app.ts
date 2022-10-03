import { Application } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { MainScene } from './scenes/main';
import { APP_HEIGHT } from './consts';
import { autumnDance } from './songs/autumnDance';
import { funkyLove } from './songs/funkyLove';
import { SelectSongScene } from './scenes/selectSong';
import { Song } from './songs/song';
import { PauseScene } from './scenes/pause';
import { keyboard } from './utils/keyboard';

const app = new Application({ width: 800, height: APP_HEIGHT, autoStart: false });
Assets.load(['images/arrow.png', 'images/arrow_hit.png', 'images/start.png',
  'images/pause.png', 'images/play.png', 'images/resume1.png',
  'images/resume2.png', 'images/resume3.png', 'music/boing.mp3']).then(onAssetsLoaded);

const songs: Song[] = [autumnDance, funkyLove];

let selectSongScene: SelectSongScene;
let mainScene: MainScene;
let pauseScene: PauseScene;
function onAssetsLoaded() {
  selectSongScene = new SelectSongScene(app.view.width, app.view.height, songs, onSongSelect);
  app.stage.addChild(selectSongScene.container);
  app.start();
}

function onSongSelect(song: Song) {
  app.stop();
  app.stage.removeChild(selectSongScene.container);
  pauseScene = new PauseScene(app.view.width, app.view.height, onResume);
  mainScene = new MainScene(app.view.width, app.view.height, song, onPause);
  app.stage.addChild(mainScene.container);

  keyboard(' ').press = () => {
    if (pauseScene.isPaused()) {
      pauseScene.resume();
    } else {
      mainScene.pause();
    }
  };

  app.start();
}

function onPause() {
  app.stage.addChild(pauseScene.container);
  pauseScene.pause();
}

function onResume() {
  app.stage.removeChild(pauseScene.container);
  mainScene.resume();
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
