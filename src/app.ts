import { Application } from 'pixi.js';
import { ArrowsContainer } from './containers/arrows';

const app = new Application({ width: 800, height: 600 });

app.stage.addChild(new ArrowsContainer(app.view.width, app.view.height).container);

export default app;
