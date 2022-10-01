import { Application, Sprite } from 'pixi.js';

const app = new Application({ width: 800, height: 600 });
document.body.appendChild(app.view);
const sprite = Sprite.from('images/phaser3-logo.png');
app.stage.addChild(sprite);
