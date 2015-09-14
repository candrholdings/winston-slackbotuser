!function (https, url, winston) {
    'use strict';

    function SlackBotUser(options) {
        if (!options) {
            throw new Error('"options" must be specified');
        } else if (!options.token) {
            throw new Error('"token" must be specified');
        }

        this.token = options.token;
        this.channel = options.channel;
        this.username = options.username;
        this.as_user = options.as_user;
        this.parse = options.parse;
        this.link_names = options.link_names;
        this.unfurl_links = options.unfurl_links;
        this.unfurl_media = options.unfurl_media;
        this.icon_emoji = options.icon_emoji;
        this.icon_url = options.icon_url;

        this.prefix_emojis = options.prefix_emojis || {
            debug: ':ant:',
            warn: ':warning:',
            error: ':fire:'
        };

        this.name = 'slackBotUser';
        this.level = options.level || 'info';
    }

    require('util').inherits(SlackBotUser, winston.Transport);

    SlackBotUser.prototype.log = function (level, msg, meta, callback) {
        var that = this,
            query = {
                token: that.token,
                channel: that.channel,
                username: that.username,
                as_user: that.as_user,
                parse: that.parse,
                link_names: that.link_names,
                unfurl_links: that.unfurl_links,
                unfurl_media: that.unfurl_media,
                icon_emoji: that.icon_emoji,
                icon_url: that.icon_url,
                text: that.formatMessage(level, msg, meta)
            },
            encodedForm = Object.getOwnPropertyNames(query).reduce(function (parts, name) {
                var value = query[name];

                typeof value !== 'undefined' && value !== null && parts.push(name + '=' + encodeURIComponent(value));

                return parts;
            }, []).join('&'),
            reqOptions = url.parse('https://slack.com/api/chat.postMessage');

        reqOptions.method = 'POST';
        reqOptions.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        https.request(reqOptions, function (res) {
            readAll(res, function (err, resBody) {
                try {
                    resBody = JSON.parse(resBody.toString());
                } catch (ex) {
                    return callback && callback(ex);
                }

                callback && callback(resBody.ok ? null : new Error(resBody.error));
            });
        }).end(encodedForm);
    };

    SlackBotUser.prototype.formatMessage = function (level, msg, meta) {
        var formatted = '',
            emoji = this.prefix_emojis[level];

        if (emoji) {
            formatted += emoji + ' ';
        }

        formatted += msg;

        if (meta && this.meta !== false && Object.getOwnPropertyNames(meta).length) {
            formatted += ' ```' + JSON.stringify(meta, null, 2) + '```';
        }

        return formatted;
    };

    function readAll(stream, callback) {
        var buffers = [],
            numBytes = 0;

        stream.on('data', function (buffer) {
            buffers.push(buffer);
            numBytes += buffer.length;
        }).on('end', function () {
            callback && callback(null, Buffer.concat(buffers, numBytes));
            buffers = 0;
        }).on('close', function (err) {
            buffers = 0;
            callback && callback(err);
        });
    }

    module.exports = winston.transports.SlackBotUser = SlackBotUser;
}(require('https'), require('url'), require('winston'));