import { HIT_MESSAGES, MISS_MESSAGES } from '../consts';
import { getRandomInt } from './random';

export const getHitMessage = (): string => {
  const index = getRandomInt(0, HIT_MESSAGES.length);
  return HIT_MESSAGES[index];
};
export const getMissMessage = (): string => {
  const index = getRandomInt(0, MISS_MESSAGES.length);
  return MISS_MESSAGES[index];
};
