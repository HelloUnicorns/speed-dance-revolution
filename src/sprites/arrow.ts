import { IBaseTextureOptions, PI_2, Resource, Sprite, SpriteSource, Texture } from 'pixi.js';

export interface Direction {
  order: number;
  name: string;
  rotation: number;
  color: number;
  key: string;
}

const ARROW_PATH = 'images/arrow.png';
const ARROW_HIT_PATH = 'images/arrow_hit.png';

export const DIRECTIONS: Direction[] = [
  { order: 0, name: 'left', rotation: 0, color: 0xff3300, key: 'ArrowLeft' },
  { order: 1, name: 'down', rotation: 0.75 * PI_2, color: 0xffff00, key: 'ArrowDown' },
  { order: 2, name: 'up', rotation: 0.25 * PI_2, color: 0x00ff00, key: 'ArrowUp' },
  { order: 3, name: 'right', rotation: 0.5 * PI_2, color: 0x3377ff, key: 'ArrowRight' },
];

export function getDirection(name: string) {
  return DIRECTIONS.find(direction => direction.name === name);
}

export class ArrowSprite extends Sprite {
  direction: Direction;
  missed: boolean;

  constructor(texture: Texture<Resource>, direction: Direction) {
    super(texture);
    this.direction = direction;
    this.missed = false;
  }

  static realFrom(source: SpriteSource, direction: Direction, options?: IBaseTextureOptions): ArrowSprite {
    var texture = source instanceof Texture ? source : Texture.from(source, options);
    return new ArrowSprite(texture, direction);
  }
}

export class TargetArrowSprite extends ArrowSprite {
  defaultTexture: Texture;
  hitTexture: Texture;
  timer: ReturnType<typeof setTimeout>;

  private static arrows = Object.fromEntries(DIRECTIONS.map(
    (direction) => [direction.name, TargetArrowSprite.createArrow(direction)]));
  static DEFAULT_TIMEOUT = 300;

  constructor(defaultTexture: Texture, hitTexture: Texture, direction: Direction) {
    super(defaultTexture, direction);
    this.defaultTexture = defaultTexture;
    this.hitTexture = hitTexture;
    this.timer = undefined;
  }

  private static createArrow(direction: Direction) {
    const deafultTexture = Texture.from(ARROW_PATH);
    const hitTexture = Texture.from(ARROW_HIT_PATH); 

    return new TargetArrowSprite(deafultTexture, hitTexture, direction);
  }

  static create() {
    TargetArrowSprite.arrows = Object.fromEntries(DIRECTIONS.map(
      (direction) => [direction.name, TargetArrowSprite.createArrow(direction)]));
  }

  static get(direction: Direction) {
    return TargetArrowSprite.arrows[direction.name];
  }

  static clearHit() {
    for (const direction of DIRECTIONS) {
      TargetArrowSprite.arrows[direction.name].clearHit();
    }
  }

  private clearHit() {
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