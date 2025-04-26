import {CagedPosition} from "../types.ts";

export interface ScaleMode {
  charlie(): CagedPosition;
  alpha(): CagedPosition;
  golf(): CagedPosition;
  echo(): CagedPosition;
  delta(): CagedPosition;
  name(): string;
  pattern(): number[];
  type(): 'major'|'minor';
}