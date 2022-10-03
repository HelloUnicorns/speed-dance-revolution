import { Sound } from "@pixi/sound";
import { Graphics, Sprite, Texture } from "pixi.js";
import { Scene } from "./scene";

export class PauseScene extends Scene {
  resumeCallback: () => void;

  playTexture: Texture = Texture.from('images/play.png');
  resumeTextures: Texture[] = [
    Texture.from('images/resume3.png'),
    Texture.from('images/resume2.png'),
    Texture.from('images/resume1.png')
  ]; 

  textureIndex = 0;

  sprite: Sprite = new Sprite(this.resumeTextures[0]);
  timer: ReturnType<typeof setTimeout>;
  sound: Sound = Sound.from('music/boing.mp3');

  constructor(width: number, height: number) {
    super(width, height);

    const graphics = new Graphics();
    graphics.name = 'mask';

    graphics.beginFill(0xFFFFFF);
    graphics.alpha = 0.5;
    graphics.drawRect(0, 0, width, height);

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(this.width / 2, this.height / 2);
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.on('pointerdown', this.resume, this);

    this.container.addChild(graphics);
    this.container.addChild(this.sprite);
  }

  updateTexture() {
    if (this.textureIndex >= this.resumeTextures.length) {
        this.container.alpha = 0;
        this.timer = undefined;
        this.resumeCallback();
        return;
    }

    this.sprite.texture = this.resumeTextures[this.textureIndex];
    this.sound.play();
    this.textureIndex++;
    this.timer = setTimeout(() => this.updateTexture(), 1000);
  }

  pause(resumeCallback: () => void) {
    if (this.timer !== undefined) {
        clearTimeout(this.timer);
    }
    this.sprite.texture = this.playTexture;
    this.resumeCallback = resumeCallback;
    this.container.alpha = 1;
    this.textureIndex = 0;
  }

  isPaused() : boolean {
    return this.sprite.texture === this.playTexture;
  }

  resume() {
    if (!this.isPaused()) return;
    this.updateTexture();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_delta: number) {
    /* Do nothing */
    return;
  }
}
