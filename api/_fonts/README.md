# Static font instances for server-side share cards

Generated from the self-hosted variable woff2 files in `client/public/fonts/`
with fontTools `instancer` (Cormorant Garamond wght 400; Inter wght 500 and
600), latin subset, renamed to their static family/style names. They exist
because neither renderer can use the site's webfonts directly: satori
(`@vercel/og`) reads TTF/OTF/WOFF only, sharp's bundled FreeType has no brotli
for WOFF2, and neither applies the `wght` axis of a variable font — the
committed "400" files default to Cormorant 300 Light. Render-only assets under
the SIL OFL 1.1 (see `client/public/fonts/README.md`); not served as webfonts.
