"""בונה preview.html בקובץ יחיד מתוך הבילד החי של Next."""
import re, subprocess, sys

BASE = "http://127.0.0.1:3100"
src = open('home.html', encoding='utf-8').read()

hrefs = re.findall(r'<link rel="stylesheet" href="(/_next/static/[^"]+\.css)"', src)
seen, css = [], []
for h in hrefs:
    if h in seen: continue
    seen.append(h)
    css.append(subprocess.run(['curl','-sS','--noproxy','*',BASE+h],
                              capture_output=True, text=True).stdout)
css = "\n".join(css)
if len(css) < 5000:
    sys.exit(f"CSS looks empty ({len(css)} bytes)")

m = re.search(r'<body[^>]*class="([^"]*)"[^>]*>(.*)</body>', src, re.S)
body_class, body = m.group(1), m.group(2)
body = re.sub(r'<script\b.*?</script>', '', body, flags=re.S)
body = re.sub(r'<link\b[^>]*>', '', body)
body = re.sub(r'<a href="#main"[^>]*>.*?</a>', '', body, flags=re.S)

FONTS = ("https://fonts.googleapis.com/css2?family=Secular+One"
         "&family=Assistant:wght@400;600;700"
         "&family=IBM+Plex+Mono:wght@400;600&display=swap")

override = """
/* preview בלבד: פונטים מגוגל במקום האירוח העצמי של Next */
html, :root, body, #preview-root{
  --font-secular:"Secular One","Arial Hebrew",Arial,sans-serif!important;
  --font-assistant:"Assistant","Segoe UI",Arial,sans-serif!important;
  --font-plex:"IBM Plex Mono",ui-monospace,Menlo,monospace!important;
}
html{background:#0E0F11}
body{margin:0;background:#0E0F11;color:#E8E6E1}
#preview-root{direction:rtl;text-align:right}
"""

script = """<script>
(function(){try{
 if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 document.documentElement.classList.add("js");
 var io=new IntersectionObserver(function(es){es.forEach(function(e){
   if(e.isIntersecting){e.target.classList.add("is-in");io.unobserve(e.target);}});},
   {rootMargin:"0px 0px -8% 0px",threshold:.06});
 document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
}catch(e){}})();
</script>"""

out = ('<title>אתר שחר וקנין</title>\n'
       '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
       '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
       f'<link rel="stylesheet" href="{FONTS}">\n'
       f'<style>{css}\n{override}</style>\n'
       f'<div id="preview-root" dir="rtl" class="{body_class}">{body}</div>\n{script}')
open('preview.html','w',encoding='utf-8').write(out)
print("preview:", len(out), "bytes · css:", len(css))
