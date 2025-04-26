import { assertEquals } from "$std/assert/assert_equals.ts";
import { assertThrows } from "$std/assert/assert_throws.ts";
import { NoteFinder } from "$classes/NoteFinder.ts";

Deno.test("NoteFinder - getKeyIntervals for E major (uses sharps)", () => {
  const finder = new NoteFinder();

  const result = finder.getKeyIntervals("E", "major");

  const expected = {
    '1': "E",
    '♭2': "F",
    '2': "F♯",
    '♭3': "G",
    '3': "G♯",
    '4': "A",
    '♭5': "A♯",
    '5': "B",
    '♭6': "C",
    '6': "C♯",
    '♭7': "D",
    '7': "D♯",
  };

  assertEquals(result, expected);
});

Deno.test("NoteFinder - getKeyIntervals for F major (uses flats)", () => {
  const finder = new NoteFinder();

  const result = finder.getKeyIntervals("F", "major");

  const expected = {
    '1': "F",
    '♭2': "G♭",
    '2': "G",
    '♭3': "A♭",
    '3': "A",
    '4': "B♭",
    '♭5': "B",
    '5': "C",
    '♭6': "D♭",
    '6': "D",
    '♭7': "E♭",
    '7': "E",
  };

  assertEquals(result, expected);
});

Deno.test("NoteFinder - getKeyIntervals for D minor (uses flats)", () => {
  const finder = new NoteFinder();

  const result = finder.getKeyIntervals("D", "minor");

  const expected = {
    '1': "D",
    '♭2': "E♭",
    '2': "E",
    '♭3': "F",
    '3': "G♭",
    '4': "G",
    '♭5': "A♭",
    '5': "A",
    '♭6': "B♭",
    '6': "B",
    '♭7': "C",
    '7': "D♭",
  };

  assertEquals(result, expected);
});

Deno.test("NoteFinder - getKeyIntervals for F♯ major (uses sharps)", () => {
  const finder = new NoteFinder();

  const result = finder.getKeyIntervals("F♯", "major");

  const expected = {
    '1': "F♯",
    '♭2': "G",
    '2': "G♯",
    '♭3': "A",
    '3': "A♯",
    '4': "B",
    '♭5': "C",
    '5': "C♯",
    '♭6': "D",
    '6': "D♯",
    '♭7': "E",
    '7': "F",
  };

  assertEquals(result, expected);
});


Deno.test("NoteFinder - throws error on invalid key", () => {
  const finder = new NoteFinder();

  assertThrows(
      () => finder.getKeyIntervals("H", "major"),
      Error,
      "Key H not found in notes array."
  );
});
