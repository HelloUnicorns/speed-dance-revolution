import { HIT_MESSAGES, MISS_MESSAGES } from '../consts';
import { getRandomInt } from './random';

export const getMissMessage = (): string => {
  const index = getRandomInt(0, MISS_MESSAGES.length);
  return MISS_MESSAGES[index];
};
