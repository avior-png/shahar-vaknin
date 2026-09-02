# ויזואלים — פרומפטים לייצור ב-GPT

הפריסה בנויה סביב הקבצים האלה. כל עוד קובץ חסר מוצג במקומו מציין מקום
מסומן במידות המדויקות.

**להוספה:** שומרים ב-`public/visuals/` בשם המדויק מהכותרת (`.png` / `.webp`
/ `.jpg` — הקוד מזהה לבד). אין מה לשנות בקוד.

## מגבלות GPT

יחסים נתמכים: `1024×1024`, `1024×1536` (לאורך), `1536×1024` (לרוחב) בלבד.
שקיפות — לבקש במפורש בגוף הפרומפט. טקסט — GPT ממציא כיתובים; כל פרומפט
כאן נגמר באיסור, ואם בכל זאת הופיע טקסט צריך לייצר מחדש ולא לתקן.

## שפה חזותית משותפת

הפלטה עברה לבסיס לבן־חם עם **אדום חותם סיני** וזהב. התמונות צריכות להתיישב
עליה: אור טבעי, גוונים חמים, אדום ככתם ולא כרקע.

---

## hero-crane — המנוף המרכזי

`1024×1536 · לאורך · PNG שקוף` · **הנכס הכי חשוב**

יושב במרכז ההירו על רקע לבן, ושתי כרטיסיות בכל צד שלו. הרקע באתר לבן
לחלוטין — ולכן התמונה חייבת להיות **שקופה או להימס ללבן בכל הקצוות**,
אחרת ייראה מלבן. שטיפות הדגלים נעשות באתר עצמו ב-CSS, אז לא חייבים
אותן בתמונה; אם כן — רק כרמז דהוי מאוד.

```
A modern port gantry crane photographed from below against a bright empty
sky, isolated on a fully transparent background with no backdrop of any
kind. The crane stands vertically in the centre of a tall narrow frame: its
main mast rises the full height, its horizontal jib crosses the upper third,
and from the jib a single steel shipping container hangs on cables at the
centre of the image. The steel structure is clean and contemporary, painted
in a muted deep red with pale grey structural members, showing realistic
weathering and bolted joints but no rust or decay. Soft directional daylight
from the upper left, gentle shadows, everything sharp and clearly readable
as a silhouette. Nothing else in the frame — no ground, no buildings, no sky,
no people, no other cranes. The whole subject is cut out cleanly with true
alpha transparency around every edge including between the lattice members
of the mast. Photorealistic, PNG with alpha. Absolutely no text, no letters,
no numbers, no signage, no logos, no watermarks anywhere in the image.
```

## container-front — סקציית המיצוב

`1536×1024 · לרוחב · JPG`

מכסה את כל רוחב המסך מאחורי משפט המיצוב, עם הכהיה של 72%.

```
The front doors of a shipping container filling the entire frame, shot
straight on and perfectly square to the camera. Deep weathered rust-red
and orange paint over corrugated steel, the surface scratched, chalked by
sun and scuffed from years of handling, with darker streaks running down
from the hinges. Four vertical locking bars run down the doors with heavy
cast steel handles and keepers, each showing bare metal where the paint has
worn through. Even diffuse daylight, no harsh highlights, every texture of
the metal readable across the whole surface. Extremely flat and graphic
composition, the doors completely filling the frame edge to edge.
Architectural detail photography on a 50mm lens, sharp corner to corner,
subtle film grain. Absolutely no text, no letters, no numbers, no container
codes, no shipping marks, no logos, no watermarks anywhere.
```

## containers-stack — מגדל המכולות

`1024×1536 · לאורך · PNG שקוף`

יוצא מהפריים בקצה העליון של סקציית המיצוב.

```
A vertical stack of four shipping containers piled one on top of another,
isolated on a fully transparent background with no backdrop of any kind.
Seen from slightly below at a gentle three-quarter angle so the corrugated
side and the door end are both visible. The containers are in muted
weathered tones — deep rust red, warm ochre, charcoal grey and faded
oxblood — each with different degrees of wear, dents and paint chalking,
their corner castings and locking bars clearly detailed. The stack is
perfectly vertical and fills the full height of the frame, extending past
the top edge as if it continues beyond. Soft warm daylight from the upper
left, gentle shadows between the stacked units. Photorealistic, PNG with
alpha. Absolutely no text, no letters, no numbers, no container codes, no
shipping marks, no logos, no watermarks anywhere.
```

## china-circle — רקע העיגול

`1024×1024 · ריבוע · JPG`

יושב בתוך עיגול מאחורי הדיוקן, עם הצללה מלמטה.

```
A traditional Chinese industrial street scene photographed in warm late
afternoon light. Rows of tiled roofs with upturned eaves recede into a
gentle haze, red painted timber beams and weathered plaster walls filling
the middle ground, with the silhouette of a factory chimney and power
lines in the far distance. Deep terracotta reds, warm ochres and soft grey
mist. The composition is calm and evenly balanced with the visual interest
spread across the whole square frame, no single dominant subject, since
this image will be masked into a circle and partly covered. Slightly soft
focus overall, atmospheric depth, warm golden light. No people in the
foreground. Photographed on an 85mm lens with gentle compression, subtle
film grain. Absolutely no text, no letters, no numbers, no Chinese
characters, no signage, no banners, no logos, no watermarks anywhere.
```

## portrait — הדיוקן

`1024×1536 · לאורך · PNG שקוף`

**זו לא תמונה שמייצרים — זו תמונה אמיתית של שחר.** צריך צילום שלו עד
המותניים, על רקע נקי, שנגזר לשקיפות. הוא חורג מהעיגול כלפי מעלה, ולכן
הראש והכתפיים צריכים להיות בשליש העליון של הפריים.

מה לבקש ממנו: לבוש עסקי יומיומי, בלי חליפה מלאה. תאורה רכה מהחזית.
מבט ישיר למצלמה. רקע אחיד כלשהו — הגזירה נעשית אחר כך.

## cta-bg — ההנעה לפעולה

`1536×1024 · לרוחב · JPG`

```
A wide calm view of a container port terminal in Israel at early morning,
photographed from a distance. Long rows of stacked shipping containers in
muted reds, blues and greys stretch across the middle of the frame, with
tall gantry cranes standing still against a pale golden sunrise sky. A
smooth expanse of quiet water in the foreground catching the warm light.
Soft low-angle sunlight, long gentle shadows, light haze on the horizon.
The right half of the frame is open sky and water, quiet and uncluttered.
No people, nothing in motion. Serene wide establishing shot on a 70mm lens,
warm and optimistic, subtle film grain. Absolutely no text, no letters, no
numbers, no container codes, no signage, no logos, no watermarks anywhere.
```

---

## שירותים — שבעה אריחי רקע

`1024×1536 · לאורך · JPG` · שם קובץ: `svc-<slug>`

כל אריח בפסיפס מקבל רקע משלו. הם מוצגים כהים ב-70% שקיפות מתחת להצללה,
אז לא צריך שיהיו מושלמים — צריך שיהיו **מובחנים זה מזה**.

**תבנית משותפת** — להחליף רק את השורה הראשונה:

```
<<< הנושא >>>. Photographed in a real Chinese factory or logistics
environment, warm industrial daylight, muted red and ochre tones in the
palette, shallow depth of field, documentary realism on an 85mm lens,
subtle film grain, no glossy CGI. Vertical composition with the subject in
the upper two thirds and calmer darker space at the bottom. No people's
faces. Absolutely no text, no letters, no numbers, no signage, no logos,
no watermarks anywhere.
```

| קובץ | להחליף ב-`<<< הנושא >>>` |
| --- | --- |
| `svc-sourcing` | `A row of factory buildings behind a closed steel gate seen from outside` |
| `svc-spec` | `Engineering calipers and a technical drawing resting on a steel workbench` |
| `svc-negotiation` | `Two chairs facing each other across a bare table in an empty factory office` |
| `svc-quality-control` | `A digital scale and inspection tools beside an opened cardboard carton` |
| `svc-consolidation` | `Dozens of small crates and parcels stacked in a warehouse staging area` |
| `svc-logistics` | `A container being lifted onto a truck chassis at a shipping yard` |
| `svc-aftercare` | `Spare mechanical parts laid out in order on a workshop bench` |

## סיפורי מקרה — חמישה רקעים

`1536×1024 · לרוחב · JPG` · שם קובץ: `case-<slug>`

מוצגים מתחת להצללה כהה כרקע ללוח. אותה תבנית, רק לרוחב:

```
<<< הנושא >>>. Warm industrial daylight, muted red and ochre palette,
documentary realism on a 35mm lens, subtle film grain, no glossy CGI. Wide
composition with the left third quieter and darker. No people's faces.
Absolutely no text, no letters, no numbers, no signage, no logos, no
watermarks anywhere.
```

| קובץ | להחליף ב-`<<< הנושא >>>` |
| --- | --- |
| `case-scaffolding` | `Steel scaffolding frames stacked in a yard` |
| `case-lifting-platforms` | `A row of scissor lift platforms parked in a depot` |
| `case-consolidation` | `A container being loaded with mixed small crates` |
| `case-compliance` | `A thick stack of technical drawings on a steel desk` |
| `case-textile` | `Rolls of fabric stacked in a textile mill` |

---

## עדיפות

1. **hero-frame** — בלעדיו ראש העמוד ריק
2. **container-front** + **containers-stack** — סקציית המיצוב
3. **portrait** + **china-circle** — אזור "מי עומד מאחורי זה"
4. **cta-bg**
5. שבעת אריחי השירותים
6. חמשת רקעי המקרים

## ובמקביל — תמונות אמיתיות משחר

הצוות שלו כבר מצלם בביקורי מפעלים. תמונה אמיתית שלו על רצפת ייצור סינית
תעשה מה ששום רינדור לא יעשה באתר שכל תפקידו לשרוד בדיקת רקע.
כדאי לבקש: דיוקן, ביקור במפעל, דוח QC, מכולה בהעמסה, ותיק התקינה.
