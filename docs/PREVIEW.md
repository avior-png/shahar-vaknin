# הפקת preview בקובץ יחיד

מייצר `preview.html` עצמאי מתוך הבילד — לשיתוף ולאישור עיצוב בלי לפרוס.

```bash
npm run build
PORT=3100 npm start &
curl -sS --noproxy '*' -o home.html http://127.0.0.1:3100/
python3 scripts/mkpreview.py
```

הסקריפט מטמיע את ה-CSS, מחליף את הפונטים המאוחסנים עצמית בטעינה מ-Google
Fonts, מסיר את סקריפטי ההידרציה של Next ומוסיף סקריפט חשיפה קטן.
