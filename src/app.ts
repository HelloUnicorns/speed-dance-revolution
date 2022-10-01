import { Application } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { MainScene } from './scenes/main';

const app = new Application({ width: 800, height: 600, autoStart: false });
Assets.load(['images/arrow.png']).then(onAssetsLoaded);

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
