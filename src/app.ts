import { Application } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { MainScene } from './scenes/main';
import { APP_HEIGHT } from './consts';

const app = new Application({ width: 800, height: APP_HEIGHT, autoStart: false });
Assets.load(['images/arrow.png', 'images/arrow_hit.png', 'images/start.png']).then(onAssetsLoaded);

let mainScene: MainScene;
function onAssetsLoaded() {
  mainScene = new MainScene(app.view.width, app.view.height);
  app.stage.addChild(mainScene.container);
  app.start();
}

app.ticker.add((delta: number) => {
  mainScene.update(delta);
});

export default app;
