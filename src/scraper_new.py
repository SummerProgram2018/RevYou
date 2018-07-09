import requests
import bs4
import re
import json
import os

resp = requests.get('https://steamcommunity.com/id/Burnsy88/games/?tab=all')
resp.raise_for_status()

homepage = bs4.BeautifulSoup(resp.text)
re_appid = re.compile(r'"appid"\:(\d*)')
re_rating = re.compile(r'\d\d\%')

app_ids = re_appid.findall(homepage.text)

for i in app_ids:
    url = 'https://store.steampowered.com/app/{}'.format(i)
    if os.path.exists('output/{}.json'.format(i)):
        print('already scraped {}. Continuing'.format(i))
        continue

    print('reading {}'.format(url))
    resp = requests.get(url)
    resp.raise_for_status()

    gamepage = bs4.BeautifulSoup(resp.text)

    if len(gamepage.select('.apphub_AppName')) == 0:
        print('Age restriction page, dunno how to bypass')
        continue

    scorelist = re_rating.findall(gamepage.select('.responsive_reviewdesc')[-1].get_text())
    if len(scorelist) == 0:
        continue

    
    name = gamepage.select('.apphub_AppName')[0].get_text()

    description = gamepage.select('.game_description_snippet')
    description = description[0].get_text() if len(description) != 0 else ''

    release_date = gamepage.select('.date')[0].get_text()

    image_link = gamepage.select('.game_header_image_full')[0].get('src')
    image_link = image_link[0].get('src') if len(image_link) != 0 else 'https://i.imgur.com/TybTuTL.gif'

    score = int(scorelist[0][:-1])
    

    data = {'name': name,
            'desc': description,
            'releaseDate': release_date,
            'imageLink': image_link,
            'score': score}

    with open('output/{}.json'.format(i), 'w') as fp:
        json.dump(data, fp)
