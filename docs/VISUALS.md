# ויזואלים — פרומפטים לייצור ב-GPT

הפריסה כבר בנויה סביב הקבצים האלה. כל עוד קובץ חסר, מוצג במקומו מציין
מקום מסומן במידות המדויקות (ובמקרה של המנוף — רישום SVG מלא).

**להוספה:** שומרים ב-`public/visuals/` בשם המדויק מהכותרת. סיומת `.png`,
`.webp` או `.jpg` — הקוד מזהה לבד. אין מה לשנות בקוד.

## מגבלות של GPT שכדאי להכיר

- **יחסי גובה-רוחב:** רק `1024×1024` (ריבוע), `1024×1536` (לאורך) ו-`1536×1024`
  (לרוחב). אין תמיכה ביחסים קיצוניים — לכן המנוף מיוצר לאורך רגיל, וההארכה
  של השרשרת נעשית בקוד.
- **שקיפות:** צריך לבקש אותה במפורש בגוף הפרומפט. אם חוזר רקע לבן —
  לבקש שוב "transparent background, PNG with alpha, no backdrop".
- **טקסט:** GPT נוטה להוסיף כיתובים ולוגואים מומצאים. כל פרומפט כאן נגמר
  באיסור מפורש. אם בכל זאת הופיע טקסט — לייצר מחדש, לא לנסות לתקן.
- **פרומפט אחד רציף** עובד טוב יותר מרשימת בולטים.

## עדיפות

אם מייצרים רק שניים: **01-crane** ו-**04-hero**. הראשון נותן את חציית
האזורים, השני מוציא את ההירו מרקע שחור שטוח — וזה מה שהכי חסר כרגע.

---

## 01-crane

`1024×1536 · לאורך · PNG שקוף`

הציר האנכי של עמוד הבית. השרשרת יוצאת מהקצה העליון של הפריים; ההארכה
לגובה מלא נעשית בקוד, כך שהתמונה צריכה רק את החלק התחתון של המנוף.

```
A photorealistic industrial overhead bridge crane hook assembly, isolated
on a fully transparent background with no backdrop of any kind. A heavy
galvanised steel load chain enters at the very top edge of the frame and
descends straight down through the upper third, its interlocking oval
links catching a cold rim light. The chain terminates in a massive cast
steel hook block painted in weathered safety orange, its paint chipped
along every edge to reveal bare grey metal underneath, with dark grease
streaks running down from the sheave housing. Below it hangs a single
forged steel crane hook, also orange, its throat worn smooth and shiny
from years of load contact. Two taut grey nylon lifting slings run
diagonally down from the hook to a tightly bundled stack of long steel
bars in the lower portion of the frame, secured with bright orange
ratchet straps. The whole assembly is lit by a single warm work lamp from
the upper left, leaving cool blue-grey shadows on the right side of every
surface. Documentary industrial photography shot on an 85mm lens from
slightly below, sharp focus throughout, subtle film grain, no glossy CGI
rendering. Absolutely no text, no letters, no numbers, no labels, no
stamps, no logos, no watermarks anywhere in the image.
```

## 02-seal

`1024×1024 · ריבוע · PNG שקוף`

המוטיב המרכזי, ומועמד ללוגו. חותם הנעילה הוא ההוכחה הפיזית שאיש לא פתח
את המשלוח — כלומר בדיוק מה שהוא מוכר.

```
An extreme close-up macro photograph of a shipping container bolt security
seal, isolated on a fully transparent background with no backdrop of any
kind. The seal is a heavy cylindrical steel bolt lock with a moulded
bright safety-orange plastic housing gripping the bolt head, the type used
to lock the doors of freight containers after loading. The steel shaft is
brushed and slightly scuffed from handling, with fine scratches catching
the light and a faint bloom of surface oxidation near the shoulder. The
orange plastic has a matte injection-moulded texture with a visible seam
line and a small sprue mark. Shot at a three-quarter angle so both the
cylindrical body and the flat locking face are visible, lit by a single
hard warm light from the upper left that rakes across the surface and
throws the right side into deep cool shadow, revealing every texture.
Product macro photography on a 100mm macro lens, extremely sharp detail,
shallow depth of field falling off at the rear edge, subtle film grain.
The seal body must be completely blank and unmarked — absolutely no text,
no serial numbers, no digits, no barcodes, no engraving, no logos, no
branding, no watermarks anywhere.
```

## 03-floor

`1536×1024 · לרוחב · PNG שקוף בקצוות`

גולש מעבר לקצה בסקציית "מי אני". הקצוות צריכים להיעלם בהדרגה כדי
שההשתלבות ברקע הכהה תהיה חלקה.

```
The interior of a large Chinese metal fabrication factory during the night
shift, photographed in deep one-point perspective looking straight down a
long production aisle. Rows of heavy CNC machining centres and press
brakes recede into darkness on both sides, their steel housings painted a
faded industrial grey-green, with coiled hydraulic lines and control
panels facing the aisle. Stacks of raw steel stock and finished parts sit
in metal pallet cages along the walls. High overhead, a line of sodium
work lamps hangs from the roof trusses, each casting a warm pool of light
onto the polished concrete floor below, with fine metal dust and haze
hanging in the air catching the beams. The far end of the aisle disappears
into shadow. No people anywhere in the frame. The image should fade
smoothly to full transparency at all four edges, isolated on a transparent
background with alpha, so it can be composited over a near-black surface.
Cinematic documentary photography on a 35mm lens, cool blue-grey shadows
against the warm lamps, heavy atmosphere, subtle film grain, no glossy CGI
rendering. Absolutely no text, no letters, no numbers, no signage, no
posters, no logos, no watermarks anywhere in the image.
```

## 04-hero

`1536×1024 · לרוחב · JPG`

רקע ההירו, מוכהה ב-CSS. זה מה שיוציא את ראש העמוד מרקע שחור שטוח.
הצד הימני של הפריים צריך להישאר כהה ופנוי — שם יושבת הכותרת.

```
The exterior of a large Chinese industrial factory compound photographed
at night from across an empty loading yard. A long low-slung fabrication
hall stretches across the left and centre of the frame, its corrugated
steel cladding weathered to a dull charcoal, with a row of tall windows
glowing warm amber from the production floor still working inside. A heavy
steel sliding gate stands closed at the centre-left, its safety-orange
paint chipped, flanked by concrete bollards. Wet asphalt in the
foreground reflects the lights in long broken streaks. A thin mist hangs
in the cold air, softening the distant lamps into halos. The right third
of the frame is almost entirely dark empty sky and shadow, deliberately
left clear and uncluttered as negative space. No people, no vehicles in
motion. Cinematic night photography on a 35mm lens, very low key, cool
blue-grey darkness broken only by warm interior light, deep blacks,
subtle film grain, no glossy CGI rendering. Absolutely no text, no
letters, no numbers, no Chinese characters, no signage, no banners, no
logos, no watermarks anywhere in the image.
```

## 05-consol

`1536×1024 · לרוחב · PNG שקוף`

לסיפור "עשרה ספקים, מכולה אחת" — השירות הכי ייחודי שלו, ואין לו כרגע
שום ייצוג ויזואלי.

```
A precise isometric 3D technical illustration on a fully transparent
background with no backdrop of any kind. Scattered across the upper half
of the frame are ten small shipping crates and parcels of clearly
different sizes and proportions — some raw pine wood crates with visible
grain and nail heads, some dark cardboard cartons, some wrapped pallets —
each floating at a slightly different height as if suspended. From each
one, a thin glowing safety-orange line descends and curves inward, all ten
lines converging smoothly toward a single point at the bottom centre of
the frame, where they meet one large forty-foot shipping container
rendered in dark matte charcoal steel with visible corrugation ribs and
door hardware, its doors open toward the viewer. The orange lines emit a
soft glow onto the surfaces they pass. Materials are matte and physical,
not shiny: raw wood, dark oxidised steel, matte cardboard. Clean technical
diagram aesthetic with accurate isometric projection, no ground plane, no
cast shadows on the background, no environment. Absolutely no text, no
letters, no numbers, no labels, no shipping marks, no logos, no
watermarks anywhere in the image.
```

## 06-arrival

`1536×1024 · לרוחב · JPG`

הפואנטה של הקונספט, בסקציה הבהירה בתחתית העמוד. **הפוך בכוונה מכל
השאר** — בהיר, רגוע, משעמם. הסוף הטוב של עסקת יבוא הוא שלא קרה כלום.

```
A forty-foot shipping container standing inside a bright modern Israeli
distribution warehouse in clear morning daylight, its two doors swung wide
open toward the camera. Inside the container, goods are stacked in perfect
order on wooden pallets, shrink-wrapped in clean translucent film, every
stack squared off and flush, filling the container evenly from floor to
ceiling with nothing out of place. The warehouse around it is calm and
uncluttered: smooth pale concrete floor with faint tyre marks, white
painted walls, tall clerestory windows high on the far wall letting in
soft diffuse daylight that fills the space with no harsh shadows. A
forklift sits parked and still in the far background. The container
exterior is a muted weathered blue-grey with visible corrugation. The
overall mood is quiet, resolved and completely ordinary — the calm of a
delivery that went exactly to plan. No people. Clean architectural
photography on a 35mm lens, natural daylight white balance, bright and
airy, very low contrast compared to a night scene, subtle film grain.
Absolutely no text, no letters, no numbers, no shipping marks, no
container numbers, no signage, no logos, no watermarks anywhere.
```

---

## ובמקביל — תמונות אמיתיות משחר

הצוות שלו כבר מצלם בביקורי מפעלים ובבקרות איכות. תמונה אמיתית שלו על
רצפת ייצור סינית תעשה מה ששום רינדור לא יעשה באתר שכל תפקידו לשרוד
בדיקת רקע. כדאי לבקש: ביקור במפעל, דוח QC על שולחן, מכולה בהעמסה,
ותיק התקינה בן 800 העמודים.
