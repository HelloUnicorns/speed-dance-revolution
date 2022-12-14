import { Container, Sprite, Texture } from 'pixi.js';

export function createSlider(
  screenWidth: number,
  screenHeight: number,
  initialValue: number,
  valueChangeCallback: (newValue: number) => void,
): Container {
  const container = new Container();

  const bar = Sprite.from(Texture.WHITE);
  bar.tint = 0x3333ff;
  bar.width = screenWidth / 2;
  bar.height = screenHeight / 15;
  bar.anchor.set(0.5);
  container.addChild(bar);

  const button = Sprite.from(Texture.WHITE);
  button.name = 'no';
  button.width = bar.width / 20;
  button.height = bar.height * 1.2;

  const minPosition = -bar.width / 2 + button.width * 0.75;
  const maxPosition = bar.width / 2 - button.width * 0.75;

  button.anchor.set(0.5);
  button.position.x = (maxPosition - minPosition) * initialValue + minPosition;
  button.interactive = true;
  button.buttonMode = true;
  button
    .on('pointerdown', () => {
      button.name = 'yes';
    })
    .on('pointerup', () => {
      button.name = 'no';
    })
    .on('pointerupoutside', () => {
      button.name = 'no';
    })
    .on('pointermove', (event) => {
      if (button.name === 'yes') {
        const newPosition = event.data.getLocalPosition(container);
        button.position.x = Math.max(Math.min(newPosition.x, maxPosition), minPosition);
        const newValue = (button.position.x - minPosition) / (maxPosition - minPosition);
        valueChangeCallback(newValue);
      }
    });
  container.addChild(button);

  return container;
}
