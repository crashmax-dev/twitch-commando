import { ChatUserstate } from 'tmi.js'
import { TwitchChatUser } from '../users/TwitchChatUser'
import { TwitchChatChannel } from '../channels/TwitchChatChannel'
import { TwitchCommandClient } from '../client/TwitchCommandClient'

class TwitchChatMessage {
    private client: TwitchCommandClient
    private originalMessage: ChatUserstate
    private _channel: TwitchChatChannel
    private _author: TwitchChatUser
    private _timestamp: Date

    constructor(originalMessage: ChatUserstate, channel: string, client: TwitchCommandClient) {
        this.client = client
        this.originalMessage = originalMessage
        this._channel = new TwitchChatChannel({ channel, room_id: originalMessage['room-id'] }, client)
        this._author = new TwitchChatUser(originalMessage, client)
        this._timestamp = new Date()
    }

    /**
     * Text of the message
     */
    get text() {
        return this.originalMessage.message
    }

    /**
     * The author of the message
     */
    get author() {
        return this._author
    }

    /**
     * The ID of the message
     */
    get id() {
        return this.originalMessage.id
    }

    /**
     * The channel where the message has been sent in
     */
    get channel() {
        return this._channel
    }

    /**
     * Text color
     */
    get color() {
        return this.originalMessage.color
    }

    /**
     * Emotes contained in the message
     */
    get emotes() {
        return this.originalMessage.emotes
    }

    /**
     * Message sent date
     */
    get timestamp() {
        return this._timestamp
    }

    /**
     * Message type
     */
    get messageType() {
        return this.originalMessage['message-type']
    }

    /**
     * Helper method to reply quickly to a message. Create a message to send in the channel with @author <text>
     *
     * @param text
     * @param addRandomEmote
     */
    async reply(text: string, addRandomEmote = false) {
        if (this.messageType === 'whisper') {
            return this.client.whisper(this.author.username, text)
        } else {
            return this.client.say(this.channel.name, `@${this.author.displayName}, ${text}`, addRandomEmote)
        }
    }

    /**
     * Helper method to send message
     *
     * @param text
     * @param addRandomEmote
     */
    async send(text: string, addRandomEmote = false) {
        return this.client.say(this.channel.name, text, addRandomEmote)
    }

    /**
     * Helper method to reply quickly to a message with an action
     *
     * @param text
     * @param addRandomEmote
     */
    async actionReply(text: string, addRandomEmote = false) {
        return this.client.action(this.channel.name, `@${this.author.displayName}, ${text}`, addRandomEmote)
    }

    /**
     * Helper method to a message with an action
     *
     * @param text
     * @param addRandomEmote
     */
    async action(text: string, addRandomEmote = false) {
        return this.client.action(this.channel.name, text, addRandomEmote)
    }
}

export { TwitchChatMessage }