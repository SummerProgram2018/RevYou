import requests
import bs4
import re
import json
import os

outdir = 'shoes'

if not os.path.exists(outdir):
    os.makedirs(outdir)

cookies = {'birthtime': '568022401'}

categories = ['http://blueheelerboots.com.au/Rossi/Rossi-Non-Safety',
              'http://blueheelerboots.com.au/Blundstones/Blundstone-NON-SAFETY',
              'http://blueheelerboots.com.au/Redback/Redback-Non-Safety']

for cat in categories:

    manufacturer = cat.split('/')[3]

    resp = requests.get(cat, cookies=cookies)
    resp.raise_for_status()

    homepage = bs4.BeautifulSoup(resp.text)

    boot_urls = list(map(lambda x: x.a.get('href'), homepage.find('table', {'class', 'list'}).find('tr').find_all('td', {'width': '25%'})))

    for url in boot_urls:

        print('reading {}'.format(url))
        resp = requests.get(url, cookies=cookies)
        resp.raise_for_status()

        bootpage = bs4.BeautifulSoup(resp.text)

        model = bootpage.find('h1').text

        name ='{} {}'.format(manufacturer, model)
        description = bootpage.find('div', {'id': 'tab_description'}).text
        release_date = '1970-01-01'
        image_link = bootpage.find('img', {'id': 'image'}).get('src')
        score = 80

        data = {'name': name,
                'desc': description,
                'releaseDate': release_date,
                'imageLink': image_link,
                'score': score}

        with open(os.path.join(outdir, '{}.json'.format('_'.join(name.split(' ')))), 'w') as fp:
            json.dump(data, fp)
