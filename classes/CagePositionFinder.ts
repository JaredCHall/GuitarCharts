import {CagedNote} from "$classes/CagedNote.ts";
import {ScaleMode} from "$classes/ScaleModes/ScaleModeInterface.ts";
import {NaturalMajor} from "./ScaleModes/NaturalMajor.ts";
import {NaturalMinor} from "./ScaleModes/NaturalMinor.ts";
import {MajorPentatonic} from "$classes/ScaleModes/MajorPentatonic.ts";
import {MinorPentatonic} from "$classes/ScaleModes/MinorPentatonic.ts";
import {MajorBlues} from "$classes/ScaleModes/MajorBlues.ts";
import {MinorBlues} from "$classes/ScaleModes/MinorBlues.ts";
import {CagedPosition, chromaticFlats, chromaticSharps} from "$classes/types.ts";

export class CagePositionFinder {

  scales = {
    naturalMajor: new NaturalMinor(),
    naturalMinor: new NaturalMajor(),
    majorPentatonic: new MajorPentatonic(),
    majorBlues: new MajorBlues(),
    minorPentatonic: new MinorPentatonic(),
    minorBlues: new MinorBlues(),
  }

  getNoteSemitoneRelativeToC(note: string): number
  {
      switch(note){
        case 'C': return 0;
        case 'C♯': case 'D♭': return 1;
        case 'D': return 2;
        case 'D♯': case 'E♭': return 3;
        case 'E': return 4;
        case 'F': return 5;
        case 'F♯': case 'G♭': return 6;
        case 'G': return 7;
        case 'G♯': case 'A♭': return 8;
        case 'A': return 9;
        case 'A♯': case 'B♭': return 10;
        case 'B': return 11;
        default: throw new Error('Unrecognized note: ' + note);
      }
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

  private getNotesForKey(key: string, scaleType: string)
  {
    switch(scaleType) {
      case 'major':
        return this.getChromaticNotesForMajorKey(key)
      default:
        return this.getChromaticNotesForMinorKey(key)
    }

  }
  private getChromaticNotesForMajorKey(key: string): string[] {

    switch(key){
      case 'C': case 'G': case 'D': case 'A': case 'E': case 'B': case 'F♯': return chromaticSharps
      default: return chromaticFlats;
    }
  }
  private getChromaticNotesForMinorKey(key: string): string[] {

    switch(key){
      case 'A': case 'E': case 'B': case 'F♯': case 'C♯': case 'G♯': case 'D♯': return chromaticSharps
      default: return chromaticFlats;
    }
  }


  public buildScale(scaleKey: string, scaleMode: string): string[] {

    const mode =this.getScaleMode(scaleMode);
    const pattern = mode.pattern()
    const notesInKey = this.getNotesForKey(scaleKey, scaleMode);

    const startIndex = chromaticSharps.indexOf(scaleKey);
    if (startIndex === -1) {
      throw new Error(`Unknown starting key: ${scaleKey}`);
    }

    const notes: string[] = [];
    let currentIndex = startIndex;

    notes.push(notesInKey[currentIndex]); // Start with the root note

    for (const step of pattern) {
      currentIndex = (currentIndex + step) % 12;
      notes.push(notesInKey[currentIndex]);
    }

    return notes;
  }




}