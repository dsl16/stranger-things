var Twitter = require('twitter');
var AWS = require('aws-skd');

AWS.config.loadFromPath('./aws_config.json')

var kinesis = new AWS.Kinesis();

var client = new Twitter({
   "consumer_key": "UPjSUh1WqLTuvMBUgmON3oBdJ",
   "consumer_secret": "tr2nKOHoGKpjovd5p1A6DmOY2jTDET9Dx5VzFdoXs0ebTxeuOq",
   "access_token": "905583025-ER5ieDOI0dfA6nVTNslSZVREf1LM5pd2xAYZXkuZ",
   "access_token_secret": "FR0DxmZJ0xjHIX492VJCD5qRdL2iuY51GqaqZkMzajaMY"
});

var stream = client.stream('statuses/filter', {
  track: 'cat',
  language: 'en'
});

stream.on('data', function(event) {
  if (event.text) {

    var record = JSON.stringify({
      id: event.id,
      timestamp: event['created_at'],
      tweet: event.text.replace(/["'}{|]/g, '')
    }) + '|';

    kinesis.putRecord({
      Data: record,
      StreamName: 'twitterStream',
      PartitionKey: 'key'
    },
    function (err, data) {
      if (err) {
        console.error(err);
      }
      console.log('sending: ', event.text);
    });
  }
});

stream.on('error', function (error) {
  throw error;
})
