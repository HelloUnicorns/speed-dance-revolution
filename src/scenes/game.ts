import * as Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'images/phaser3-logo.png');
  }

  create() {
    const logo = this.add.image(400, 200, 'logo');

    this.tweens.add({
      targets: logo,
      y: 400,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}
