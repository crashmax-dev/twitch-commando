import path from 'path'
import sqlite from 'sqlite'
import { ChatUserstate } from 'tmi.js'
import { TwitchCommandClient, CommandSQLiteProvider } from '../src'
import { Logger } from './logger'

import dotenv from 'dotenv'
dotenv.config()

const client = new TwitchCommandClient({
    username: process.env.BOT_USERNAME,
    oauth: process.env.OAUTH_KEY,
    channels: [process.env.CHANNEL],
    verboseLogging: true,
    botOwners: ['vs_code']
})

client.logger = Logger('main')

client.on('message', (chatter: ChatUserstate) => { })

const ExternalConfig = {
    Example: {
        name: 'example',
        group: 'system',
        userlevel: 'everyone',
        description: 'Пример команды',
        examples: [
            '!example',
            '!example <args>'
        ]
    },
    Cat: {
        name: 'кот',
        group: 'system',
        userlevel: 'everyone',
        description: 'Фото кота'
    }
}

client.registerDetaultCommands()

client.registerCommandsIn(path.join(__dirname, 'commands'), ExternalConfig)

// TODO: SettingsProvider
// client.setProvider(
//     sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new CommandSQLiteProvider(db))
// )

client.connect().catch(console.error)