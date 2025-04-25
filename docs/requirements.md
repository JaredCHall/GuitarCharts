# GuitarCharts: User Interface Requirements

## Overview

The GuitarCharts app will provide an intuitive web interface for guitarists to view **scale** and **chord** fingering charts across **all five CAGED positions** simultaneously.

The interface is designed to optimize **fast visual reference** and **deep learning** of scale and chord shapes, roots, and intervals.

---

## Selection Controls

- **Select Scale** (Dropdown)
    - Example values: `C Major`, `G Minor Pentatonic`, etc.
    - Selecting a scale clears any currently selected chord.

- **Select Chord** (Dropdown)
    - Example values: `G Major`, `D Minor`, etc.
    - Selecting a chord clears any currently selected scale.

- **Interval Display Toggle** (Dropdown)
    - Options:
        - `Show Intervals`: display intervals such as `1`, `2`, `b3`, `5`, etc.
        - `Hide Intervals`: display simple note dots without interval labels.
    - Default: **Show Intervals ON**

---

## Display Area

- Always display **five fretboard diagrams**, corresponding to the five CAGED shapes:
    - `C Shape`
    - `A Shape`
    - `G Shape`
    - `E Shape`
    - `D Shape`
- Each diagram will be **clearly labeled** with its corresponding shape.

---

## Diagram Requirements

- **Root Highlighting**
    - Root notes must always be visibly highlighted.
    - Roots should be visually distinct (e.g., different color, bold border, filled circle).

- **Interval Display**
    - When "Show Intervals" is active, fretboard dots must show interval labels (`1`, `2`, `b3`, `4`, `5`, `6`, `7`, etc.).
    - When "Hide Intervals" is active, fretboard dots should appear without labels.

- **Responsive Design**
    - Page must display cleanly on both desktop and mobile screens.
    - On narrow screens, diagrams should stack vertically.

---

## Application Behavior

- **Mutual Exclusivity**
    - Only one of Scale or Chord can be selected at a time.
    - Selecting a new Scale or Chord clears the other selection.

- **Efficient Redrawing**
    - Switching interval display mode (`Show` ↔ `Hide`) should **not** reload or recalculate notes.
    - Only the dot **rendering style** should change.

- **Immediate Feedback**
    - Selecting a new Scale or Chord should immediately update all five diagrams.

---

## Implementation Notes

- The project will use **Riot.js** to manage UI components.
    - Particularly useful for dynamic updates like toggling interval visibility without full re-rendering.
    - Keeps the application lightweight and fast.


