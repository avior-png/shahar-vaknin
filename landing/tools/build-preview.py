#!/usr/bin/env python3
"""
בונה מדף הנחיתה קובץ HTML אחד, עומד בעצמו — ל-preview ולביקורת.

למה: index.html טוען CSS, JS ותמונות בנפרד, ולכן אי אפשר פשוט לשלוח
אותו למישהו. הסקריפט מטמיע את הכול פנימה (התמונות כ-data URI) ומייצר
קובץ אחד שנפתח בכל דפדפן, וגם מתאים לפרסום כ-Artifact ב-Claude.

מקור האמת נשאר index.html + landing.css + landing.js. הקובץ הזה נבנה
מהם ולא נערך ביד — מריצים מחדש אחרי כל שינוי.

    python3 landing/tools/build-preview.py [קובץ-יעד]

בלי ארגומנט הפלט נכתב לתיקייה זמנית, והנתיב מודפס.
"""
import base64
import mimetypes
import pathlib
import re
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE.parent                                   # תיקיית landing/
# הקישורים המשפטיים בפוטר יחסיים לאתר. ב-preview הם מצביעים לעמודים
# החיים, כדי שלא ייראו כשבורים אצל מי שבודק.
LIVE = "https://avior-png.github.io/shahar-vaknin/"


def build() -> str:
    html = (SRC / "index.html").read_text(encoding="utf-8")
    css = (SRC / "landing.css").read_text(encoding="utf-8")
    js = (SRC / "landing.js").read_text(encoding="utf-8")

    # 1 · גוף הדף בלבד — הקובץ הבודד נבנה סביבו
    body = re.search(r"<body>(.*)</body>", html, re.S).group(1)
    body = body.replace('<script src="landing.js"></script>', "")

    # 2 · קישור הגופנים מה-head המקורי
    fonts = re.search(r'(<link href="https://fonts\.googleapis\.com[^>]+>)', html).group(1)

    # 3 · התמונות נכנסות כ-data URI, כדי שהקובץ יעמוד בעצמו
    def inline(m):
        rel = m.group(1)
        f = SRC / rel
        mime = mimetypes.guess_type(f.name)[0] or "application/octet-stream"
        b64 = base64.b64encode(f.read_bytes()).decode("ascii")
        print(f"  {rel}: {f.stat().st_size / 1024:.0f}KB")
        return f'src="data:{mime};base64,{b64}"'

    print("inlining images:")
    body = re.sub(r'src="(img/[^"]+)"', inline, body)

    for page in ("accessibility.html", "privacy.html", "terms.html"):
        body = body.replace(
            f'href="../{page}"',
            f'href="{LIVE}{page}" target="_blank" rel="noopener"',
        )

    # 4 · כשמפרסמים כ-Artifact, השלד עוטף את הקובץ בלי dir="rtl".
    #     הדף עצמו נושא <html lang="he" dir="rtl">, ולכן צריך להחזיר
    #     את הכיווניות: CSS למניעת הבהוב, ותכונה בפועל.
    rtl = (
        "<style>html{direction:rtl}</style>\n"
        "<script>document.documentElement.setAttribute('dir','rtl');"
        "document.documentElement.setAttribute('lang','he');</script>\n"
    )

    return (
        "<title>מחשבון יבוא מסין</title>\n"
        f"{rtl}{fonts}\n<style>\n{css}\n</style>\n{body}\n<script>\n{js}\n</script>\n"
    )


def main() -> None:
    out = (
        pathlib.Path(sys.argv[1]).expanduser().resolve()
        if len(sys.argv) > 1
        else pathlib.Path(tempfile.gettempdir()) / "lp-preview.html"
    )
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(build(), encoding="utf-8")
    print(f"\nwrote {out} · {out.stat().st_size / 1024 / 1024:.2f}MB")


if __name__ == "__main__":
    main()
