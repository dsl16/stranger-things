var Twitter = require('twitter');
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws_config.json')

var kinesis = new AWS.Kinesis();

var client = new Twitter({
   consumer_key: "XXXX",
   consumer_secret: "XXXX",
   access_token_key: "XXXX",
   access_token_secret: "XXXX"
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
});
