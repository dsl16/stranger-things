import scrapy
import time
import pandas as pd
import subprocess

import json

def lambda_handler(event, context):
    # TODO implement
    subprocess.Popen("scrapy crawl mangatracker")

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

class MangaSpider(scrapy.Spider):
    name = "mangatracker"
    start_urls = [
        'http://www.tenmanga.com/book/KINGDOM',
        'http://www.tenmanga.com/book/Hardcore+Leveling+Warrior'
    ]

    def parse(self, response):
        import_time = time.strftime("%Y-%m-%d_%H_%M_%S")
        title = response.url.split("/")[-1]
        filename = '%s-%s.csv' % (title,import_time)
        with open(filename, 'wb') as f:
            chapter_list = response.xpath('//div[@class="chapter-name short"]/a').getall()
            if len(chapter_list) == 0:
                # Raise an issue on no chapters found
                pass
            chapter_df = pd.DataFrame({'chapters':chapter_list,})
            chapter_df.to_csv(filename)
        self.log('Saved file %s' % filename)

if __name__ == "__main__":
    pass
