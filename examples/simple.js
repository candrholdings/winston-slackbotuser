!function (winston) {
    'use strict';

    winston.add(require('../lib/index'), {
        token: 'xoxb-1234567890-ABCDEFGHIJKLMNOPQRSTUVWX',
        channel: '#general',
        username: 'deploybot',
        level: 'debug',

        // "meta" default is true
        meta: true,

        // "emojis" defaults
        emojis: {
            debug: 'ant',
            warn: 'warning',
            error: 'fire'
        },

        icon_emoji: 'japanese_goblin'
    });

    winston.debug('This is for debugging', { aloha: 1337 });
    winston.info('This is informative', { aloha: 1337 });
    winston.warn('This is a warning', { aloha: 1337 });
    winston.error('This is an error', { aloha: 1337 });
}(require('winston'));