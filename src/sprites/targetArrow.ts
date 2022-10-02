import { Texture } from 'pixi.js';
import { ArrowSprite, Direction } from './arrow';

const ARROW_PATH = 'images/arrow.png';
const ARROW_HIT_PATH = 'images/arrow_hit.png';

export class TargetArrowSprite extends ArrowSprite {
  defaultTexture: Texture;
  hitTexture: Texture;
  timer: ReturnType<typeof setTimeout>;

  static DEFAULT_TIMEOUT = 300;

  constructor(defaultTexture: Texture, hitTexture: Texture, direction: Direction) {
    super(defaultTexture, direction);
    this.defaultTexture = defaultTexture;
    this.hitTexture = hitTexture;
  }

  static create(direction: Direction) {
    const defaultTexture = Texture.from(ARROW_PATH);
    const hitTexture = Texture.from(ARROW_HIT_PATH);

    return new TargetArrowSprite(defaultTexture, hitTexture, direction);
  }

  clearHit() {
    this.texture = this.defaultTexture;

    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  hit(timeout: number = TargetArrowSprite.DEFAULT_TIMEOUT) {
    this.texture = this.hitTexture;
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
    }
    console.log(`setting timer for ${timeout} seconds`);
    this.timer = setTimeout(() => this.clearHit(), timeout);
  }
}
