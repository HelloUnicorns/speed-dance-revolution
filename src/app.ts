import { Application } from 'pixi.js';

import Arrow from './components/arrow';

const app = new Application({ width: 800, height: 600 });

app.stage.addChild(Arrow);

export default app;
