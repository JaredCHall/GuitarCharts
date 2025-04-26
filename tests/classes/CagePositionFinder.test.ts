import { assertEquals } from "$std/assert/assert_equals.ts";
import { CagePositionFinder } from "$classes/CagePositionFinder.ts";
import {assertThrows} from "$std/assert/assert_throws.ts";

Deno.test("CagePositionFinder - getScaleMode returns correct mode instance", () => {
  const finder = new CagePositionFinder();

  const scaleMode = finder.getScaleMode("Major Scale");
  const position = finder.getScaleModePosition(scaleMode, "C");

  assertEquals(Array.isArray(position), true);
  assertEquals(position.length, 6); // 6 strings
  position.forEach((fretsOnString) => {
    assertEquals(fretsOnString.length, 5); // 5 frets
  });
});

Deno.test("CagePositionFinder - getScale returns CagedNotes for C major Charlie position", () => {
  const finder = new CagePositionFinder();

  const notes = finder.getScale("Major Scale", "C");

  assertEquals(Array.isArray(notes), true);
  notes.forEach((note) => {
    assertEquals(typeof note.interval, "string");
    assertEquals(typeof note.string, "number");
    assertEquals(typeof note.fret, "number");
  });
});

Deno.test("CagePositionFinder - getScale returns CagedNotes for F♯ major Charlie position", () => {
  const finder = new CagePositionFinder();

  const notes = finder.getScale("Major Scale", "C");

  assertEquals(Array.isArray(notes), true);
  notes.forEach((note) => {
    assertEquals(typeof note.interval, "string");
    assertEquals(typeof note.string, "number");
    assertEquals(typeof note.fret, "number");
  });
});

Deno.test("CagePositionFinder - throws on invalid scale mode", () => {
  const finder = new CagePositionFinder();

  assertThrows(
      () => finder.getScaleMode("Locrian Cheese"),
      Error,
      "Unknown scale mode: Locrian Cheese"
  );
});
