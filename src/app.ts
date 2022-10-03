import { Application } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { MainScene } from './scenes/main';
import { APP_HEIGHT } from './consts';
import { PauseScene } from './scenes/pause';
import { keyboard } from './utils/keyboard';

const app = new Application({ width: Math.min(window.innerWidth, 1280), height: APP_HEIGHT, autoStart: false });
Assets.load(['images/arrow.png', 'images/arrow_hit.png', 'images/start.png',
  'images/pause.png', 'images/play.png', 'images/resume1.png',
  'images/resume2.png', 'images/resume3.png', 'music/boing.mp3']).then(onAssetsLoaded);

let mainScene: MainScene;
let pauseScene: PauseScene;
function onAssetsLoaded() {
  pauseScene = new PauseScene(app.view.width, app.view.height, onResume);
  mainScene = new MainScene(app.view.width, app.view.height, onPause);
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

app.ticker.add((delta: number) => {
  mainScene.update(delta);
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    mainScene.pause();
  }
});

export default app;
