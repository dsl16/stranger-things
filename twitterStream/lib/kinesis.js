var Twitter = require('twitter');
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws_config.json')

var kinesis = new AWS.Kinesis();

var client = new Twitter({
   consumer_key: "sIk7RAYOcc0yqfVYPKgsTsJwK",
   consumer_secret: "1xFtDLuIipjgGrbgqpkAvEw1K6EeSEpsI50pVLt7B32xtZHj2q",
   access_token_key: "905583025-hE09VtsGXijgCjVgEvr3qBD3QaPCzx3t4gULBNvQ",
   access_token_secret: "eNNC2uWCjx00FPTc4QbTaaQ0lsMKMPxfzlIrcO0WZdJ7o"
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
