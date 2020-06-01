'use strict';

const assert = require('chai').assert;
const fs = require('fs');

const status = require('../lib/status');

suite('Status', function () {
    let html;
    setup('load test html', (done) => {
        fs.readFile('test/status.html', { encoding: 'utf-8' }, (err, data) => {
            html = data;
            done(err);
        });
    });

    test('Downstream Channel Count', () => {
        const channels = status.parseDownstreamChannels(html);
        assert.equal(channels.length, 33, 'Wrong number of channels');
    });

    test('Downstream Channel Columns', () => {
        const channels = status.parseDownstreamChannels(html);
        const channel = channels[0];
        assert.equal(channel.channelId, 21, 'ChannelId is wrong');
        assert.equal(channel.lockStatus, 'Locked', 'LockStatus is wrong');
        assert.equal(channel.modulation, 'QAM256', 'Modulation is wrong');
        assert.equal(channel.frequency, 657000000, 'Frequency is wrong');
        assert.equal(channel.power, 1.9, 'Power is wrong');
        assert.equal(channel.SNRMER, 35.8, 'SNRMER is wrong');
        assert.equal(channel.corrected, 468, 'Corrected is wrong');
        assert.equal(channel.uncorrected, 53, 'Uncorrected is wrong');
    });

    test('Upstream Channel Count', () => {
        const channels = status.parseUpstreamChannels(html);
        assert.equal(channels.length, 4, 'Wrong number of channels');
    });

    test('Upstream Channel Columns', () => {
        const channels = status.parseUpstreamChannels(html);
        const channel = channels[0];
        assert.equal(channel.channel, 1, 'Channel is wrong');
        assert.equal(channel.channelId, 1, 'ChannelId is wrong');
        assert.equal(channel.lockStatus, 'Locked', 'LockStatus is wrong');
        assert.equal(channel.usChannelType, 'SC-QAM', 'USChannelType is wrong');
        assert.equal(channel.frequency, 17600000, 'Frequency is wrong');
        assert.equal(channel.width, 6400000, 'Width is wrong');
        assert.equal(channel.power, 47.0, 'Power is wrong');
    });

});