# ויזואלים — הפקה ב-GPT

**איך עובדים עם הקובץ הזה:**

1. פותחים שיחה חדשה ב-GPT ומדביקים את **בריף המותג** (סעיף 1) — פעם אחת.
2. מדביקים פרומפט של נכס אחד בכל הודעה, לפי הסדר.
3. שומרים כל תוצאה ב-`public/visuals/` **בשם המדויק** מהכותרת.
4. סיומת `.png` / `.webp` / `.jpg` — הקוד מזהה לבד. אין מה לשנות בקוד.

הסדר חשוב: שיחה אחת שומרת על עקביות בין התמונות. אם פותחים שיחה
חדשה באמצע — צריך להדביק את בריף המותג שוב.

---

## 1 · בריף המותג — להדביק פעם אחת בתחילת השיחה

```
You are producing a set of images for the website of an Israeli sourcing
and procurement consultant who finds real factories in China for Israeli
businesses and manages the whole import process. Every image you make from
now on must belong to one coherent visual system. Hold these rules for the
entire conversation and apply them to every image I ask for, even when I
describe the subject briefly.

BRAND PALETTE — use these and nothing else:
- Deep Chinese seal red #C4161C as the only strong accent colour
- Warm gold #C0902A as a secondary accent, used sparingly
- Near-black #0C0C0C for shadows and dark masses
- Pure white #FFFFFF and light neutral greys for open space
- Muted, desaturated versions of red-brown, ochre and steel grey for
  industrial surfaces
Never use bright blues, greens, purples, teal or neon. Never use orange as
a dominant colour.

LIGHT AND MOOD:
Natural daylight, soft and directional, coming from the upper left. Calm,
quiet, still. Documentary realism, never glossy CGI, never advertising
gloss, never lens flare. Subtle film grain. Restrained contrast — deep but
readable shadows, no crushed blacks.

CAMERA:
Shot on a full-frame camera with a 35mm or 50mm lens. Straight-on or gentle
three-quarter angles. No fisheye, no extreme wide angle, no dramatic
dutch tilt.

CONTENT RULES — these are absolute:
- ABSOLUTELY NO TEXT anywhere in any image. No letters, no numbers, no
  Chinese characters, no signage, no plaques, no banners, no container
  codes, no shipping marks, no logos, no watermarks. Every surface that
  would normally carry writing must be completely blank.
- No recognisable human faces. People, if present at all, are seen from
  behind or from a distance.
- No clutter. Prefer empty, calm, uncluttered compositions.

When I write "TRANSPARENT" the image must be delivered as a PNG with true
alpha transparency around every edge and no backdrop of any kind — not
white, not grey, not a studio sweep.

Confirm you understand, then wait for my first image request.
```

---

## 2 · נכסי הליבה

### `hero-gate`
`1536×1024 · לרוחב` · **הכי חשוב**

השער חייב להיות **פתוח**. שער סגור אומר ״אתה לא נכנס״; שער פתוח שמאחוריו
נראה המפעל אומר ״אני מכניס אותך פנימה״ — וזה כל הקונספט.

```
The main gate of an industrial factory compound in China, photographed
straight on from outside at eye level, wide horizontal framing. A heavy
steel sliding gate stands half open at the centre; through the opening a
long low fabrication hall is visible across the yard beyond, its windows
glowing warm from the production floor working inside. The gate is painted
muted industrial grey-blue with chipped safety markings on the lower rails.
A tall flagpole beside the gate on the left carries a Chinese national
flag, lifted by a light breeze, clearly recognisable but not dominating.
Plain weathered concrete boundary walls extend to both edges. Overcast
early morning light, faint mist in the yard, wet asphalt in the foreground.
Completely empty — no people, no vehicles. All walls and surfaces blank.
```

### `container-front`
`1536×1024 · לרוחב`

רקע מלא מסך לסקציית המיצוב, מוצג בשקיפות 45%.

```
The rear doors of a shipping container filling the entire frame, shot
perfectly square to the camera. Deep weathered rust-red paint over
corrugated steel, scratched and chalked by sun, darker streaks running from
the hinges. Four vertical locking bars with heavy cast handles, bare metal
showing where paint has worn through. Even diffuse daylight, every texture
readable across the whole surface. Extremely flat, graphic composition,
doors filling the frame edge to edge. All surfaces completely blank.
```

### `containers-stack`
`1024×1536 · לאורך · TRANSPARENT`

נחתך בקצה העליון של סקציית המיצוב, כאילו הוא ממשיך מעבר.

```
TRANSPARENT. A vertical stack of four shipping containers piled directly
one on top of another, seen from slightly below at a gentle three-quarter
angle so both the corrugated side and the door end are visible. Each
container a different weathered tone — deep oxblood, warm ochre, charcoal
grey, faded rust — with realistic ribbing, corner castings, dents and paint
chalking that differ between units. The column is perfectly vertical, fills
the full height of the frame and is cut off by the top edge as if it
continues beyond. Soft daylight from the upper left, gentle contact shadows
between units. All surfaces completely blank.
```

### `china-circle`
`1024×1024 · ריבוע`

נחתך לעיגול מאחורי הדיוקן, ומכוסה חלקית — לכן העניין צריך להתפרס על
כל הפריים ולא להתרכז במרכז.

```
A traditional Chinese industrial street photographed in warm late
afternoon light. Rows of tiled roofs with upturned eaves recede into gentle
haze, red painted timber beams and weathered plaster walls fill the middle
ground, the silhouette of a factory chimney in the far distance. Deep
terracotta reds, warm ochres, soft grey mist. Calm and evenly balanced
across the whole square frame with no single dominant subject, since this
will be masked into a circle and partly covered. Slightly soft focus,
atmospheric depth. No people in the foreground. All surfaces blank.
```

### `cta-sky`
`1536×1024 · לרוחב`

רקע לאזור ההנעה לפעולה. הכותרת יושבת בשליש העליון, ומגדל המכולות
עומד על קו האופק — לכן שני השלישים העליונים חייבים להישאר פנויים.

```
A calm open sky over a still sea, photographed from just above the water
with a very low horizon line placed about two thirds down the frame. The
sky is soft and bright — pale blue at the top fading to warm white near
the horizon, with thin high cirrus clouds. The water below is almost
mirror still, reflecting the sky in soft bands. Nothing else in the frame
at all: no boats, no land, no birds, no structures. Serene, minimal, high
key, plenty of empty space. Gentle daylight, subtle film grain.
```

### `cta-containers`
`1024×1024 · ריבוע · TRANSPARENT`

עומד על קו האופק בתחתית אזור ההנעה לפעולה.

```
TRANSPARENT. Four shipping containers stacked in a loose pyramid — two
side by side on the bottom, then two more above them slightly offset —
seen from a low three-quarter angle. Colours: the lowest container deep
Chinese seal red, above it charcoal grey and warm ochre, the top one light
neutral grey. Realistic corrugated steel, corner castings, door hardware,
honest wear and paint chalking. Soft daylight from the upper left with
gentle shadows between the units. The whole stack sits flat as if resting
on level ground, cleanly cut out with true alpha around every edge. All
surfaces completely blank.
```

---

## 3 · שבעה אריחי שירותים

`1024×1536 · לאורך` · שם קובץ: `svc-<slug>`

מוצגים כהים מתחת להצללה, אז לא צריך שיהיו מושלמים — צריך שיהיו
**מובחנים זה מזה**. אחרי בריף המותג די בשורה אחת לכל אחד:

| קובץ | פרומפט |
| --- | --- |
| `svc-sourcing` | `A row of factory buildings behind a closed steel gate, seen from outside across an empty yard. Vertical composition, calmer darker space in the lower third.` |
| `svc-spec` | `Engineering calipers and a folded technical drawing resting on a scratched steel workbench, seen from above. Vertical composition, calmer darker space in the lower third.` |
| `svc-negotiation` | `Two empty chairs facing each other across a bare table in a plain factory office, low afternoon light through a window. Vertical composition, calmer darker space in the lower third.` |
| `svc-quality-control` | `A digital bench scale and inspection tools beside an opened cardboard carton in a warehouse. Vertical composition, calmer darker space in the lower third.` |
| `svc-consolidation` | `Dozens of small wooden crates and wrapped parcels stacked in a warehouse staging area. Vertical composition, calmer darker space in the lower third.` |
| `svc-logistics` | `A shipping container being lowered onto a truck chassis in a container yard. Vertical composition, calmer darker space in the lower third.` |
| `svc-aftercare` | `Spare mechanical parts laid out in neat rows on a workshop bench. Vertical composition, calmer darker space in the lower third.` |

---

## 4 · חמישה רקעי סיפורי מקרה

`1536×1024 · לרוחב` · שם קובץ: `case-<slug>`

| קובץ | פרומפט |
| --- | --- |
| `case-scaffolding` | `Steel scaffolding frames stacked in neat rows in an open yard. Wide composition, left third quieter and darker.` |
| `case-lifting-platforms` | `A row of scissor lift platforms parked in a depot. Wide composition, left third quieter and darker.` |
| `case-consolidation` | `A shipping container half loaded with mixed small crates, doors open. Wide composition, left third quieter and darker.` |
| `case-compliance` | `A thick stack of technical drawings and folders on a steel desk. Wide composition, left third quieter and darker.` |
| `case-textile` | `Rolls of fabric stacked on shelves in a textile mill. Wide composition, left third quieter and darker.` |

---

## 5 · `portrait` — לא מייצרים

`1024×1536 · לאורך · PNG שקוף`

זו חייבת להיות **תמונה אמיתית של שחר**, גזורה לשקיפות. היא יושבת בתוך
עיגול באזור ״מי עומד מאחורי זה״ וחורגת ממנו כלפי מעלה, ולכן הראש
והכתפיים צריכים להיות בשליש העליון.

מה לבקש ממנו: לבוש עסקי יומיומי בלי חליפה מלאה, תאורה רכה מהחזית,
מבט ישיר למצלמה, רקע אחיד כלשהו. הגזירה נעשית אחר כך.

---

## סדר עדיפויות

1. `hero-gate` — בלעדיו ראש העמוד ריק
2. `cta-sky` + `cta-containers` — אזור ההנעה לפעולה
3. `container-front` + `containers-stack` — המיצוב
4. `portrait` + `china-circle` — ״מי עומד מאחורי זה״
5. שבעת אריחי השירותים
6. חמשת רקעי המקרים

## אם משהו יוצא לא טוב

**הופיע טקסט או סימניות סיניות** — לייצר מחדש, לא לתקן. להוסיף להודעה:
`The image contained text. Regenerate with every surface completely blank.`

**חזר רקע לבן במקום שקיפות** — `Deliver as PNG with true alpha
transparency. No white background, no studio backdrop.`

**הצבעוניות סטתה** — `Too saturated. Return to the brand palette: seal red
#C4161C, warm gold #C0902A, muted industrial neutrals only.`
