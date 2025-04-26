import {CagedNote} from "./CagedNote.ts";


export class CagePositionFinder {

  getStartFret(position: string, key: string, cagedNotes: CagedNote[]): number {
    const stringTunings = ["E", "A", "D", "G", "B", "E"]; // Standard tuning

    // Map note names to semitone numbers relative to C
    const noteToSemitone: Record<string, number> = {
      C: 0, "C#": 1, Db: 1,
      D: 2, "D#": 3, Eb: 3,
      E: 4, F: 5, "F#": 6, Gb: 6,
      G: 7, "G#": 8, Ab: 8,
      A: 9, "A#": 10, Bb: 10,
      B: 11,
    };

    const keySemitone = noteToSemitone[key];

    if (keySemitone === undefined) {
      throw new Error(`Invalid key: ${key}`);
    }

    const possibleStartFrets: number[] = [];

    for (const note of cagedNotes) {
      if (note.interval !== "1") continue;

      const tuningNote = stringTunings[note.string];
      const tuningSemitone = noteToSemitone[tuningNote];

      if (tuningSemitone === undefined) continue;

      // We want:
      // tuningSemitone + (startFret + note.fret) ≡ keySemitone mod 12
      // => startFret ≡ (keySemitone - tuningSemitone - note.fret) mod 12
      const rawFret = (keySemitone - tuningSemitone - note.fret + 12 * 2) % 12;

      possibleStartFrets.push(rawFret);
    }

    if (possibleStartFrets.length === 0) return 0;

    return Math.min(...possibleStartFrets);
  }

  getScale(mode: string, position: string): CagedNote[] {
    switch (mode) {
      case "Major Scale":
        return this.getMajorScale(position);
      case "Natural Minor":
        return this.getNaturalMinor(position);
      case "Major Pentatonic":
        return this.getMajorPentatonic(position);
      case "Minor Pentatonic":
        return this.getMinorPentatonic(position);
      case "Major Blues":
        return this.getMajorBlues(position);
      case "Minor Blues":
        return this.getMinorBlues(position);
      default:
        throw new Error(`Unknown scale mode: ${mode}`);
    }
  }

  getMinorBlues(position: string): CagedNote[] {
    switch (position) {
      case 'C':
        return [
          new CagedNote('4',0,1),
          new CagedNote('♭5',0,2),
          new CagedNote('5',0,3),
          new CagedNote('♭7',1,3),
          new CagedNote('1',1,4),
          new CagedNote('♭3',2,1),
          new CagedNote('4',2,3),
          new CagedNote('♭5',2,4),
          new CagedNote('5',3,0),
          new CagedNote('♭7',3,3),
          new CagedNote('1',4,1),
          new CagedNote('♭3',4,4),
          new CagedNote('4',5,1),
          new CagedNote('♭5',5,2),
          new CagedNote('5',5,3),
        ]
      case 'A':
        return [
          new CagedNote('5',0,0),
          new CagedNote('♭7',0,3),
          new CagedNote('1',1,0),
          new CagedNote('♭3',1,3),
          new CagedNote('4',2,0),
          new CagedNote('♭5',2,1),
          new CagedNote('5',2,2),
          new CagedNote('♭7',3,0),
          new CagedNote('1',3,1),
          new CagedNote('♭3',4,1),
          new CagedNote('4',4,3),
          new CagedNote('♭5',4,4),
          new CagedNote('5',5,0),
          new CagedNote('♭7',5,3),
        ]
      case 'G':
        return [
          new CagedNote('♭7',0,1),
          new CagedNote('1',0,3),
          new CagedNote('♭3',1,1),
          new CagedNote('4',1,3),
          new CagedNote('♭5',1,4),
          new CagedNote('5',2,0),
          new CagedNote('♭7',2,3),
          new CagedNote('1',3,0),
          new CagedNote('♭3',3,3),
          new CagedNote('4',4,1),
          new CagedNote('♭5',4,2),
          new CagedNote('5',4,3),
          new CagedNote('♭7',5,1),
          new CagedNote('1',5,3),
        ]
      case 'E':
        return [
          new CagedNote('1',0,0),
          new CagedNote('♭3',0,3),
          new CagedNote('4',1,0),
          new CagedNote('♭5',1,1),
          new CagedNote('5',1,2),
          new CagedNote('♭7',2,0),
          new CagedNote('1',2,2),
          new CagedNote('♭3',3,0),
          new CagedNote('4',3,2),
          new CagedNote('♭5',3,3),
          new CagedNote('5',4,0),
          new CagedNote('♭7',4,3),
          new CagedNote('1',5,0),
          new CagedNote('♭3',5,3),
        ]
      case 'D':
        return [
          new CagedNote('♭3',0,1),
          new CagedNote('4',0,3),
          new CagedNote('♭5',0,4),
          new CagedNote('5',1,0),
          new CagedNote('♭7',1,3),
          new CagedNote('1',2,0),
          new CagedNote('♭3',2,3),
          new CagedNote('4',3,0),
          new CagedNote('♭5',3,1),
          new CagedNote('5',3,2),
          new CagedNote('♭7',4,1),
          new CagedNote('1',4,3),
          new CagedNote('♭3',5,1),
          new CagedNote('4',5,3),
          new CagedNote('♭5',5,4),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getMajorBlues(position: string): CagedNote[] {
    switch (position) {
      case 'C':
      return [
        new CagedNote('3',0,0),
        new CagedNote('5',0,3),
        new CagedNote('6',1,0),
        new CagedNote('1',1,3),
        new CagedNote('2',2,0),
        new CagedNote('3',2,1),
        new CagedNote('♭3',2,2),
        new CagedNote('5',3,0),
        new CagedNote('6',3,2),
        new CagedNote('1',4,1),
        new CagedNote('2',4,3),
        new CagedNote('♭3',4,4),
        new CagedNote('3',5,0),
        new CagedNote('5',5,3),
      ]
      case 'A':
        return [
          new CagedNote('5',0,1),
          new CagedNote('6',0,3),
          new CagedNote('1',1,1),
          new CagedNote('2',1,3),
          new CagedNote('♭3',1,4),
          new CagedNote('3',2,0),
          new CagedNote('5',2,3),
          new CagedNote('6',3,0),
          new CagedNote('1',3,3),
          new CagedNote('2',4,1),
          new CagedNote('♭3',4,2),
          new CagedNote('3',4,3),
          new CagedNote('5',5,1),
          new CagedNote('6',5,3),
        ]
      case 'G':
        return [
          new CagedNote('6',0,0),
          new CagedNote('1',0,3),
          new CagedNote('2',1,0),
          new CagedNote('♭3',1,1),
          new CagedNote('3',1,2),
          new CagedNote('5',2,0),
          new CagedNote('6',2,2),
          new CagedNote('1',3,0),
          new CagedNote('2',3,2),
          new CagedNote('♭3',3,3),
          new CagedNote('3',4,0),
          new CagedNote('5',4,3),
          new CagedNote('6',5,0),
          new CagedNote('1',5,3),
        ]
      case 'E':
        return [
          new CagedNote('1',0,1),
          new CagedNote('2',0,3),
          new CagedNote('♭3',0,4),
          new CagedNote('3',1,0),
          new CagedNote('5',1,3),
          new CagedNote('6',2,0),
          new CagedNote('1',2,3),
          new CagedNote('2',3,0),
          new CagedNote('♭3',3,1),
          new CagedNote('3',3,2),
          new CagedNote('5',4,1),
          new CagedNote('6',4,3),
          new CagedNote('1',5,1),
          new CagedNote('2',5,3),
        ]
      case 'D':
        return [
          new CagedNote('2',0,1),
          new CagedNote('♭3',0,2),
          new CagedNote('3',0,3),
          new CagedNote('5',1,3),
          new CagedNote('6',1,4),
          new CagedNote('1',2,1),
          new CagedNote('2',2,3),
          new CagedNote('♭3',2,4),
          new CagedNote('3',3,0),
          new CagedNote('5',3,3),
          new CagedNote('6',4,1),
          new CagedNote('1',4,4),
          new CagedNote('2',5,1),
          new CagedNote('♭3',5,2),
          new CagedNote('3',5,3),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getMinorPentatonic(position: string): CagedNote[] {
    switch (position) {
      case 'C':
        return [
          new CagedNote('4',0,1),
          new CagedNote('5',0,3),
          new CagedNote('♭7',1,1),
          new CagedNote('1',1,3),
          new CagedNote('♭3',2,1),
          new CagedNote('4',2,3),
          new CagedNote('5',3,0),
          new CagedNote('♭7',3,3),
          new CagedNote('1',4,1),
          new CagedNote('♭3',4,4),
          new CagedNote('4',5,1),
          new CagedNote('5',5,3),
        ]
      case 'A':
        return [
          new CagedNote('5',0,0),
          new CagedNote('♭7',0,3),
          new CagedNote('1',1,0),
          new CagedNote('♭3',1,3),
          new CagedNote('4',2,0),
          new CagedNote('5',2,2),
          new CagedNote('♭7',3,0),
          new CagedNote('1',3,2),
          new CagedNote('♭3',4,1),
          new CagedNote('4',4,3),
          new CagedNote('5',5,0),
          new CagedNote('♭7',5,3),
        ]
      case 'G':
        return [
          new CagedNote('♭7',0,1),
          new CagedNote('1',0,3),
          new CagedNote('♭3',1,1),
          new CagedNote('4',1,3),
          new CagedNote('5',2,0),
          new CagedNote('♭7',2,3),
          new CagedNote('1',3,0),
          new CagedNote('♭3',3,3),
          new CagedNote('4',4,1),
          new CagedNote('5',4,3),
          new CagedNote('♭7',5,1),
          new CagedNote('1',5,3),
        ]
      case 'E':
        return [
          new CagedNote('1',0,0),
          new CagedNote('♭3',0,3),
          new CagedNote('4',1,0),
          new CagedNote('5',1,2),
          new CagedNote('♭7',2,0),
          new CagedNote('1',2,2),
          new CagedNote('♭3',3,0),
          new CagedNote('4',3,2),
          new CagedNote('5',4,0),
          new CagedNote('♭7',4,3),
          new CagedNote('1',5,0),
          new CagedNote('♭3',5,3),
        ]
      case 'D':
        return [
          new CagedNote('♭3',0,1),
          new CagedNote('4',0,3),
          new CagedNote('5',1,0),
          new CagedNote('♭7',1,3),
          new CagedNote('1',2,0),
          new CagedNote('♭3',2,3),
          new CagedNote('4',3,0),
          new CagedNote('5',3,2),
          new CagedNote('♭7',4,1),
          new CagedNote('1',4,3),
          new CagedNote('♭3',5,1),
          new CagedNote('4',5,3),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getMajorPentatonic(position: string): CagedNote[] {
    switch (position) {
      case 'C':
        return [
          new CagedNote('3',0,0),
          new CagedNote('5',0,3),
          new CagedNote('6',1,0),
          new CagedNote('1',1,3),
          new CagedNote('2',2,0),
          new CagedNote('3',2,2),
          new CagedNote('5',3,0),
          new CagedNote('6',3,2),
          new CagedNote('1',4,1),
          new CagedNote('2',4,3),
          new CagedNote('3',5,0),
          new CagedNote('5',5,3),
        ]
      case 'A':
        return [
          new CagedNote('5',0,1),
          new CagedNote('6',0,3),
          new CagedNote('1',1,1),
          new CagedNote('2',1,3),
          new CagedNote('3',2,0),
          new CagedNote('5',2,3),
          new CagedNote('6',3,0),
          new CagedNote('1',3,3),
          new CagedNote('2',4,1),
          new CagedNote('3',4,3),
          new CagedNote('5',5,1),
          new CagedNote('6',5,3),
        ]
      case 'G':
        return [
          new CagedNote('6',0,0),
          new CagedNote('1',0,3),
          new CagedNote('2',1,0),
          new CagedNote('3',1,2),
          new CagedNote('5',2,0),
          new CagedNote('6',2,2),
          new CagedNote('1',3,0),
          new CagedNote('2',3,2),
          new CagedNote('3',4,0),
          new CagedNote('5',4,3),
          new CagedNote('6',5,0),
          new CagedNote('1',5,3),
        ]
      case 'E':
        return [
          new CagedNote('1',0,1),
          new CagedNote('2',0,3),
          new CagedNote('3',1,0),
          new CagedNote('5',1,3),
          new CagedNote('6',2,0),
          new CagedNote('1',2,3),
          new CagedNote('2',3,0),
          new CagedNote('3',3,2),
          new CagedNote('5',4,1),
          new CagedNote('6',4,3),
          new CagedNote('1',5,1),
          new CagedNote('2',5,3),
        ]
      case 'D':
        return [
          new CagedNote('2',0,1),
          new CagedNote('3',0,3),
          new CagedNote('5',1,1),
          new CagedNote('6',1,3),
          new CagedNote('1',2,1),
          new CagedNote('2',2,3),
          new CagedNote('3',3,0),
          new CagedNote('5',3,3),
          new CagedNote('6',4,1),
          new CagedNote('1',4,4),
          new CagedNote('2',5,1),
          new CagedNote('3',5,3),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getNaturalMinor(position: string): CagedNote[] {
      switch (position) {
        case 'C':
          return [
            new CagedNote('4',0,1),
            new CagedNote('5',0,3),
            new CagedNote('♭6',0,4),
            new CagedNote('♭7',1,3),
            new CagedNote('1',1,4),
            new CagedNote('2',2,0),
            new CagedNote('♭3',2,1),
            new CagedNote('4',2,3),
            new CagedNote('5',3,0),
            new CagedNote('♭6',3,1),
            new CagedNote('♭7',3,3),
            new CagedNote('1',4,1),
            new CagedNote('2',4,3),
            new CagedNote('♭3',4,4),
            new CagedNote('4',5,1),
            new CagedNote('5',5,3),
            new CagedNote('♭6',5,4),
          ]
        case 'A':
          return [
            new CagedNote('5',0,0),
            new CagedNote('♭6',0,1),
            new CagedNote('♭7',0,3),
            new CagedNote('1',1,0),
            new CagedNote('2',1,2),
            new CagedNote('♭3',1,3),
            new CagedNote('4',2,0),
            new CagedNote('5',2,2),
            new CagedNote('♭6',2,3),
            new CagedNote('♭7',3,0),
            new CagedNote('1',3,2),
            new CagedNote('2',4,0),
            new CagedNote('♭3',4,1),
            new CagedNote('4',4,3),
            new CagedNote('5',5,0),
            new CagedNote('♭6',5,1),
            new CagedNote('♭7',5,3),
          ]
        case 'G':
          return [
            new CagedNote('♭7',0,1),
            new CagedNote('1',0,3),
            new CagedNote('2',1,0),
            new CagedNote('♭3',1,1),
            new CagedNote('4',1,3),
            new CagedNote('5',2,0),
            new CagedNote('♭6',2,1),
            new CagedNote('♭7',2,3),
            new CagedNote('1',3,0),
            new CagedNote('2',3,2),
            new CagedNote('♭3',3,3),
            new CagedNote('4',4,1),
            new CagedNote('5',4,3),
            new CagedNote('♭6',4,4),
            new CagedNote('♭7',5,1),
            new CagedNote('1',5,3),
          ]
        case 'E':
          return [
            new CagedNote('1',0,1),
            new CagedNote('2',0,3),
            new CagedNote('♭3',0,4),
            new CagedNote('4',1,1),
            new CagedNote('5',1,3),
            new CagedNote('♭6',1,4),
            new CagedNote('♭7',2,1),
            new CagedNote('1',2,3),
            new CagedNote('2',3,0),
            new CagedNote('♭3',3,1),
            new CagedNote('4',3,3),
            new CagedNote('5',4,1),
            new CagedNote('♭6',4,2),
            new CagedNote('♭7',4,4),
            new CagedNote('1',5,1),
            new CagedNote('2',5,3),
            new CagedNote('♭3',5,4),
          ]
        case 'D':
          return [
            new CagedNote('2',0,0),
            new CagedNote('♭3',0,1),
            new CagedNote('4',0,3),
            new CagedNote('5',1,0),
            new CagedNote('♭6',1,1),
            new CagedNote('♭7',1,3),
            new CagedNote('1',2,0),
            new CagedNote('2',2,2),
            new CagedNote('♭3',2,3),
            new CagedNote('4',3,0),
            new CagedNote('5',3,2),
            new CagedNote('♭6',3,3),
            new CagedNote('♭7',4,0),
            new CagedNote('1',4,3),
            new CagedNote('2',5,0),
            new CagedNote('♭3',5,1),
            new CagedNote('4',5,3),
          ]
      }

    throw new Error('unknown position: ' + position);
  }

  getMajorScale(position: string): CagedNote[]
  {
    switch (position) {
      case 'C':
        return [
          new CagedNote('3',0,0),
          new CagedNote('4',0,1),
          new CagedNote('5',0,3),
          new CagedNote('6',1,0),
          new CagedNote('7',1,2),
          new CagedNote('1',1,3),
          new CagedNote('2',2,0),
          new CagedNote('3',2,2),
          new CagedNote('4',2,3),
          new CagedNote('5',3,0),
          new CagedNote('6',3,1),
          new CagedNote('7',4,0),
          new CagedNote('1',4,1),
          new CagedNote('2',4,3),
          new CagedNote('3',5,0),
          new CagedNote('4',5,1),
          new CagedNote('5',5,3),
        ]
      case 'A':
        return [
          new CagedNote('5',0,1),
          new CagedNote('6',0,3),
          new CagedNote('7',1,0),
          new CagedNote('1',1,1),
          new CagedNote('2',1,3),
          new CagedNote('3',2,0),
          new CagedNote('4',2,1),
          new CagedNote('5',2,3),
          new CagedNote('6',3,0),
          new CagedNote('7',3,2),
          new CagedNote('1',3,3),
          new CagedNote('2',4,1),
          new CagedNote('3',4,3),
          new CagedNote('4',4,4),
          new CagedNote('5',5,1),
          new CagedNote('6',5,3),
        ]
      case 'G':
        return [
          new CagedNote('6',0,1),
          new CagedNote('7',0,3),
          new CagedNote('1',0,4),
          new CagedNote('2',1,1),
          new CagedNote('3',1,3),
          new CagedNote('4',1,4),
          new CagedNote('5',2,1),
          new CagedNote('6',2,3),
          new CagedNote('7',3,0),
          new CagedNote('1',3,1),
          new CagedNote('2',3,3),
          new CagedNote('3',4,1),
          new CagedNote('4',4,2),
          new CagedNote('5',4,4),
          new CagedNote('6',5,1),
          new CagedNote('7',5,3),
          new CagedNote('1',5,4),
        ]
      case 'E':
        return [
          new CagedNote('7',0,0),
          new CagedNote('1',0,1),
          new CagedNote('2',0,3),
          new CagedNote('3',1,0),
          new CagedNote('4',1,1),
          new CagedNote('5',1,3),
          new CagedNote('6',2,0),
          new CagedNote('7',2,2),
          new CagedNote('1',2,3),
          new CagedNote('2',3,0),
          new CagedNote('3',3,2),
          new CagedNote('4',3,3),
          new CagedNote('5',4,1),
          new CagedNote('6',4,3),
          new CagedNote('7',5,0),
          new CagedNote('1',5,1),
          new CagedNote('2',5,3),
        ]
      case 'D':
        return [
          new CagedNote('2',0,1),
          new CagedNote('3',0,3),
          new CagedNote('4',0,4),
          new CagedNote('5',1,1),
          new CagedNote('6',1,4),
          new CagedNote('7',2,0),
          new CagedNote('1',2,1),
          new CagedNote('2',2,3),
          new CagedNote('3',3,0),
          new CagedNote('4',3,1),
          new CagedNote('5',3,3),
          new CagedNote('6',4,1),
          new CagedNote('7',4,3),
          new CagedNote('1',4,4),
          new CagedNote('2',5,1),
          new CagedNote('3',5,3),
          new CagedNote('4',5,4),
        ]
    }

    throw new Error('unknown position: ' + position);

  }


}