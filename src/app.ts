import { Application } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { ArrowsContainer } from './containers/arrows';

const app = new Application({ width: 800, height: 600 });
app.stop();
Assets.load(['images/arrow.png']).then(onAssetsLoaded);

function onAssetsLoaded() {
  const arrowsContainer = ArrowsContainer.create(app.view.width, app.view.height);
  app.stage.addChild(arrowsContainer);
  app.start();
}

export default app;
