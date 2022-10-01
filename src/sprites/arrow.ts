import { IBaseTextureOptions, PI_2, Resource, Sprite, SpriteSource, Texture } from 'pixi.js';

export interface Direction {
  order: number;
  name: string;
  rotation: number;
  color: number;
  key: string;
}

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
