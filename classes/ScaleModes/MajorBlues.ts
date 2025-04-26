import {CagedPosition} from "$classes/types.ts";
import {ScaleMode} from "./ScaleModeInterface.ts";

export class MajorBlues implements ScaleMode {

  name(): string {
    return 'Major Blues'
  }

  type(): 'major'|'minor' {
    return 'major'
  }

  pattern(): number[] {
    return [2, 3, 1, 1, 3, 2];
  }

  charlie(): CagedPosition {
    return [
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
      ['2', '♭3', '3', null, null],
      ['5', null, '6', null, null],
      [null ,'1' , null ,'2' , '♭3'],
      ['3' ,null , null ,'5' , null],
    ]
  }

  alpha(): CagedPosition {
    return [
      [null, '5', null, '6', null],
      [null, '1', null, '2', '♭3'],
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
      [null, '2', '♭3', '3', null],
      [null, '6', null, '6', null],
    ]
  }

  golf(): CagedPosition {
    return [
      ['6', null, null, '1', null],
      ['2', '♭3', '3', null, null],
      ['5', null, '6', null, null],
      ['1', null, '2', '♭3', null],
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
    ]
  }

  echo(): CagedPosition {
    return [
      [null, '1', null, '2', '♭3'],
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
      ['2', '♭3', '3', null, null],
      [null, '5', null, '6', null],
      [null, '1', null, '2', '♭3'],
    ]
  }

  delta(): CagedPosition {
    return [
      [null, '2', '♭3', '3', null],
      [null, '5', null, '6', null],
      [null, '1', null, '2', '♭3'],
      ['3', null, null, '5', null],
      [null, '6', null, null, '1'],
      [null, '2', '♭3', '3', null],
    ]
  }
}