import Message from '#models/message'

export class MessageDto {
  constructor(private message: Message) {}

  toJson() {
    return {
      id: this.message.id,
      timestamp: this.message.timestamp,
      data: this.message.data,
    }
  }
}

export class MessagesCollectionDto {
  constructor(private messages: Message[]) {}

  toJson() {
    return this.messages.map((message) => new MessageDto(message).toJson())
  }
}
