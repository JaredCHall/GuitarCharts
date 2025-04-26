import {CagedPosition} from "$classes/types.ts";
import {ScaleMode} from "./ScaleModeInterface.ts";

export class MajorPentatonic implements ScaleMode {

  name(): string {
    return 'Major Pentatonic'
  }

  type(): 'major'|'minor' {
    return 'major'
  }

  pattern(): number[] {
    return [2, 2, 3, 2, 3];
  }

  charlie(): CagedPosition {
    return [
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
      ['2', null, '3', null, null],
      ['5', null, '6', null, null],
      [null ,'1' , null ,'2' , null],
      ['3' ,null , null ,'5' , null],
    ]
  }

  alpha(): CagedPosition {
    return [
      [null, '5', null, '6', null],
      [null, '1', null, '2', null],
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
      [null, '2', null, '3', null],
      [null, '5', null, '6', null],
    ]
  }

  golf(): CagedPosition {
    return [
      ['6', null, null, '1', null],
      ['2', null, '3', null, null],
      ['5', null, '6', null, null],
      ['1', null, '2', null, null],
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
    ]
  }

  echo(): CagedPosition {
    return [
      [null, '1', null, '2', null],
      ['3', null, null, '5', null],
      ['6', null, null, '1', null],
      ['2', null, '3', null, null],
      [null, '5', null, '6', null],
      [null, '1', null, '2', null],
    ]
  }

  delta(): CagedPosition {
    return [
      [null, '2', null, '3', null],
      [null, '5', null, '6', null],
      [null, '1', null, '2', null],
      ['3', null, null, '5', null],
      [null, '6', null, null, '1'],
      [null, '2', null, '3', null],
    ]
  }
}