!function (https, url, winston) {
    'use strict';

    function SlackBotUser(options) {
        if (!options) {
            throw new Error('"options" must be specified');
        } else if (!options.token) {
            throw new Error('"token" must be specified');
        } else if (!options.channel) {
            throw new Error('"channel" must be specified, either in #channel or @group');
        }

        this._options = options;

        options.emojis || (options.emojis = {
            debug: 'ant',
            warn: 'warning',
            error: 'fire'
        });

        this.name = 'slackBotUser';
        this.level = options.level || 'info';
    }

    require('util').inherits(SlackBotUser, winston.Transport);

    SlackBotUser.prototype.log = function (level, msg, meta, callback) {
        var that = this,
            options = that._options,
            iconEmoji = options.icon_emoji,
            query = {
                token: options.token,
                channel: options.channel,
                username: options.username,
                as_user: options.as_user,
                parse: options.parse,
                link_names: options.link_names,
                unfurl_links: options.unfurl_links,
                unfurl_media: options.unfurl_media,
                icon_emoji: iconEmoji && (':' + iconEmoji + ':'),
                icon_url: options.icon_url,
                text: that.formatMessage(level, msg, meta)
            },
            queryString = Object.getOwnPropertyNames(query).reduce(function (parts, name) {
                var value = query[name];

                typeof value !== 'undefined' && value !== null && parts.push(name + '=' + encodeURIComponent(value));

                return parts;
            }, []).join('&'),
            reqOptions = url.parse('https://slack.com/api/chat.postMessage?' + queryString),
            req = https.request(reqOptions, function (res) {
                readAll(res, function (err, resBody) {
                    try {
                        resBody = JSON.parse(resBody.toString());
                    } catch (ex) {
                        return callback && callback(ex);
                    }

                    callback && callback(resBody.ok ? null : new Error(resBody.error));
                });
            });

        req.end();
    };

    SlackBotUser.prototype.formatMessage = function (level, msg, meta) {
        var formatted = '',
            options = this._options,
            emoji = options.emojis[level];

        if (emoji) {
            formatted += ':' + emoji + ': ';
        }

        formatted += msg;

        if (meta || !options.meta) {
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