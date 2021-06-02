import { TwitchChatCommand, TwitchCommandClient, TwitchChatMessage, CommandOptions } from '../../src'

class Example extends TwitchChatCommand {
    constructor(client: TwitchCommandClient, options: CommandOptions) {
        super(client, options)
    }

    // async run(msg: TwitchChatMessage, { arg1, arg2 }) { }

    async prepareRun(msg: TwitchChatMessage, args: string[]) {
        msg.reply(`args -> ${args.join(' ')}`)
    }
}

export default Example