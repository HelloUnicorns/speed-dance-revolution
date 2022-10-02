import { Container } from "pixi.js";
import { Direction, DIRECTIONS } from "./arrow";
import { TargetArrowSprite } from "./targetArrow";

export class TargetArrowContainer extends Container {
  constructor() {
    super();
    for (const direction of DIRECTIONS) {
      const arrow = TargetArrowSprite.create(direction);
      arrow.name = direction.name;
      arrow.rotation = direction.rotation;
      this.addChild(arrow);
    }
  }

  clearHit() {
    for (const arrow of this.children as TargetArrowSprite[]) {
      arrow.clearHit();
    }
  }

  getChildByDirection(direction: Direction) {
    return this.getChildByName(direction.name);
  }
}
