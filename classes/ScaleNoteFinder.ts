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
        const interval = this.getInterval(scaleNotes, scaleKey, noteName);
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
    const openStrings = ["E", "A", "D", "G", "B", "E"]; // 0-5

    const cagedRootStrings: Record<string, number[]> = {
      "C": [1, 4], // A string and B string
      "A": [0, 1], // E string and A string
      "G": [0, 3], // E string and G string
      "E": [0, 5], // E string and high E string
      "D": [2, 4], // D string and B string
    };

    const importantStrings = cagedRootStrings[position];
    if (!importantStrings) {
      throw new Error(`Unknown CAGED position: ${position}`);
    }

    const rootFrets = [];

    for (let string = 0; string < 6; string++) {
      const openNote = openStrings[string];
      const openIndex = chromatic.indexOf(openNote);
      const rootIndex = chromatic.indexOf(scaleKey);

      if (openIndex === -1 || rootIndex === -1) {
        throw new Error(`Unknown note in tuning or scale: ${openNote} / ${scaleKey}`);
      }

      // Calculate how many semitones up from the open string to reach the root
      let fret = (rootIndex - openIndex + 12) % 12;

      // Now make it a "playable" fret (we can add 12 if needed for upper octave)
      if (fret < 0) {
        fret += 12;
      }

      // Special treatment: for important strings, we prefer low fret numbers (0-12)
      if (importantStrings.includes(string)) {
        rootFrets.push(fret);
      } else {
        rootFrets.push(-1); // This string is not critical for root in this CAGED position
      }
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

  private getInterval(scaleNotes: string[], root: string, note: string): string {
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
    // First find the minimum and maximum frets where the roots are
    const validRootFrets = rootFrets.filter(fret => fret >= 0);
    if (validRootFrets.length === 0) {
      throw new Error(`No valid root frets found for position ${position}`);
    }

    const minRootFret = Math.min(...validRootFrets);
    const maxRootFret = Math.max(...validRootFrets);

    // Define a small window around the CAGED shape
    const lowFret = Math.max(0, minRootFret - 2);  // don't go below open strings
    const highFret = maxRootFret + 4;               // allow up to 4 frets higher

    return notes.filter(note => {
      return note.fret >= lowFret && note.fret <= highFret;
    });
  }

}