import json, sys, os, urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageDraw
out, tag = sys.argv[1], sys.argv[2]
items = json.load(open(f"{out}/{tag}/index.json"))
def grab(i):
    p = f"{out}/{tag}/{i:03d}.jpg"
    if not os.path.exists(p):
        try:
            data = urllib.request.urlopen(urllib.request.Request("https://cdn.stocksnap.io/img-thumbs/280h/" + items[i]["file"], headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read()
            open(p, "wb").write(data)
        except Exception as e:
            return None
    return i
ok = [i for i in ThreadPoolExecutor(12).map(grab, range(len(items))) if i is not None]
for s in range(0, len(ok), 24):
    sheet = Image.new("RGB", (6 * 300, 4 * 230), "white"); d = ImageDraw.Draw(sheet)
    for k, i in enumerate(ok[s:s + 24]):
        im = Image.open(f"{out}/{tag}/{i:03d}.jpg").convert("RGB"); im.thumbnail((296, 200))
        x, y = (k % 6) * 300, (k // 6) * 230
        sheet.paste(im, (x + 2, y + 2)); d.rectangle([x + 2, y + 204, x + 60, y + 226], fill="black"); d.text((x + 6, y + 208), str(i), fill="white")
    sheet.save(f"{out}/{tag}-sheet{s // 24}.jpg", quality=80)
print(len(items), len(ok))
