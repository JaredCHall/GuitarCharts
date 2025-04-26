import {CagedNote} from "$classes/CagedNote.ts";
import {ScaleMode} from "$classes/ScaleModes/ScaleModeInterface.ts";
import {NaturalMajor} from "$classes/ScaleModes/NaturalMajor.ts";
import {NaturalMinor} from "$classes/ScaleModes/NaturalMinor.ts";
import {MajorPentatonic} from "$classes/ScaleModes/MajorPentatonic.ts";
import {MinorPentatonic} from "$classes/ScaleModes/MinorPentatonic.ts";
import {MajorBlues} from "$classes/ScaleModes/MajorBlues.ts";
import {MinorBlues} from "$classes/ScaleModes/MinorBlues.ts";
import {CagedPosition} from "$classes/types.ts";

export class CagePositionFinder {

  scales = {
    naturalMajor: new NaturalMajor(),
    naturalMinor: new NaturalMinor(),
    majorPentatonic: new MajorPentatonic(),
    majorBlues: new MajorBlues(),
    minorPentatonic: new MinorPentatonic(),
    minorBlues: new MinorBlues(),
  }

  semitonesRelativeToC: Record<string, number> = {
    'C': 0,
    'C♯': 1, 'D♭': 1,
    'D': 2,
    'D♯': 3, 'E♭': 3,
    'E': 4,
    'F': 5,
    'F♯': 6, 'G♭': 6,
    'G': 7,
    'G♯': 8, 'A♭': 8,
    'A': 9,
    'A♯': 10, 'B♭': 10,
    'B': 11,
  }

  getNoteSemitoneRelativeToC(note: string): number
  {
    const semitones = this.semitonesRelativeToC[note];
    if(semitones === undefined)
    {
      throw new Error('Unrecognized note: '+ note)
    }
    return semitones;
  }

  getStartFret(key: string, cagedNotes: CagedNote[]): number {
    const stringTunings = ["E", "A", "D", "G", "B", "E"]; // Standard tuning

    const keySemitone = this.getNoteSemitoneRelativeToC(key)

    if (keySemitone === undefined) {
      throw new Error(`Invalid key: ${key}`);
    }

    const possibleStartFrets: number[] = [];

    for (const note of cagedNotes) {
      if (note.interval !== "1") continue;

      const tuningNote = stringTunings[note.string];
      const tuningSemitone = this.getNoteSemitoneRelativeToC(tuningNote);

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
        return this.scales.naturalMajor
      case "Natural Minor":
        return this.scales.naturalMinor
      case "Major Pentatonic":
        return this.scales.majorPentatonic
      case "Minor Pentatonic":
        return this.scales.minorPentatonic
      case "Major Blues":
        return this.scales.majorBlues
      case "Minor Blues":
        return this.scales.minorBlues
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