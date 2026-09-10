import urllib.request
import json
import re

url = "https://html.duckduckgo.com/html/?q=woman+wheelchair+laughing+sweater+park"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'src="//(tse[0-9]\.mm\.bing\.net/th\?id=[^"]+)"', html)
    for img in images[:3]:
        print("https://" + img)
except Exception as e:
    print(e)
