import {CagedNote} from "./CagedNote.ts";


export class CagePositionFinder {

  getMinorBlues(position: string): CagedNote[] {
    switch (position) {
      case 'C':
        return [
          new CagedNote('4',0,2),
          new CagedNote('♭5',0,3),
          new CagedNote('5',0,4),
          new CagedNote('♭7',1,4),
          new CagedNote('1',1,5),
          new CagedNote('♭3',2,2),
          new CagedNote('4',2,4),
          new CagedNote('♭5',2,5),
          new CagedNote('5',3,1),
          new CagedNote('♭7',3,4),
          new CagedNote('1',4,2),
          new CagedNote('♭3',4,5),
          new CagedNote('4',5,2),
          new CagedNote('♭5',5,3),
          new CagedNote('5',5,4),
        ]
      case 'A':
        return [
          new CagedNote('5',0,1),
          new CagedNote('♭7',0,4),
          new CagedNote('1',1,1),
          new CagedNote('♭3',1,4),
          new CagedNote('4',2,1),
          new CagedNote('♭5',2,2),
          new CagedNote('5',2,3),
          new CagedNote('♭7',3,1),
          new CagedNote('1',3,3),
          new CagedNote('♭3',4,2),
          new CagedNote('4',4,4),
          new CagedNote('♭5',4,5),
          new CagedNote('5',5,1),
          new CagedNote('♭7',5,4),
        ]
      case 'G':
        return [
          new CagedNote('♭7',0,2),
          new CagedNote('1',0,4),
          new CagedNote('♭3',1,2),
          new CagedNote('4',1,4),
          new CagedNote('♭5',1,5),
          new CagedNote('5',2,1),
          new CagedNote('♭7',2,4),
          new CagedNote('1',3,1),
          new CagedNote('♭3',3,4),
          new CagedNote('4',4,2),
          new CagedNote('♭5',4,3),
          new CagedNote('5',4,4),
          new CagedNote('♭7',5,2),
          new CagedNote('1',5,4),
        ]
      case 'E':
        return [
          new CagedNote('1',0,2),
          new CagedNote('♭3',0,5),
          new CagedNote('4',1,2),
          new CagedNote('♭5',1,3),
          new CagedNote('5',1,4),
          new CagedNote('♭7',2,2),
          new CagedNote('1',2,4),
          new CagedNote('♭3',3,2),
          new CagedNote('4',3,4),
          new CagedNote('♭5',3,5),
          new CagedNote('5',4,2),
          new CagedNote('♭7',4,5),
          new CagedNote('1',5,2),
          new CagedNote('♭3',5,5),
        ]
      case 'D':
        return [
          new CagedNote('♭3',0,2),
          new CagedNote('4',0,4),
          new CagedNote('♭5',0,5),
          new CagedNote('5',1,1),
          new CagedNote('♭7',1,4),
          new CagedNote('1',2,1),
          new CagedNote('♭3',2,4),
          new CagedNote('4',3,1),
          new CagedNote('♭5',3,2),
          new CagedNote('5',3,3),
          new CagedNote('♭7',4,2),
          new CagedNote('1',4,4),
          new CagedNote('♭3',5,2),
          new CagedNote('4',5,4),
          new CagedNote('♭5',5,5),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getMajorBlues(position: string): CagedNote[] {
    switch (position) {
      case 'C':
      return [
        new CagedNote('3',0,1),
        new CagedNote('5',0,4),
        new CagedNote('6',1,1),
        new CagedNote('1',1,4),
        new CagedNote('2',2,1),
        new CagedNote('3',2,2),
        new CagedNote('♭3',2,3),
        new CagedNote('5',3,1),
        new CagedNote('6',3,3),
        new CagedNote('1',4,2),
        new CagedNote('2',4,4),
        new CagedNote('♭3',4,5),
        new CagedNote('3',5,1),
        new CagedNote('5',5,4),
      ]
      case 'A':
        return [
          new CagedNote('5',0,2),
          new CagedNote('6',0,4),
          new CagedNote('1',1,2),
          new CagedNote('2',1,4),
          new CagedNote('♭3',1,5),
          new CagedNote('3',2,1),
          new CagedNote('5',2,4),
          new CagedNote('6',3,1),
          new CagedNote('1',3,4),
          new CagedNote('2',4,2),
          new CagedNote('♭3',4,3),
          new CagedNote('3',4,4),
          new CagedNote('5',5,2),
          new CagedNote('6',5,4),
        ]
      case 'G':
        return [
          new CagedNote('6',0,2),
          new CagedNote('1',0,5),
          new CagedNote('2',1,2),
          new CagedNote('♭3',1,3),
          new CagedNote('3',1,4),
          new CagedNote('5',2,2),
          new CagedNote('6',2,4),
          new CagedNote('1',3,2),
          new CagedNote('2',3,4),
          new CagedNote('♭3',3,5),
          new CagedNote('3',4,2),
          new CagedNote('5',4,5),
          new CagedNote('6',5,2),
          new CagedNote('1',5,5),
        ]
      case 'E':
        return [
          new CagedNote('1',0,2),
          new CagedNote('2',0,4),
          new CagedNote('♭3',0,5),
          new CagedNote('3',1,1),
          new CagedNote('5',1,4),
          new CagedNote('6',2,1),
          new CagedNote('1',2,4),
          new CagedNote('2',3,1),
          new CagedNote('♭3',3,2),
          new CagedNote('3',3,3),
          new CagedNote('5',4,2),
          new CagedNote('6',4,4),
          new CagedNote('1',5,2),
          new CagedNote('2',5,4),
        ]
      case 'D':
        return [
          new CagedNote('2',0,2),
          new CagedNote('♭3',0,3),
          new CagedNote('3',0,4),
          new CagedNote('5',1,4),
          new CagedNote('6',1,5),
          new CagedNote('1',2,2),
          new CagedNote('2',2,4),
          new CagedNote('♭3',2,5),
          new CagedNote('3',3,1),
          new CagedNote('5',3,4),
          new CagedNote('6',4,2),
          new CagedNote('1',4,5),
          new CagedNote('2',5,2),
          new CagedNote('♭3',5,3),
          new CagedNote('3',5,4),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getMinorPentatonic(position: string): CagedNote[] {
    switch (position) {
      case 'C':
        return [
          new CagedNote('4',0,2),
          new CagedNote('5',0,4),
          new CagedNote('♭7',1,4),
          new CagedNote('1',1,5),
          new CagedNote('♭3',2,2),
          new CagedNote('4',2,4),
          new CagedNote('5',3,1),
          new CagedNote('♭7',3,4),
          new CagedNote('1',4,2),
          new CagedNote('♭3',4,5),
          new CagedNote('4',5,2),
          new CagedNote('5',5,4),
        ]
      case 'A':
        return [
          new CagedNote('5',0,1),
          new CagedNote('♭7',0,4),
          new CagedNote('1',1,1),
          new CagedNote('♭3',1,4),
          new CagedNote('4',2,1),
          new CagedNote('5',2,3),
          new CagedNote('♭7',3,1),
          new CagedNote('1',3,3),
          new CagedNote('♭3',4,2),
          new CagedNote('4',4,4),
          new CagedNote('5',5,1),
          new CagedNote('♭7',5,4),
        ]
      case 'G':
        return [
          new CagedNote('♭7',0,2),
          new CagedNote('1',0,4),
          new CagedNote('♭3',1,2),
          new CagedNote('4',1,4),
          new CagedNote('5',2,1),
          new CagedNote('♭7',2,4),
          new CagedNote('1',3,1),
          new CagedNote('♭3',3,4),
          new CagedNote('4',4,2),
          new CagedNote('5',4,4),
          new CagedNote('♭7',5,2),
          new CagedNote('1',5,4),
        ]
      case 'E':
        return [
          new CagedNote('1',0,2),
          new CagedNote('♭3',0,5),
          new CagedNote('4',1,2),
          new CagedNote('5',1,4),
          new CagedNote('♭7',2,2),
          new CagedNote('1',2,4),
          new CagedNote('♭3',3,2),
          new CagedNote('4',3,4),
          new CagedNote('5',4,2),
          new CagedNote('♭7',4,5),
          new CagedNote('1',5,2),
          new CagedNote('♭3',5,5),
        ]
      case 'D':
        return [
          new CagedNote('♭3',0,2),
          new CagedNote('4',0,4),
          new CagedNote('5',1,1),
          new CagedNote('♭7',1,4),
          new CagedNote('1',2,1),
          new CagedNote('♭3',2,4),
          new CagedNote('4',3,1),
          new CagedNote('5',3,3),
          new CagedNote('♭7',4,2),
          new CagedNote('1',4,4),
          new CagedNote('♭3',5,2),
          new CagedNote('4',5,4),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getMajorPentatonic(position: string): CagedNote[] {
    switch (position) {
      case 'C':
        return [
          new CagedNote('3',0,1),
          new CagedNote('5',0,4),
          new CagedNote('6',1,1),
          new CagedNote('1',1,4),
          new CagedNote('2',2,1),
          new CagedNote('3',2,3),
          new CagedNote('5',3,1),
          new CagedNote('6',3,3),
          new CagedNote('1',4,2),
          new CagedNote('2',4,4),
          new CagedNote('3',5,1),
          new CagedNote('5',5,4),
        ]
      case 'A':
        return [
          new CagedNote('5',0,2),
          new CagedNote('6',0,4),
          new CagedNote('1',1,2),
          new CagedNote('2',1,4),
          new CagedNote('3',2,1),
          new CagedNote('5',2,4),
          new CagedNote('6',3,1),
          new CagedNote('1',3,4),
          new CagedNote('2',4,2),
          new CagedNote('3',4,4),
          new CagedNote('5',5,2),
          new CagedNote('6',5,4),
        ]
      case 'G':
        return [
          new CagedNote('6',0,2),
          new CagedNote('1',0,5),
          new CagedNote('2',1,2),
          new CagedNote('3',1,4),
          new CagedNote('5',2,2),
          new CagedNote('6',2,4),
          new CagedNote('1',3,2),
          new CagedNote('2',3,4),
          new CagedNote('3',4,2),
          new CagedNote('5',4,5),
          new CagedNote('6',5,2),
          new CagedNote('1',5,5),
        ]
      case 'E':
        return [
          new CagedNote('1',0,2),
          new CagedNote('2',0,4),
          new CagedNote('3',1,1),
          new CagedNote('5',1,4),
          new CagedNote('6',2,1),
          new CagedNote('1',2,4),
          new CagedNote('2',3,1),
          new CagedNote('3',3,3),
          new CagedNote('5',4,2),
          new CagedNote('6',4,4),
          new CagedNote('1',5,2),
          new CagedNote('2',5,4),
        ]
      case 'D':
        return [
          new CagedNote('2',0,2),
          new CagedNote('3',0,4),
          new CagedNote('5',1,4),
          new CagedNote('6',1,5),
          new CagedNote('1',2,2),
          new CagedNote('2',2,4),
          new CagedNote('3',3,1),
          new CagedNote('5',3,4),
          new CagedNote('6',4,2),
          new CagedNote('1',4,5),
          new CagedNote('2',5,2),
          new CagedNote('3',5,4),
        ]
    }

    throw new Error('unknown position: ' + position);
  }

  getNaturalMinor(position: string): CagedNote[] {
      switch (position) {
        case 'C':
          return [
            new CagedNote('4',0,2),
            new CagedNote('5',0,4),
            new CagedNote('♭6',0,5),
            new CagedNote('♭7',1,4),
            new CagedNote('1',1,5),
            new CagedNote('2',2,1),
            new CagedNote('♭3',2,2),
            new CagedNote('4',2,4),
            new CagedNote('5',3,1),
            new CagedNote('♭6',3,2),
            new CagedNote('♭7',3,4),
            new CagedNote('1',4,2),
            new CagedNote('2',4,4),
            new CagedNote('♭3',4,5),
            new CagedNote('4',5,2),
            new CagedNote('5',5,4),
            new CagedNote('♭6',5,5),
          ]
        case 'A':
          return [
            new CagedNote('5',0,1),
            new CagedNote('♭6',0,2),
            new CagedNote('♭7',0,4),
            new CagedNote('1',1,1),
            new CagedNote('2',1,3),
            new CagedNote('♭3',1,4),
            new CagedNote('4',2,1),
            new CagedNote('5',2,3),
            new CagedNote('♭6',2,4),
            new CagedNote('♭7',3,1),
            new CagedNote('1',3,3),
            new CagedNote('2',4,1),
            new CagedNote('♭3',4,2),
            new CagedNote('4',4,4),
            new CagedNote('5',5,1),
            new CagedNote('♭6',5,2),
            new CagedNote('♭7',5,4),
          ]
        case 'G':
          return [
            new CagedNote('♭7',0,2),
            new CagedNote('1',0,4),
            new CagedNote('2',1,1),
            new CagedNote('♭3',1,2),
            new CagedNote('4',1,4),
            new CagedNote('5',2,1),
            new CagedNote('♭6',2,2),
            new CagedNote('♭7',2,4),
            new CagedNote('1',3,1),
            new CagedNote('2',3,3),
            new CagedNote('♭3',3,4),
            new CagedNote('4',4,2),
            new CagedNote('5',4,4),
            new CagedNote('♭6',4,5),
            new CagedNote('♭7',5,2),
            new CagedNote('1',5,4),
          ]
        case 'E':
          return [
            new CagedNote('1',0,2),
            new CagedNote('2',0,4),
            new CagedNote('♭3',0,5),
            new CagedNote('4',1,2),
            new CagedNote('5',1,4),
            new CagedNote('♭6',1,5),
            new CagedNote('♭7',2,2),
            new CagedNote('1',2,4),
            new CagedNote('2',3,1),
            new CagedNote('♭3',3,2),
            new CagedNote('4',3,4),
            new CagedNote('5',4,2),
            new CagedNote('♭6',4,3),
            new CagedNote('♭7',4,5),
            new CagedNote('1',5,2),
            new CagedNote('2',5,4),
            new CagedNote('♭3',5,5),
          ]
        case 'D':
          return [
            new CagedNote('2',0,1),
            new CagedNote('♭3',0,2),
            new CagedNote('4',0,4),
            new CagedNote('5',1,1),
            new CagedNote('♭6',1,2),
            new CagedNote('♭7',1,4),
            new CagedNote('1',2,1),
            new CagedNote('2',2,3),
            new CagedNote('♭3',2,4),
            new CagedNote('4',3,1),
            new CagedNote('5',3,3),
            new CagedNote('♭6',3,4),
            new CagedNote('♭7',4,2),
            new CagedNote('1',4,4),
            new CagedNote('2',5,1),
            new CagedNote('♭3',5,2),
            new CagedNote('4',5,4),
          ]
      }

    throw new Error('unknown position: ' + position);
  }

  getMajorScale(position: string): CagedNote[]
  {
    switch (position) {
      case 'C':
        return [
          new CagedNote('3',0,1),
          new CagedNote('4',0,2),
          new CagedNote('5',0,4),
          new CagedNote('6',1,1),
          new CagedNote('7',1,3),
          new CagedNote('1',1,4),
          new CagedNote('2',2,1),
          new CagedNote('3',2,3),
          new CagedNote('4',2,4),
          new CagedNote('5',3,1),
          new CagedNote('6',3,3),
          new CagedNote('7',4,1),
          new CagedNote('1',4,2),
          new CagedNote('2',4,4),
          new CagedNote('3',5,1),
          new CagedNote('4',5,2),
          new CagedNote('5',5,4),
        ]
      case 'A':
        return [
          new CagedNote('5',0,2),
          new CagedNote('6',0,4),
          new CagedNote('7',1,1),
          new CagedNote('1',1,2),
          new CagedNote('2',1,4),
          new CagedNote('3',2,1),
          new CagedNote('4',2,2),
          new CagedNote('5',2,4),
          new CagedNote('6',3,1),
          new CagedNote('7',3,3),
          new CagedNote('1',3,4),
          new CagedNote('2',4,2),
          new CagedNote('3',4,4),
          new CagedNote('4',4,5),
          new CagedNote('5',5,2),
          new CagedNote('6',5,4),
        ]
      case 'G':
        return [
          new CagedNote('6',0,2),
          new CagedNote('7',0,4),
          new CagedNote('1',0,5),
          new CagedNote('2',1,2),
          new CagedNote('3',1,4),
          new CagedNote('4',1,5),
          new CagedNote('5',2,2),
          new CagedNote('6',2,4),
          new CagedNote('7',3,1),
          new CagedNote('1',3,2),
          new CagedNote('2',3,4),
          new CagedNote('3',4,2),
          new CagedNote('4',4,3),
          new CagedNote('5',4,5),
          new CagedNote('6',5,2),
          new CagedNote('7',5,4),
          new CagedNote('1',5,5),
        ]
      case 'E':
        return [
          new CagedNote('7',0,1),
          new CagedNote('1',0,2),
          new CagedNote('2',0,4),
          new CagedNote('3',1,1),
          new CagedNote('4',1,2),
          new CagedNote('5',1,4),
          new CagedNote('6',2,1),
          new CagedNote('7',2,3),
          new CagedNote('1',2,4),
          new CagedNote('2',3,1),
          new CagedNote('3',3,3),
          new CagedNote('4',3,4),
          new CagedNote('5',4,2),
          new CagedNote('6',4,4),
          new CagedNote('7',5,1),
          new CagedNote('1',5,2),
          new CagedNote('2',5,4),
        ]
      case 'D':
        return [
          new CagedNote('2',0,2),
          new CagedNote('3',0,4),
          new CagedNote('4',0,5),
          new CagedNote('5',1,4),
          new CagedNote('6',1,5),
          new CagedNote('7',2,1),
          new CagedNote('1',2,2),
          new CagedNote('2',2,4),
          new CagedNote('3',3,1),
          new CagedNote('4',3,2),
          new CagedNote('5',3,4),
          new CagedNote('6',4,2),
          new CagedNote('7',4,4),
          new CagedNote('1',4,5),
          new CagedNote('2',5,2),
          new CagedNote('3',5,4),
          new CagedNote('4',5,5),
        ]
    }

    throw new Error('unknown position: ' + position);

  }


}