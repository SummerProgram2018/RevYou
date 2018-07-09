import requests
import bs4
import re
import json
import os

if not os.path.exists('output'):
    os.makedirs('output')

cookies = {'birthtime': '568022401'}

resp = requests.get('https://steamcommunity.com/id/Burnsy88/games/?tab=all', cookies=cookies)
resp.raise_for_status()

homepage = bs4.BeautifulSoup(resp.text)
re_appid = re.compile(r'"appid"\:(\d*)')
re_rating = re.compile(r'\d\d\%')

app_ids = re_appid.findall(homepage.text)

for i in app_ids:

    url = 'https://store.steampowered.com/app/{}'.format(i)
    if os.path.exists(os.path.join('output', '{}.json'.format(i))):
        print('already scraped {}. Continuing'.format(i))
        continue

    print('reading {}'.format(url))
    resp = requests.get(url, cookies=cookies)
    resp.raise_for_status()

    gamepage = bs4.BeautifulSoup(resp.text)

    if len(gamepage.select('.apphub_AppName')) == 0:
        print('Age restriction page, dunno how to bypass')
        continue

    scorelist = re_rating.findall(gamepage.select('.responsive_reviewdesc')[-1].get_text())
    if len(scorelist) == 0:
        continue

    
    release_date = gamepage.select('.date')
    if len(release_date) != 0:
        release_date = release_date[0].get_text()
    else:
        continue

    name = gamepage.select('.apphub_AppName')[0].get_text()

    description = gamepage.select('.game_description_snippet')
    description = description[0].get_text() if len(description) != 0 else ''

    image_link = gamepage.select('.game_header_image_full')
    image_link = image_link[0].get('src') if len(image_link) != 0 else 'https://i.imgur.com/TybTuTL.gif'

    score = int(scorelist[0][:-1])
    

    data = {'name': name,
            'desc': description,
            'releaseDate': release_date,
            'imageLink': image_link,
            'score': score}

    with open(os.path.join('output', '{}.json'.format(i)), 'w') as fp:
        json.dump(data, fp)
