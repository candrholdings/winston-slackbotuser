!function (winston) {
    'use strict';

    require('../lib/index');

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.SlackBotUser)({
                token: 'xoxb-1234567890-ABCDEFGHIJKLMNOPQRSTUVWX',
                channel: '#general',
                username: 'My Bot',
            })
        ]
    });

    logger.info('Now you see metadata', { aloha: 1337 });

    logger.transports.slackBotUser.meta = false;

    logger.info('Now you don\'t', { aloha: 1337 });
}(require('winston'));