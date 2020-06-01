# Arris Status

I found myself wanting to track the status of the QAM channels on my Arris Surfboard 8200 cable modem over time.  I couldn't find an API for it that returned JSON.  This package does a simple scrape of the status page and returns the downstream and upstream channels as json.

## Usage

```js
const status = require('arris-status');
const channels = await status.get('http://192.168.100.1);
```

## Returned object

The return object if of the shape:

```js
{
    downstream: [
        {
            channelId: '21',
            lockStatus: 'Locked',
            modulation: 'QAM256',
            frequency: '657000000',
            power: '1.6',
            SNRMER: '36.1',
            corrected: '473',
            uncorrected: '53'
        },
        ...
    ],
    upstream: [
        {
            channel: '3',
            channelId: '5',
            lockStatus: 'Locked',
            usChannelType: 'SC-QAM',
            frequency: '30400000',
            width: '6400000',
            power: '48.0'
        },
        ...
    ]
}
```

This structure closely matches the table structure of the status page for my firmware version.


