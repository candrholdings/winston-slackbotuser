!function (winston) {
    'use strict';

    require('../lib/index');

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.SlackBotUser)({
                token: 'xoxb-8208386452-MLGjHtLogx3xr8yRJNIpFDhr',
                // token: 'xoxb-1234567890-ABCDEFGHIJKLMNOPQRSTUVWX',
                channel: '#aahk-eduvisit-deploy',
                username: 'My Bot',
            })
        ]
    });

    logger.info('Now you see metadata', { aloha: 1337 });

    logger.transports.slackBotUser.meta = false;

    logger.info('Now you don\'t', { aloha: 1337 });
}(require('winston'));