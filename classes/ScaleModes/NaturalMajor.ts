import {CagedPosition} from "$classes/types.ts";
import {ScaleMode} from "./ScaleModeInterface.ts";

export class NaturalMajor implements ScaleMode{

  name(): string {
    return 'Major Scale'
  }

  type(): 'major'|'minor' {
    return 'major'
  }

  pattern(): number[] {
    return [2, 2, 1, 2, 2, 2, 1];
  }

  charlie(): CagedPosition {
    return [
      ['3', '4', null, '5', null],
      ['6', null, '7', '1', null],
      ['2', null, '3', '4', null],
      ['5', null, '6', null, null],
      ['7' ,'1' , null ,'2' , null],
      ['3' ,'4' , null ,'5' , null],
    ]
  }

  alpha(): CagedPosition {
    return [
      [null, '5', null, '6', null],
      ['7', '1', null, '2', null],
      ['3', '4', null, '5', null],
      ['6', null, '7', '1', null],
      [null, '2', null, '3', '4'],
      [null, '6', null, '6', null],
    ]
  }

  golf(): CagedPosition {
    return [
      [null, '6', null, '7', '1'],
      [null, '2', null, '3', '4'],
      [null, '5', null, '6', null],
      ['7', '1', null, '2', null],
      [null, '3', '4', null, '5'],
      [null, '6', null, '7', '1'],
    ]
  }

  echo(): CagedPosition {
    return [
      ['7', '1', null, '2', null],
      ['3', '4', null, '5', null],
      ['6', null, '7', '1', null],
      ['2', null, '3', '4', null],
      [null, '5', null, '6', null],
      ['7', '1', null, '2', null],
    ]
  }

  delta(): CagedPosition {
    return [
      [null, '2', null, '3', '4'],
      [null, '5', null, null, '6'],
      ['7', '1', null, '2', null],
      ['3', '4', null, '5', null],
      [null, '6', null, '7', '1'],
      [null, '2', null, '3', '4'],
    ]
  }
}