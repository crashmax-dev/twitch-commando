/**
 * Twitch Channel object
 * 
 * @class
 */
class TwitchChatChannel
{

    /**
     * Creates an instance of TwitchChatChannel.
     * @param {Object} originalMessage
     * @param {TwitchCommandoClient} client
     * @memberof TwitchChatChannel
     */
    constructor(originalMessage, client)
    {
        this.originalMessage = originalMessage;
        this.client = client;
    }


    /**
     * Channel display name
     * 
     * @readonly
     * @memberof TwitchCommandoClient
     */
    get username() {
        return this.client.tmi.globaluserstate["display-name"];
    }


    /**
     * Channel name
     *
     * @readonly
     * @memberof TwitchChatChannel
     */
    get name()
    {
        return this.originalMessage.channel;
    }


    /**
     * Channel ID
     *
     * @readonly
     * @memberof TwitchChatChannel
     */
    get id()
    {
        return this.originalMessage.room_id;
    }


    /**
     * Send text message in the channel
     * 
     * @async
     * @param {String} text Message text
     * @memberof TwitchChatChannel
     */
    async say(text)
    {
        this.say(this.name, text);
    }
}

module.exports = TwitchChatChannel;