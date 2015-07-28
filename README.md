#winston-slackbotuser

[Winston](http://github.com/winstonjs/winston) transport to log as a [Slack bot user](https://api.slack.com/bot-users).

## Installation
`npm install winston-slackbotuser`

Adds a [new bot](https://my.slack.com/services/new/bot) to your Slack team and write down the API Token.

Adds `slackbotuser` transport to winston with API token and channel set. You can either add the transport to the default winston logger.
```js
winston.add(require('winston-slackbotuser'), {
    token: 'xoxb-1234567890-ABCDEFGHIJKLMNOPQRSTUVWX',
    channel: '#general'
});
```

Or with a new logger instance.
```js
require('winston-slackbotuser');

new (winston.Logger)({
    transports: [
        new (winston.transports.SlackBotUser)({
            token: 'xoxb-1234567890-ABCDEFGHIJKLMNOPQRSTUVWX',
            channel: '#general'
        }
    ]
});
```

By default, `slackbotuser` log level is set to `info`. If you want to log `debug` messages, set the `level` option to `debug`.

### Options

Sample set of options
```js
{
    token: 'xoxb-1234567890-ABCDEFGHIJKLMNOPQRSTUVWX',
    channel: '#general',
    username: 'My Bot',
    as_user: true,
    parse: 'full',
    link_names: 1,
    unfurl_links: true,
    unfurl_media: false,
    icon_url: 'http://lorempixel.com/48/48',
    icon_emoji: ':japanese_goblin:',

    emojis: {
        debug: 'ant',
        warn: 'warning',
        error: 'fire'
    },
    level: 'debug',
    meta: true
}
```

Name | Example | Required | Description
--- | --- | --- | ---
`token` | `xxxx-xxxxxxxxx-xxxx` | Required | API Token for the bot user
`channel` | `#general` | Required | Channel to log to
`username` | `My Bot` | Optional | Display name of the bot user
`as_user` | `true` | Optional | Pass true to post the message as the authed user, instead of as a bot
`parse` | `full` | Optional | Change how messages are treated.
`link_names` | `1` | Optional | Find and link channel names and usernames.
`unfurl_links` | `true` | Optional | Pass true to enable unfurling of primarily text-based content.
`unfurl_media` | `false` | Optional | Pass false to disable unfurling of media content.
`icon_url` | `http://lorempixel.com/48/48` | Optional | URL to an image to use as the icon for this message
`icon_emoji` | `:chart_with_upwards_trend:` | Optional | emoji to use as the icon for this message. Overrides `icon_url`.
`prefix_emojis` | `{ debug: "ant" }` | Optional | emoji to prefix when a specific log level is used.
`level` | `info` | Optional | Log level.
`meta` | `true` | Optional | Pass false to disable logging metadata.

Please refer to [Slack API](https://api.slack.com/methods/chat.postMessage) for details of options. [Attachments](https://api.slack.com/docs/attachments) are currently unsupported.

## Contributions
For issues, please provide a minimal repro and post the issue to GitHub [issues](issues).