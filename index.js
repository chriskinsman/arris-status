'use strict';

'use strict';

const debug = require('debug')('arris-status');
const superagent = require('superagent');

const status = require('./lib/status');

module.exports.get = async function get(uri) {
    try {
        const res = await superagent.get(uri);
        if (res.statusCode === 200) {
            return {
                downstream: status.parseDownstreamChannels(res.text),
                upstream: status.parseUpstreamChannels(res.text)
            };
        }
        else {
            throw new Error(`Error geting page statusCode: ${res.statusCode}`);
        }
    }
    catch (e) {
        debug('Error getting page: %O', e);
        throw new Error('Unable to get status');
    }
}
