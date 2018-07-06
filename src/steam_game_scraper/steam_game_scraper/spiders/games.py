from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_TARGET_CONCURRENCY = 4.0

HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 0

class GameSpider(CrawlSpider):

    name = 'games'
    start_urls = ["http://store.steampowered.com/search/?sort_by=Released_DESC"]
    allowed_domains = ["steampowered.com"]

    rules = [
        Rule(
            LinkExtractor(
                allow='/app/(.+)/',
                restrict_css='#search_result_container'
            ),
            callback='parse_product'
        ),

        Rule(
            LinkExtractor(
                allow='page=(\d+)',
                restrict_css='.search_pagination_right'
            )
        )
    ]

    def parse(self, response):
        
        return {
            'game_name': response.css('.apphub_AppName::text').extract_first(),
            'blurb': response.css('.game_description_snippet::text').extract(),
            'release_date': response.css('.date::text').extract(),
            'image_link': response.css('.game_header_image_full::text').extract(),
            'approval': response.css('.nonresponsive_hidden responsive_reviewdesc::text').extract()
        }
