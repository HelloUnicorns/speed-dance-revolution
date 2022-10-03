export class Statistics {
  score = 0;
  miss = 0;
  ok = 0;
  good = 0;
  great = 0;
  perfect = 0;
  maxCombo = 0;

  noteIncrease(message: string) {
    switch(message) {
      case 'O.K.':
        this.ok += 1;
        break;
      case 'Good':
        this.good += 1;
        break;
      case 'Great!':
        this.great += 1;
        break;
      case 'PERFECT!':
        this.perfect += 1;
        break;
      default:
        this.miss += 1;
        break;
    }
  }
}