import { TwitchChatCommand, TwitchCommandClient, TwitchChatMessage } from '../../src'

class Example extends TwitchChatCommand {
    constructor(client: TwitchCommandClient) {
        super(client, {
            name: 'example',
            group: 'system',
            description: 'Пример команды',
            userlevel: 'everyone',
            examples: [
                '!example',
                '!example <arg1>',
                '!example <arg1> <arg2>'
            ],
            args: [
                {
                    name: 'arg1',
                    type: String,
                    defaultValue: 'example'
                },
                {
                    name: 'arg2',
                    type: Number,
                    defaultValue: 22
                }
            ]
        })
    }

    // async run(msg: TwitchChatMessage, { arg1, arg2 }) { }

    async prepareRun(msg: TwitchChatMessage, args: string[]) {
        msg.reply(`args -> ${args.join(' ')}`)
    }
}

export default Example