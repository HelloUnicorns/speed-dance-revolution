import { Container } from "pixi.js";

export abstract class Scene {
  container: Container;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.container = new Container();
    this.width =  width;
    this.height = height;
  }
}
