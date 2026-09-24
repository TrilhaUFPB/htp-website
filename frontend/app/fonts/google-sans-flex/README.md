# Google Sans Flex

`GoogleSansFlex-Variable.ttf` is the source file from the brand assets. It is
kept for reference but is **not** the file the site loads.

The site loads `GoogleSansFlex-Latin-wght.woff2`, a subset of that source. The
full file is 4.0 MB, of which the `gvar` table (the variation deltas) is 3.5 MB,
because the source ships six axes:

| axis   | range    | used by the site |
| ------ | -------- | ---------------- |
| `wght` | 1–1000   | yes              |
| `opsz` | 6–144    | no               |
| `wdth` | 25–151   | no               |
| `GRAD` | 0–100    | no               |
| `ROND` | 0–100    | no               |
| `slnt` | −10–0    | no               |

Pinning the five unused axes at their defaults and subsetting to Latin brings
it to 49.6 KB, a 98.8% reduction, with the `wght` axis intact. Regenerate with:

```sh
python3 -m venv /tmp/fontvenv
/tmp/fontvenv/bin/pip install fonttools brotli

/tmp/fontvenv/bin/fonttools varLib.instancer \
  GoogleSansFlex-Variable.ttf \
  opsz=18 wdth=100 GRAD=0 ROND=0 slnt=0 \
  -o /tmp/pinned.ttf

/tmp/fontvenv/bin/pyftsubset /tmp/pinned.ttf \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --layout-features="*" --flavor=woff2 \
  --output-file=GoogleSansFlex-Latin-wght.woff2
```

Every character the site renders is covered; the only glyphs it asks for that
the subset lacks are `←` and `→`, and the original source lacks those too, so
they already fall back to a system font.

The font is licensed under the OFL (see `OFL.txt`), which permits subsetting.

If the site ever needs another axis, another script, or a character outside
Latin, regenerate from the source with the range widened rather than editing
the `.woff2`.
