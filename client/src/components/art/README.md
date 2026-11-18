# The art kit

The site's pictures, drawn in one hand and kept as React SVG components.

**The hand.** An engraving: a 2.25px ink line with square ends and mitred
corners; shade by parallel hatching only; one flat tone block per shape,
printed 4px off register (olive, slate blue or clay); exactly one mustard mark
per plate, the light (a sun, a flame, a gilded letter). No faces. No photographs.

**Colour.** Only through CSS variables in `client/src/index.css`: `--art-paper`,
`--art-ink`, `--art-blue`, `--art-olive`, `--art-clay`, plus `--mustard`, each
redefined under `html.dark`. The classes `.pl-*` (paper, outline, line, fine
line, solid ink, the three tones, mustard, hatch) live there too. No hex in a
component.

**Pieces.**
- `PlateSvg.tsx`: draws a `Drawing` ({ w, h, label, draw }) and declares its
  own hatch patterns with ids from `useId`. Decorative plates are
  `aria-hidden`; the rest are `role="img"` with the drawing's label.
- `RoadPlate.tsx`: Plate I, the Home hero. In the entry script because it is
  in the first screen.
- `plates.tsx`: every other plate, by name. Loaded on its own (`Plate.tsx`,
  React.lazy), so it never weighs on the entry script.
- `Plate.tsx`: `<Plate name="book" />`, the lazy door to `plates.tsx`.
- `PlateFrame.tsx`: the frame every picture hangs in, with its ratio set so
  it holds its size before the drawing loads, and an optional caption.
- `DoorCard.tsx`: a picture-led card (`lw-door`, `--lead`, `--row`).
- `Roundel.tsx`: the seven roundels of the church's ages (the timeline).

Icons are `lucide-react`, one family, stroke 1.75.

**Adding a plate.** The drawings were generated from the Gallery mockup's
`plates.py` (its helpers `sh`, `rect`, `circ`, `rays`). Draw a new one in the
same vocabulary: outlined shapes on paper, one tone block off register, hatch
for shade, one mustard mark. Add its name to `PlateName` and its entry to
`PLATES`. Size it by its container: the SVG fills its frame and crops with
`xMidYMid slice`.
