import { Sprite, Texture } from 'pixi.js';

export function createCheckbox(initialValue: boolean, valueChangeCallback: (newValue: boolean) => void): Sprite {
  const onTexture = Texture.from('images/checkbox-on.png');
  const offTexture = Texture.from('images/checkbox-off.png');

  const checkbox = Sprite.from(initialValue ? onTexture : offTexture);
  checkbox.interactive = true;
  checkbox.buttonMode = true;
  checkbox.on('pointerdown', () => {
    checkbox.texture = checkbox.texture === offTexture ? onTexture : offTexture;
    valueChangeCallback(checkbox.texture === onTexture);
  });

  return checkbox;
}
