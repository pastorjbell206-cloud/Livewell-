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

**Plates by name.** book, basilica, lantern, house, tree, jar, compass, quill,
books, letter, jars, tomb, table, arch; and, drawn for the page heads, lens (a
reading glass over a scroll), sundial (a day at a time) and lectern (speaking).

## The page parts

- `PageHead.tsx`: the one page top for the whole site. A small label naming
  the door (`door`, linked with `doorHref`), a plain H1 (`title`), one short
  line (`line`), an optional main action (`action`: a `.btn`, and a
  `.btn btn--quiet` for a second), and a plate (`plate`) or another picture
  (`art`) in its frame. `size="door"` is a door's own page: the large plate
  beside the words on a laptop, edge to edge above them on a phone, the title
  at `--fs-display`. `size="inner"` (the default) is every other page: a small
  mark beside the title, or none, the title at `--fs-h1`. The frame's ratio
  is set in CSS, so the space is held while the plate loads. It draws on the
  `.pg-head` classes, so `editorial/PageHead` (the older props: `eyebrow`,
  `lede`, `actions`) is now a thin wrapper over it, and the charcoal and
  centred page tops are gone from the pages that took it.
- `SectionHead.tsx`: the top of a section. A lucide icon, a small label, an
  H2 at `--fs-h2`, an optional link ("All of it"). `dark` on a charcoal band.
- A room is a `DoorCard` (no separate RoomCard: it already is one). Put the
  rooms in `<ul className="lw-rooms">`: three across on a laptop, two on a
  phone, each a picture card with its name and one short note.
- `IconTile.tsx`: a small tile, icon in a ruled square, name, one line. Put
  them in `<ul className="lw-tiles">` (three across, one on a phone).
- `.lw-newline`: one ruled line for someone new, with a lucide icon.

## How a door's page is built

In this order, and no more (`pages/Study.tsx` is the model):

1. **PageHead, door size.** The door's name as the label, the page's plain
   name as the H1 ("Study the Bible"), one line of what it is for, the main
   action, and the door's plate (the one it has on Home).
2. **The one thing to do first.** One main action or one interactive piece
   (on /study, the shelf of 66 books), lazy-loaded (`React.lazy` plus
   `useNear`) in a box whose `min-height` is the piece's own height, so
   nothing moves when it arrives. A charcoal band, with a SectionHead.
3. **The rooms, as picture cards, six or fewer.** A SectionHead, then
   `lw-rooms` of DoorCards in the map's order. A room is listed only when its
   page exists; where a planned room has no page, use the closest real page
   under a name that is true of it, or leave it out.
4. **What is new or next.** A SectionHead, then `lw-tiles` of IconTiles for
   the pages one step further in, and the line for someone new (`/start`).

Sections alternate cream, charcoal, cream, warm cream. Words are labels on
pictures and controls; a paragraph is the exception. Every target is 44px or
more; every colour is a token.
