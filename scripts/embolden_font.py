"""Make a synthetic bold cut of a single-weight TrueType font.

Android cannot synthesize bold for a custom family, so a font with no bold
file needs a real one. This thickens every simple glyph outline with FreeType
(FT_Outline_Embolden) and writes the shifted points back into the font, keeping
point structure, composites, GSUB and GPOS intact. Hinting is dropped.

  python embolden_font.py in.ttf out.ttf <strength-em> "<Family Bold>"

Needs: fonttools, freetype-py (pip, in a throwaway venv).
"""
import ctypes
import sys
import freetype
from fontTools.ttLib import TTFont

src, dst, strength_em, family = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
font = TTFont(src)
upm = font["head"].unitsPerEm
s = round(upm * strength_em)
face = freetype.Face(src)
glyf, hmtx, order = font["glyf"], font["hmtx"], font.getGlyphOrder()
flags = freetype.FT_LOAD_NO_SCALE | freetype.FT_LOAD_NO_HINTING | freetype.FT_LOAD_NO_BITMAP

for gid, name in enumerate(order):
    g = glyf[name]
    adv, lsb = hmtx[name]
    if g.numberOfContours > 0:
        face.load_glyph(gid, flags)
        o = face.glyph.outline
        freetype.raw.FT_Outline_Embolden(ctypes.byref(o._FT_Outline), s)
        pts = o.points
        assert len(pts) == len(g.coordinates), (name, len(pts), len(g.coordinates))
        for i, (x, y) in enumerate(pts):
            g.coordinates[i] = (x, y)
        g.program.fromBytecode(b"")  # drop hinting instructions
        g.recalcBounds(glyf)
    # Combining marks have no advance; everything else grows by the stroke.
    if adv > 0:
        hmtx[name] = (adv + s, g.xMin if g.numberOfContours else lsb)
    elif g.numberOfContours:
        hmtx[name] = (adv, g.xMin)

for t in ("fpgm", "prep", "cvt ", "hdmx", "LTSH", "VDMX", "gasp"):
    if t in font:
        del font[t]
os2 = font["OS/2"]
os2.usWeightClass = 700
os2.fsSelection = (os2.fsSelection & ~0x40) | 0x20  # clear REGULAR, set BOLD
font["head"].macStyle |= 1
ps = family.replace(" ", "")
for rec in font["name"].names:
    if rec.nameID in (1, 16):
        rec.string = family.rsplit(" Bold", 1)[0]
    elif rec.nameID in (2, 17):
        rec.string = "Bold"
    elif rec.nameID == 4:
        rec.string = family
    elif rec.nameID == 6:
        rec.string = ps
    elif rec.nameID == 3:
        rec.string = ps + ";synthetic-bold"
font.save(dst)
print(dst, "strength", s, "units of", upm)
