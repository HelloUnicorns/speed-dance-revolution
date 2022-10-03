// App constants
export const APP_MARGIN = 8;
export const APP_HEIGHT = Math.min(window.innerHeight - 2 * APP_MARGIN, 720);
export const MAX_VOLUME = 0.16;

// Song acceleration constants
export const ACCELERATION_TIME_DELTA = 10;
export const ACCELERATION = 1.1;

// Arrow constants

export const ARROW_HEIGHT = APP_HEIGHT / 8;
export const TARGET_POSITION = APP_HEIGHT / 10;
export const ARROW_SPAWN = APP_HEIGHT + ARROW_HEIGHT;
export const HIT_MESSAGES: Array<string> = ['Good!', 'Great!', 'Epic!', 'Nice!', 'Good Work!', 'Accurate!'];
export const MISS_MESSAGES: Array<string> = ['Bummer', 'Not good', 'Incorrect', 'Next time', 'Bad', 'Inaccurate'];
