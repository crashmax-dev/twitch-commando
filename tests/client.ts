import path, { resolve } from 'path'
import sqlite from 'sqlite'
import { ChatUserstate } from 'tmi.js'
import { CommandSQLiteProvider, TwitchCommandClient } from '../src'
import { Logger } from './logger'

import dotenv from 'dotenv'
dotenv.config()

const client = new TwitchCommandClient({
    username: process.env.USERNAME,
    oauth: process.env.OAUTH_KEY,
    channels: [process.env.CHANNEL],
    verboseLogging: true,
    autoJoinBotChannel: false
})

client.logger = Logger('main')

// TODO: Extend ChatUserstate
client.on('message', (chatter: ChatUserstate) => {
    console.log(chatter)
})

client.registerCommandsIn(path.join(__dirname, 'commands'))

// TODO: SettingsProvider
// client.setProvider(
//     sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new CommandSQLiteProvider(db))
// )

client.connect().catch(console.error)