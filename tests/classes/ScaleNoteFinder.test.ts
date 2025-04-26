import { assertEquals } from "$std/assert/assert_equals.ts";
import { ScaleNoteFinder } from "$classes/ScaleNoteFinder.ts";
import {ScaleNote} from "$classes/ScaleNote.ts"; // Adjust path if needed

Deno.test("C Major Scale is built correctly", () => {
  const finder = new ScaleNoteFinder();
  const result = finder["buildScale"]("C", "Major Scale");
  const expected = ["C", "D", "E", "F", "G", "A", "B", "C"];
  assertEquals(result, expected);
});

Deno.test("A Minor Pentatonic Scale is built correctly", () => {
  const finder = new ScaleNoteFinder();
  const result = finder["buildScale"]("A", "Minor Pentatonic");
  const expected = ["A", "C", "D", "E", "G", "A"];
  assertEquals(result, expected);
});

Deno.test("G Major Blues Scale is built correctly", () => {
  const finder = new ScaleNoteFinder();
  const result = finder["buildScale"]("G", "Major Blues");
  const expected = ["G", "A", "C", "C#", "D", "F", "G"];
  assertEquals(result, expected);
});


Deno.test("Interval from C to C is 1", () => {
  const finder = new ScaleNoteFinder();
  const interval = finder["getInterval"]([], "C", "C");
  assertEquals(interval, "1");
});

Deno.test("Interval from C to D is 2", () => {
  const finder = new ScaleNoteFinder();
  const interval = finder["getInterval"]([], "C", "D");
  assertEquals(interval, "2");
});

Deno.test("Interval from C to E is 3", () => {
  const finder = new ScaleNoteFinder();
  const interval = finder["getInterval"]([], "C", "E");
  assertEquals(interval, "3");
});

Deno.test("Interval from C to G is 5", () => {
  const finder = new ScaleNoteFinder();
  const interval = finder["getInterval"]([], "C", "G");
  assertEquals(interval, "5");
});

Deno.test("Interval from A to C is ♭3", () => {
  const finder = new ScaleNoteFinder();
  const interval = finder["getInterval"]([], "A", "C");
  assertEquals(interval, "♭3");
});

Deno.test("Interval from E to D is ♭7", () => {
  const finder = new ScaleNoteFinder();
  const interval = finder["getInterval"]([], "E", "D");
  assertEquals(interval, "♭7");
});

Deno.test("Interval wraps correctly from B to C", () => {
  const finder = new ScaleNoteFinder();
  const interval = finder["getInterval"]([], "B", "C");
  assertEquals(interval, "♭2");
});

Deno.test("C shape roots for C major", () => {
  const finder = new ScaleNoteFinder();
  const roots = finder["getCagedRootFrets"]("C", "C");
  assertEquals(roots, [-1, 3, -1, -1, 1, -1]);
});

Deno.test("A shape roots for C major", () => {
  const finder = new ScaleNoteFinder();
  const roots = finder["getCagedRootFrets"]("C", "A");
  assertEquals(roots, [8, 3, -1, -1, -1, -1]);
});

Deno.test("G shape roots for C major", () => {
  const finder = new ScaleNoteFinder();
  const roots = finder["getCagedRootFrets"]("C", "G");
  assertEquals(roots, [8, -1, -1, 5, -1, -1]);
});

Deno.test("E shape roots for C major", () => {
  const finder = new ScaleNoteFinder();
  const roots = finder["getCagedRootFrets"]("C", "E");
  assertEquals(roots, [8, -1, -1, -1, -1, 8]);
});

Deno.test("D shape roots for C major", () => {
  const finder = new ScaleNoteFinder();
  const roots = finder["getCagedRootFrets"]("C", "D");
  assertEquals(roots, [-1, -1, 10, -1, 1, -1]);
});


Deno.test("Filter notes around C shape roots for C major", () => {
  const finder = new ScaleNoteFinder();

  const notes = [
    new ScaleNote("C", "1", 1, 3),   // Good (root at fret 3)
    new ScaleNote("D", "2", 1, 5),   // Good
    new ScaleNote("E", "3", 1, 7),   // Maybe good depending on window
    new ScaleNote("F", "4", 1, 9),   // Should be filtered out
    new ScaleNote("G", "5", 1, 10),  // Should be filtered out
  ];

  const rootFrets = [-1, 3, -1, -1, 1, -1]; // Roots at fret 3 and 1

  const filtered = finder["filterByCagedPosition"](notes, rootFrets, "C");

  const expected = [
    new ScaleNote("C", "1", 1, 3),
    new ScaleNote("D", "2", 1, 5),
    new ScaleNote("E", "3", 1, 7),
  ];

  assertEquals(
      filtered.map(n => ({ string: n.string, fret: n.fret, name: n.name })),
      expected.map(n => ({ string: n.string, fret: n.fret, name: n.name })),
  );
});

Deno.test("Filter notes correctly with low fret roots", () => {
  const finder = new ScaleNoteFinder();

  const notes = [
    new ScaleNote("C", "1", 4, 1),  // Good (root at fret 1)
    new ScaleNote("D", "2", 4, 3),  // Good
    new ScaleNote("E", "3", 4, 5),  // Good
    new ScaleNote("F", "4", 4, 8),  // Should be filtered out
  ];

  const rootFrets = [-1, -1, -1, -1, 1, -1]; // Only root at 1st fret on 2nd string

  const filtered = finder["filterByCagedPosition"](notes, rootFrets, "C");

  const expected = [
    new ScaleNote("C", "1", 4, 1),
    new ScaleNote("D", "2", 4, 3),
    new ScaleNote("E", "3", 4, 5),
  ];

  assertEquals(
      filtered.map(n => ({ string: n.string, fret: n.fret, name: n.name })),
      expected.map(n => ({ string: n.string, fret: n.fret, name: n.name })),
  );
});

Deno.test("Throws if no valid roots are found", () => {
  const finder = new ScaleNoteFinder();

  const notes = [
    new ScaleNote("C", "1", 1, 3),
    new ScaleNote("D", "2", 1, 5),
  ];

  const rootFrets = [-1, -1, -1, -1, -1, -1]; // No valid roots

  let threw = false;
  try {
    finder["filterByCagedPosition"](notes, rootFrets, "C");
  } catch (e) {
    threw = true;
  }

  if (!threw) {
    throw new Error("Expected method to throw if no valid roots found");
  }
});

Deno.test("Find notes for C Major Scale, C shape", () => {
  const finder = new ScaleNoteFinder();

  const notes = finder.findNotes("C", "Major Scale", "C");

  // We'll test a *subset* of expected notes to keep the test readable and manageable.
  const expectedNotesSubset = [
    new ScaleNote("C", "1", 1, 3),
    new ScaleNote("D", "2", 1, 5),
    new ScaleNote("D", "2", 4, 3),
    new ScaleNote("E", "3", 1, 7),
    new ScaleNote("C", "1", 4, 1),
    new ScaleNote("G", "5", 0, 3),
    new ScaleNote("G", "5", 5, 3),
  ];

  // Map both results and expected to simple objects for easy comparison
  const notesSimplified = notes.map(n => ({ string: n.string, fret: n.fret, name: n.name, interval: n.interval }));

  for (const expected of expectedNotesSubset) {
    const match = notesSimplified.find(n =>
        n.name === expected.name &&
        n.interval == expected.interval &&
        n.string === expected.string &&
        n.fret === expected.fret
    );
    if (!match) {
      throw new Error(`Expected note not found: ${expected.name} string=${expected.string} fret=${expected.fret}`);
    }
  }
});