import {ScaleNote} from "./ScaleNote.ts";

export class ScaleNoteFinder {
  findNotes(
      scaleKey: string,
      scaleMode: string,
      position: string,
  ): ScaleNote[] {
    // Step 1: Get all notes in the scale
    const scaleNotes = this.buildScale(scaleKey, scaleMode);

    // Step 2: Find the root fret position for the CAGED position
    const rootFrets = this.getCagedRootFrets(scaleKey, position);

    // Step 3: Build fretted notes
    const notes: ScaleNote[] = [];

    for (let string = 0; string < 6; string++) {
      const openNote = this.openStringNote(string);
      for (let fret = 0; fret <= 14; fret++) { // Maybe limit range?
        const noteName = this.getNoteName(openNote, fret);
        const interval = this.getInterval(scaleKey, noteName);
        if (scaleNotes.includes(noteName)) {
          notes.push(new ScaleNote(noteName, interval, string, fret));
        }
      }
    }

    // Step 4: Filter to notes close to CAGED root positions
    return this.filterByCagedPosition(notes, rootFrets, position);
  }

  private buildScale(scaleKey: string, scaleMode: string): string[] {
    const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    const scalePatterns: Record<string, number[]> = {
      "Major Scale": [2, 2, 1, 2, 2, 2, 1],
      "Natural Minor": [2, 1, 2, 2, 1, 2, 2],
      "Major Pentatonic": [2, 2, 3, 2, 3],
      "Minor Pentatonic": [3, 2, 2, 3, 2],
      "Major Blues": [2, 3, 1, 1, 3, 2],
      "Minor Blues": [3, 2, 1, 1, 3, 2],
    };

    const pattern = scalePatterns[scaleMode];
    if (!pattern) {
      throw new Error(`Unknown scale mode: ${scaleMode}`);
    }

    const startIndex = chromatic.indexOf(scaleKey);
    if (startIndex === -1) {
      throw new Error(`Unknown starting key: ${scaleKey}`);
    }

    const notes: string[] = [];
    let currentIndex = startIndex;

    notes.push(chromatic[currentIndex]); // Start with the root note

    for (const step of pattern) {
      currentIndex = (currentIndex + step) % 12;
      notes.push(chromatic[currentIndex]);
    }

    return notes;
  }

  private getCagedRootFrets(scaleKey: string, position: string): number[] {
    const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const openStrings = ["E", "A", "D", "G", "B", "E"];

    const cagedRootStrings: Record<string, number[]> = {
      "C": [1, 4],
      "A": [1, 3],
      "G": [0, 3],
      "E": [0, 5],
      "D": [2, 4],
    };

    const shapeTargetRanges: Record<string, [number, number]> = {
      "C": [1, 5],
      "A": [3, 7],
      "G": [5, 9],
      "E": [7, 11],
      "D": [9, 13],
    };

    const importantStrings = cagedRootStrings[position];
    const [lowTarget, highTarget] = shapeTargetRanges[position] ?? [0, 12];

    if (!importantStrings) {
      throw new Error(`Unknown CAGED position: ${position}`);
    }

    const rootFrets: number[] = [];

    for (let string = 0; string < 6; string++) {
      if (!importantStrings.includes(string)) {
        rootFrets.push(-1);
        continue;
      }

      const openNote = openStrings[string];
      const openIndex = chromatic.indexOf(openNote);
      const rootIndex = chromatic.indexOf(scaleKey);

      if (openIndex === -1 || rootIndex === -1) {
        throw new Error(`Invalid note in tuning or scale: ${openNote} / ${scaleKey}`);
      }

      const baseFret = (rootIndex - openIndex + 12) % 12;
      const highFret = baseFret + 12;

      // Prefer baseFret if it fits the target range, otherwise highFret
      let fret = -1;
      if (baseFret >= lowTarget && baseFret <= highTarget) {
        fret = baseFret;
      } else if (highFret >= lowTarget && highFret <= highTarget) {
        fret = highFret;
      } else {
        // fallback: pick whichever is closer to target window
        const baseDist = Math.min(Math.abs(baseFret - lowTarget), Math.abs(baseFret - highTarget));
        const highDist = Math.min(Math.abs(highFret - lowTarget), Math.abs(highFret - highTarget));
        fret = baseDist <= highDist ? baseFret : highFret;
      }

      rootFrets.push(fret);
    }

    return rootFrets;
  }


  private openStringNote(string: number): string {
    const openStrings = ["E", "A", "D", "G", "B", "E"];
    return openStrings[string];
  }

  private getNoteName(startNote: string, semitones: number): string {
    const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const startIndex = chromatic.indexOf(startNote);
    const newIndex = (startIndex + semitones) % 12;
    return chromatic[newIndex];
  }

  private getInterval( root: string, note: string): string {
    const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    const rootIndex = chromatic.indexOf(root);
    const noteIndex = chromatic.indexOf(note);

    if (rootIndex === -1 || noteIndex === -1) {
      throw new Error(`Invalid note(s): root=${root}, note=${note}`);
    }

    const semitoneDistance = (noteIndex - rootIndex + 12) % 12;
    const semitoneToInterval: Record<number, string> = {
      0: "1",
      1: "♭2",
      2: "2",
      3: "♭3",
      4: "3",
      5: "4",
      6: "♯♭5",
      7: "5",
      8: "♭6",
      9: "6",
      10: "♭7",
      11: "7",
    };

    return semitoneToInterval[semitoneDistance] ?? "?";
  }



  private filterByCagedPosition(notes: ScaleNote[], rootFrets: number[], position: string): ScaleNote[] {

    console.log('position: ' + position);
    console.log(
        notes.map(n => `(${n.string}:${n.fret} ${n.name})`).join(", ")
    );


    const validRootFrets = rootFrets.filter(fret => fret >= 0);
    console.log(validRootFrets)

    if (validRootFrets.length === 0) {
      throw new Error(`No root frets for position ${position}`);
    }

    const shapeRanges: Record<string, [number, number]> = {
      C: [1, 2],
      A: [1, 3],
      G: [1, 3],
      E: [1, 3],
      D: [1, 3],
    };

    const [back, forward] = shapeRanges[position] ?? [2, 4];

    // Anchor around the **lowest** root (reliable heuristic)
    const anchorFret = Math.min(...validRootFrets);
    const lowFret = Math.max(0, anchorFret - back);
    const highFret = anchorFret + forward;

    return notes.filter(note => note.fret >= lowFret && note.fret <= highFret);
  }


}