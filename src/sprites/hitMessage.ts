import { Text } from 'pixi.js';

export class HitMessage extends Text {
  timeout = 0;
  timeRemaining = 0;
  static DEFAULT_TIMEOUT = 200;
  setMessage(text: string, color: number, timeout: number = HitMessage.DEFAULT_TIMEOUT) {
    this.text = text;
    this.style.fill = color;
    this.alpha = 1;
    this.timeout = timeout;
    this.timeRemaining = timeout;
  }

  update(delta: number) {
    if (this.timeRemaining === 0) return;
    this.timeRemaining = Math.max(0, this.timeRemaining - delta);
    this.alpha = this.timeRemaining / this.timeout;
  }
}
