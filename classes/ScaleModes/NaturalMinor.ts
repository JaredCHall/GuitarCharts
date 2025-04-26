import {CagedPosition} from "$classes/types.ts";
import {ScaleMode} from "./ScaleModeInterface.ts";

export class NaturalMinor implements ScaleMode {

  name(): string {
    return 'Natural Minor'
  }

  type(): 'major'|'minor' {
    return 'minor'
  }

  pattern(): number[] {
    return [2, 1, 2, 2, 1, 2, 2];
  }

  charlie(): CagedPosition {
    return [
      [null, '4', null, '5', '♭6'],
      [null, '♭7', null, '1', null],
      ['2', '♭3', null, '4', null],
      ['5', '♭6', null, '♭7', null],
      [null ,'1' , null ,'2' , '♭3'],
      [null, '4', null, '5', '♭6'],
    ]
  }

  alpha(): CagedPosition {
    return [
      ['5', '♭6', null, '♭7', null],
      ['1', null,'2', '♭3', null],
      ['4', null, '5', '♭6', null],
      ['♭7', null, '1', null, null],
      ['2', '♭3', null, '4', null],
      ['5', '♭6', null, '♭7', null],
    ]
  }

  golf(): CagedPosition {
    return [
      [null, null, '♭7', null, '1'],
      ['2', '♭3', null, '4', null],
      ['5', '♭6', null, '♭7', null],
      ['1', null, '2', '♭3', null],
      [null, '4', null, '5', '♭6'],
      [null, null, '♭7', null, '1'],
    ]
  }

  echo(): CagedPosition {
    return [
      [null ,'1' , null ,'2' , '♭3'],
      [null ,'4' , null ,'5' , '♭6'],
      [null, '♭7', null, '1', null],
      ['2', '♭3', null, '4', null],
      [null,'5', '♭6', null, '♭7'],
      [null ,'1' , null ,'2' , '♭3'],
    ]
  }

  delta(): CagedPosition {
    return [
      ['2', '♭3', null, '4', null],
      ['5', '♭6', null, '♭7', null],
      ['1', null, '2', '♭3', null],
      ['4', null, '5', '♭6', null],
      [null, '♭7', null, '1', null],
      ['2', '♭3', null, '4', null],
    ]
  }
}