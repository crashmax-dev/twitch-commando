import { TwitchCommandClient } from '../client/TwitchCommandClient'

interface ChatChannel {
    channel: string
    username: string
    room_id?: string
}

class TwitchChatChannel {
    private originalMessage: ChatChannel
    private client: TwitchCommandClient

    constructor(originalMessage: ChatChannel, client: TwitchCommandClient) {
        this.originalMessage = originalMessage
        this.client = client
    }

    /**
     * Get username
     */
    get name() {
        return this.originalMessage.username
    }

    /**
     * Get channel
     */
    get channel() {
        return this.originalMessage.channel
    }

    /**
     * Get room_id
     */
    get id() {
        return this.originalMessage.room_id
    }

    /**
     * Send text message in the channel
     */
    async say(text: string) {
        this.client.say(this.channel, text)
    }
}

export { TwitchChatChannel }