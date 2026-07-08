# Image & Design Direction — LiveWell by James Bell

> The art direction and image-generation reference for the platform. The brand
> contract (palette, typography, voice) lives in `CLAUDE.md`; this document
> says how imagery and page design carry it to a world-class editorial
> standard. When this file and `CLAUDE.md` disagree, `CLAUDE.md` wins.

The governing sentence, from the emotional brief:

> **Unhurried. Weighted. Grown-up.** The feeling of opening a serious book in a
> quiet room where the light is good.

---

## The one art-direction rule

**No literal Christian stock imagery.** No glowing crosses, sunset silhouettes,
raised worship hands, doves, or rays through clouds. The platform speaks in
austere fine-art photography — chiaroscuro still lifes, spare architecture,
honest texture. Resonance over literalism: a torn loaf says more about the
table than a steeple says about the church.

---

## Image generation — the house-style block

Prepend this block to **every** image prompt (Fable 5 or any capable image
model). It encodes the palette and mood so all output comes back cohesive.

```
Fine-art editorial photograph in the visual language of a serious literary
publisher — the feeling of opening a hardcover book in a quiet room where the
light is good. Unhurried, weighted, grown-up. A single directional source of
late-afternoon light through a tall window: deep warm shadow, one luminous
highlight, true chiaroscuro. Palette strictly limited to warm charcoal-black
(#1A1A1A), soft cream/bone (#F5F0E6), and a single restrained accent of aged
gold ochre (#D4A017) used as a glint, never a fill. Medium-format film look:
matte, filmic, fine natural grain, no digital gloss. Composition with generous
negative space and one clear subject. Contemplative and honest.

Do NOT include: crosses, doves, sunset silhouettes, raised worship hands, rays
through clouds, lens flare, HDR, oversaturation, glossy stock-photo people,
busy backgrounds, text, watermarks, or logos.
```

### Slot prompts (house-style block + one of these)

**Homepage hero** — 16:9 or 21:9

```
A spare, sunlit room at late afternoon. A plain oak reading table set
off-center, bare but for one closed linen-bound book and a half-full glass of
water. A hard shaft of light crosses the table; dust motes hang in the beam.
Cream plaster walls, deep charcoal shadow, a single brass drawer-pull catching
a point of gold. Wide, with open negative space on the left for a headline.
```

**The pillar plates** — 4:5 portrait, one abstract still life per pillar;
resonant, never literal:

```
Living Well — a worn kitchen table at first light: a torn loaf, a simple
knife, a folded linen cloth, a chipped enamel cup; long low side-light, deep
shadow.

Theology — a stack of old clothbound volumes seen close from the side, spines
worn, one open to dense text; a brass lamp just out of frame rakes light down
one edge; darkness behind.

Justice — an empty wooden chair beside an open door in a bare room; hard
daylight falls across a stone floor and one strip of gold on the threshold;
the rest in shadow. Austere, weighted.

After Christendom — the interior of a disused stone chapel, plaster cracked, a
fallen beam, weeds at a column's base, but a clean shaft of daylight cutting
the ruin. Beauty in the wreckage.

Formation (pastoral) — a single beeswax candle burned low beside a closed
wooden door; the flame the only bright point; wax pooled; long quiet shadows.

Faith & Doubt — a person seen only from behind, in silhouette at a tall
rain-streaked window at dusk, one hand on the frame; face never shown; cool
grey light outside, dark interior, a faint gold reflection on the wet glass.
```

**Book-cover emblems** — tactile marks for covers and section breaks:

```
A minimal abstract emblem letterpress-embossed into heavy cream cotton paper,
raised and catching a raking side-light so it reads only in its own shadow — a
single simple geometric mark [an arch / an open book / a set of scales / a
broken column / a low flame / a threshold], no color, just paper and shadow.
Macro, fine-art stationery, extreme restraint.
```

**Author portrait direction** — for the About page (also usable as a shooting
brief for a real photographer):

```
Editorial author portrait of a man in his 40s–50s, seated, three-quarter turn,
looking slightly off camera — not smiling for the lens. Soft window light from
one side, the other falling into shadow (Rembrandt lighting). Plain
warm-charcoal background, muted wardrobe. Medium format, matte, a little
grain, near-monochrome. The face of a man who tells the truth. Not glossy, not
corporate. 4:5.
```

**OG / social share card** — 1200×630:

```
A 1200x630 share card: warm charcoal (#1A1A1A) ground with subtle paper grain,
a generous left margin, calm negative space for a serif headline, a thin
aged-gold hairline rule, and a small uppercase gold kicker. Austere,
editorial, like the cover of a serious literary quarterly. No photograph, no
clutter.
```

**Texture plates** — section dividers, used at low opacity:

```
Seamless macro texture of heavy cream cotton paper / raw linen weave /
hand-troweled off-white plaster, raking light revealing the grain. No color.
```

### After generation

- Render every generated image through the `Figure` component (default duotone
  treatment) so it locks to the palette even if the model drifts.
- Compress to WebP; ship width-appropriate sizes; `loading="lazy"` below the
  fold. The first-paint contract in `CLAUDE.md` still governs: no image ever
  blocks the masthead.

---

## Design disciplines — what separates elite from good

Six disciplines, in order of impact. The first three alone move the site two
tiers.

1. **Typography is the identity.** Display serif at true display size
   (5–7rem on heroes, `letter-spacing: -0.02em` — size carries weight, not
   boldness). Essays read in a 62–68ch column at 18–20px with `line-height:
   1.7`. Drop caps on opening paragraphs (implemented: `.article-body
   p:first-of-type::first-letter`). Pull quotes set large in the display serif
   with a hanging quotation mark — never in a bordered box.
2. **Air.** Elite sites are mostly empty space. Section padding 120–160px on
   desktop; heroes sit off-center; asymmetry reads as confidence. Use the
   spacing scale (`--s-7`…`--s-9`), never ad-hoc values.
3. **Images join the brand instead of fighting it.** Every photograph renders
   through the `Figure` component (`client/src/components/Figure.tsx`), whose
   default duotone treatment grades the image into the palette — one place,
   one treatment, so the whole site feels authored by one hand. Opt out only
   deliberately with `treatment="plain"`.

4. **Color discipline.** Mustard genuinely under 8% of any viewport: hairline
   rules, a kicker, one glint. Cream is the room; pure white only for lifted
   cards. Dark sections feel like ink, not black.
5. **Motion, barely.** Fade-and-rise on scroll (200–400ms, the `--ease` token,
   never bouncy); link underlines that draw in. Everything gated behind
   `prefers-reduced-motion`. If in doubt, less.
6. **The reader is the product.** `/read` gets the most love: chapter-opening
   drop caps, generous margins, a quiet chapter rail, citations that never
   clutter the measure. A reader should be able to forget the interface.

### Implemented in code (source of truth: `client/src/index.css`)

| Concern | Where |
|---|---|
| Drop caps (essays + book chapters) | `.article-body p:first-of-type::first-letter` |
| Pull quote, unboxed with hanging quote mark | `PullQuote` in `components/EditorialBlocks.tsx` |
| Duotone image lock | `Figure` component (`components/Figure.tsx`), duotone by default |
| Display scale on the homepage hero | `pages/Home.tsx` hero `clamp()` |
| Tokens for all of the above | `:root` in `index.css` — never hardcode hex |
