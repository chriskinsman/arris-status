'use strict';

const cheerio = require('cheerio');
const debug = require('debug')('arris-status:status');

const _downstreamColumns = [
    'channelId',
    'lockStatus',
    'modulation',
    'frequency',
    'power',
    'SNRMER',
    'corrected',
    'uncorrected'
];

const _upstreamColumns = [
    'channel',
    'channelId',
    'lockStatus',
    'usChannelType',
    'frequency',
    'width',
    'power'
];

function parseChannels(html, channelHeader, columns) {
    try {
        debug(`html: ${html}`);
        const $ = cheerio.load(html);
        const header = $(`tr th strong:contains('${channelHeader}')`);
        const table = header.closest('table');
        // Eliminate two header rows
        const rows = table.find('tr').slice(2);
        const channels = [];
        rows.each(function (i, e) {
            const channel = {}
            $(this).find('td').each(function (i, e) {
                // Split strips off units
                channel[columns[i]] = $(this).text().split(' ')[0];
            });
            channels.push(channel);
        });

        return channels;
    }
    catch (e) {
        console.error(e);
    }
}

module.exports.parseDownstreamChannels = function parseDownstreamChannels(html) {
    return parseChannels(html, 'Downstream Bonded Channels', _downstreamColumns);
};

module.exports.parseUpstreamChannels = function parseUpstreamChannels(html) {
    return parseChannels(html, 'Upstream Bonded Channels', _upstreamColumns);
};
