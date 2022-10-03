import { Application } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { MainScene } from './scenes/main';
import { APP_HEIGHT, APP_MARGIN } from './consts';
import { autumnDance } from './songs/autumnDance';
import { funkyLove } from './songs/funkyLove';
import { SelectSongScene } from './scenes/selectSong';
import { Song } from './songs/song';
import { PauseScene } from './scenes/pause';
import { keyboard } from './utils/keyboard';
import { OptionsScene } from './scenes/options';
import { AppOptions } from './options';

const app = new Application({
  width: Math.min(window.innerWidth - 2 * APP_MARGIN, 1280),
  height: APP_HEIGHT,
  autoStart: false,
});
Assets.load([
  'images/arrow.png',
  'images/arrow_hit.png',
  'images/pause.png',
  'images/play.png',
  'images/resume1.png',
  'images/resume2.png',
  'images/resume3.png',
  'images/options.png',
  'music/boing.mp3',
]).then(onAssetsLoaded);

const songs: Song[] = [autumnDance, funkyLove];

const options: AppOptions = { volume: 0.08 };

let selectSongScene: SelectSongScene;
let optionsScene: OptionsScene;
let mainScene: MainScene;
let pauseScene: PauseScene;
function onAssetsLoaded() {
  selectSongScene = new SelectSongScene(app.view.width, app.view.height, songs, enterOptions, onSongSelect);
  optionsScene = new OptionsScene(app.view.width, app.view.height, options, exitOptions);
  app.stage.addChild(selectSongScene.container);
  app.start();
}

function onSongSelect(song: Song) {
  app.stop();
  app.stage.removeChild(selectSongScene.container);
  pauseScene = new PauseScene(app.view.width, app.view.height, onResume);
  mainScene = new MainScene(app.view.width, app.view.height, song, options, onPause);
  app.stage.addChild(mainScene.container);

  keyboard(' ').press = () => {
    if (pauseScene.isPaused()) {
      pauseScene.resume();
    } else {
      mainScene.pause();
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      mainScene.pause();
    }
  });

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

function enterOptions() {
  app.stage.addChild(optionsScene.container);
  app.stage.removeChild(selectSongScene.container);
}

function exitOptions() {
  app.stage.addChild(selectSongScene.container);
  app.stage.removeChild(optionsScene.container);
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
