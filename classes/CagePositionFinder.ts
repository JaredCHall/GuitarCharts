import {CagedNote} from "./CagedNote.ts";
import {ScaleMode} from "./ScaleModes/ScaleModeInterface.ts";
import {Aeolian} from "./ScaleModes/Aeolian.ts";
import {Ionian} from "./ScaleModes/Ionian.ts";
import {MajorPentatonic} from "./ScaleModes/MajorPentatonic.ts";
import {MinorPentatonic} from "./ScaleModes/MinorPentatonic.ts";
import {MajorBlues} from "./ScaleModes/MajorBlues.ts";
import {MinorBlues} from "./ScaleModes/MinorBlues.ts";
import {CagedPosition} from "./types.ts";


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

  getScaleMode(mode: string): ScaleMode {
    switch (mode) {
      case "Major Scale":
        return new Aeolian()
      case "Natural Minor":
        return new Ionian()
      case "Major Pentatonic":
        return new MajorPentatonic()
      case "Minor Pentatonic":
        return new MinorPentatonic()
      case "Major Blues":
        return new MajorBlues()
      case "Minor Blues":
        return new MinorBlues()
      default:
        throw new Error(`Unknown scale mode: ${mode}`);
    }
  }

  getScaleModePosition(scaleMode: ScaleMode, position: string): CagedPosition {
    switch(position) {
      case 'C':
       return scaleMode.charlie()
      case 'A':
        return scaleMode.alpha()
      case 'G':
        return scaleMode.golf()
      case 'E':
        return scaleMode.echo()
      case 'D':
        return scaleMode.delta()
      default:
        throw new Error(`Unknown scale position: ${position}`);
    }
  }

  getScale(mode: string, position: string): CagedNote[] {
      const cagedPosition = this.getScaleModePosition(
          this.getScaleMode(mode),
          position
      );

      const notes: CagedNote[] = [];

      let string = 0;
      cagedPosition.forEach((fretsOnString) => {
        let fret = -1;
        fretsOnString.forEach(note => {
          fret++
          if(!note){
            return;
          }
          notes.push(new CagedNote(note,string,fret))
        })
        string++
      })

      return notes;


    }



}