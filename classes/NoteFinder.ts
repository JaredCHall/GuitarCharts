import {chromaticFlats, chromaticSharps} from "./types.ts";

export class NoteFinder {


  /**
   * Given a key and scale type, return the notes for each interval in the key
   *
   * @param key - 'E','E♭','F#'
   * @param scaleType - 'minor' or 'major'
   *
   */
  getKeyIntervals(key: string, scaleType: string): Record<string, string> {

    const notes = this.getNotesForKey(key,scaleType)

    // notes always starts from C, reorder so that `key` is the first element in the array
    const startIndex = notes.indexOf(key);
    if (startIndex === -1) {
      throw new Error(`Key ${key} not found in notes array.`);
    }
    const rotated = [...notes.slice(startIndex), ...notes.slice(0, startIndex)];

    return {
      '1': rotated[0],
      '♭2': rotated[1],
      '2': rotated[2],
      '♭3': rotated[3],
      '3': rotated[4],
      '4': rotated[5],
      '♭5': rotated[6],
      '5': rotated[7],
      '♭6': rotated[8],
      '6': rotated[9],
      '♭7': rotated[10],
      '7': rotated[11],
    }
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

}