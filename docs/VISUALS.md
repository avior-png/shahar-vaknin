# ויזואלים — מפרט לייצור

הפריסה כבר בנויה סביב הקבצים האלה. כל עוד קובץ חסר, מוצג במקומו
מציין מקום מסומן במידות המדויקות — כך שהמבנה נכון עוד לפני שהתמונות קיימות.

## איך מכניסים קובץ

שומרים אותו ב-`public/visuals/` בשם המדויק מהטבלה (סיומת `.png`, `.webp`
או `.jpg` — הקוד מזהה לבד). זהו. אין מה לשנות בקוד.

## חוקי בסיס — לצרף לסוף כל פרומפט

```
Cinematic industrial photography, near-black background #0E0F11, cool
blue-grey shadows, single warm key light from upper left, safety-orange
#E8541F appearing only as real painted metal or hi-vis fabric. Documentary
realism, shot on 85mm, subtle film grain. No glossy CGI look.
Absolutely no text, no letters, no numbers, no signage, no logos anywhere.
```

**אין טקסט באף תמונה.** מחוללי תמונות הורסים עברית וסינית, וכל הטקסט באתר
יושב ב-HTML ממילא.

---

## 01-crane — הציר

`PNG שקוף · 1440×3400 · לאורך מאוד`

**הנכס החשוב ביותר.** זה האלמנט שחוצה שלושה אזורים לגובה — הירו, רצועת
הנתונים והבעיה — והתוכן זורם לצידו. הפריסה כבר שומרת לו עמודה בצד שמאל
(`.spine-safe` ב-`globals.css`).

חשוב: מנוף **גשר של מפעל**, לא מנוף נמל. הרפרנס עוסק בהעמסה ברציף; אנחנו
בתוך המפעל. השרשרת צריכה להתחיל בקצה העליון של הפריים ולרדת לאורך כולו.

```
An overhead factory bridge crane hook with heavy steel chain descending
vertically, isolated on a fully transparent background. The chain enters
at the very top of the frame and runs its full height; the hook block
occupies the lower third, carrying a bundle of steel bars. Weathered
steel, chipped safety-orange paint on the hook block, visible rust.
Shot from slightly below inside a factory hall. Extremely tall narrow
vertical composition, PNG with alpha.
```

## 02-seal — המוטיב

`PNG שקוף · 1600×1600`

נכנס לסקציה הכתומה, גדול ונחתך בקצה המסך. זה גם המועמד המוביל ללוגו:
חותם הנעילה הוא ההוכחה הפיזית שאיש לא פתח את המשלוח — כלומר בדיוק
מה שהוא מוכר.

```
Extreme close-up macro of a shipping container bolt security seal — a
cylindrical steel bolt lock with a bright orange plastic housing, the type
that locks cargo container doors. Isolated on a fully transparent
background, three-quarter angle, dramatic side lighting revealing metal
texture and scuffing from handling. Photorealistic, sharp detail, PNG with
alpha. The seal body must be completely blank and unmarked.
```

## 03-floor — רצפת הייצור

`PNG שקוף · 2000×1500`

גולש מעבר לקצה בסקציית "מי אני", בעמוד הבית ובעמוד האודות.

```
Interior of a Chinese metal fabrication factory during night shift, deep
one-point perspective down a long production line. Rows of CNC machines
and steel stock receding into darkness, overhead industrial lamps casting
pools of warm light, faint haze in the air. No people visible. Isolated on
a transparent background with the edges fading out, PNG with alpha.
```

## 05-consol — איחוד ספקים

`PNG שקוף · 2200×1500`

בעמוד השירותים. זה השירות הכי ייחודי שלו ואין לו כרגע שום ייצוג ויזואלי.

```
Isometric 3D illustration on a fully transparent background: ten small
wooden crates and parcels of varying sizes scattered across the upper
area, connected by thin glowing orange lines that converge downward into a
single large shipping container at the bottom center. Dark matte steel and
raw wood materials, orange accent lighting along the converging lines.
Clean technical diagram aesthetic, precise isometric projection, no ground
plane, no shadows on the background.
```

## 06-arrival — הנחיתה בישראל

`JPG · 2600×1700 · לרוחב`

הפואנטה של כל הקונספט, בסקציה הבהירה בתחתית עמוד הבית. **הפוך בכוונה
מכל השאר** — בהיר, רגוע, משעמם. הסוף הטוב של עסקת יבוא הוא שלא קרה כלום.

```
A 40-foot shipping container, doors open, standing in a bright Israeli
warehouse in clear morning daylight. Inside, goods are neatly stacked,
shrink-wrapped and orderly on pallets. Clean concrete floor, pale walls,
soft natural light from high windows. Calm, resolved, ordinary. No people.
```

---

## עדיפות

אם מייצרים רק שניים: **01-crane** ו-**06-arrival**. הראשון נותן את אפקט
העומק וחציית האזורים; השני הוא הפואנטה של הקונספט.

## ובמקביל — לבקש משחר תמונות אמיתיות

הצוות שלו כבר מצלם בביקורי מפעלים ובבקרות איכות. תמונה אמיתית שלו על
רצפת ייצור סינית תעשה מה ששום רינדור לא יעשה באתר שכל תפקידו לשרוד
בדיקת רקע. כדאי לבקש: ביקור במפעל, דוח QC, מכולה בהעמסה, תיק התקינה.
