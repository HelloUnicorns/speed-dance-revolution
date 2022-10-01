import { Application } from 'pixi.js';
import { ArrowsContainer } from './containers/arrows';

const app = new Application({ width: 800, height: 600 });

const arrowsContainer = ArrowsContainer.create(app.view.width, app.view.height);

app.stage.addChild(arrowsContainer);

export default app;
