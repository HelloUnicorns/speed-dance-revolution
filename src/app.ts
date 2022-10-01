import { Application, Sprite } from 'pixi.js';

const app = new Application({ width: 800, height: 600 });

const arrows = Sprite.from('images/arrows.png');
arrows.anchor.set(0.5, 0);
arrows.position.set(app.view.width / 2, 20);

app.stage.addChild(arrows);

export default app;
