import requests
import bs4
import json
import os
import re

outdir = 'movies'

if not os.path.exists(outdir):
    os.makedirs(outdir)

cookies = {'birthtime': '568022401'}

resp = requests.get('https://www.imdb.com/chart/top?ref_=nv_mv_250_6', cookies=cookies)
resp.raise_for_status()

homepage = bs4.BeautifulSoup(resp.text)
movie_urls = list(map(lambda x: 'https://www.imdb.com{}'.format(x.a.get('href')), homepage.find_all('td', {'class': 'titleColumn'})))

#re_date = re.compile(r'([a-zA-Z]* \d\d?[a-zA-Z]{2} )?(\d\d\d\d)')

for url in movie_urls[:50]:

    if os.path.exists(os.path.join(outdir, '{}.json'.format(url))):
        print('already scraped {}. Continuing'.format(url))
        continue

    print('reading {}'.format(url))
    resp = requests.get(url, cookies=cookies)
    resp.raise_for_status()

    movie = bs4.BeautifulSoup(resp.text)

    name = ' '.join(movie.find('h1', {'itemprop': 'name', 'class': ''}).text.split('\xa0'))
    description = movie.find('div', {'class': 'summary_text'}).text.strip()
    release_date = movie.find('meta', {'itemprop': 'datePublished'}).get('content')
    image_link = movie.find('div', {'class', 'poster'}).a.img.get('src')
    score = int(10 * float(movie.find('span', {'itempro[': 'ratingValue'}).text))

    data = {'name': name,
            'desc': description,
            'releaseDate': release_date,
            'imageLink': image_link,
            'score': score}

    with open(os.path.join(outdir, '{}.json'.format('-'.join(url.split('/')))), 'w') as fp:
        json.dump(data, fp)
