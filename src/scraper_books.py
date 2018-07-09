import requests
import bs4
import json
import os
import re

outdir = 'books'

if not os.path.exists(outdir):
    os.makedirs(outdir)

cookies = {'birthtime': '568022401'}

resp = requests.get('https://www.goodreads.com/genres/classics', cookies=cookies)
resp.raise_for_status()

homepage = bs4.BeautifulSoup(resp.text)
book_urls = list(map(lambda x: 'https://www.goodreads.com/{}'.format(x.a.get('href')), homepage.select('.coverWrapper')))

re_date = re.compile(r'([a-zA-Z]* \d\d?[a-zA-Z]{2} )?(\d\d\d\d)')

for url in book_urls:

    if os.path.exists(os.path.join(outdir, '{}.json'.format(url))):
        print('already scraped {}. Continuing'.format(url))
        continue

    print('reading {}'.format(url))
    resp = requests.get(url, cookies=cookies)
    resp.raise_for_status()

    book = bs4.BeautifulSoup(resp.text)

    name = ' '.join(book.title.text.split()) 
    description = book.find('div', {'id': 'descriptionContainer'}).find_all('span')[-1].text
    release_date = re_date.findall(site.find('div', {'id': 'details', 'class': 'uitext darkGreyText'}).find_all('div', {'class': 'row'})[-1].text)[0]
    release_date = ''.join(release_date) if release_date[0] != '' else release_date[1]
    image_link = site.find('img', {'id': 'coverImage'}).get('src')
    score = int(20 * float(site.find('span', {'class': 'average'}).text))

    data = {'name': name,
            'desc': description,
            'releaseDate': release_date,
            'imageLink': image_link,
            'score': score}

    with open(os.path.join(outdir, '{}.json'.format(i)), 'w') as fp:
        json.dump(data, fp)
