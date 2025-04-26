export class CagedNote {
  constructor(
      readonly interval: string,
      readonly string: number,
      readonly fret: number,
  ) {

  }

  getIntervalIndex(): number {
    switch(this.interval) {
      case '1': return 0
      case '♭2': return 1;
      case '2': return 2;
      case '♭3': return 3;
      case '4': return 4;
      case '♭5': return 5;
      case '5': return 6;
      case '♭6': return 7;
      case '6': return 9;
      case '♭7': return 10;
      case '7': return 11;
      default: throw new Error(`Invalid interval: ${this.interval}`);
    }
  }

}