// import type { HttpContext } from '@adonisjs/core/http'

import Message from '#models/message'
import Stream from '#models/stream'
import { HttpContext } from '@adonisjs/core/http'

export class StreamDto {
  constructor(private stream: Stream) {}

  toJson() {
    return {
      id: this.stream.id,
      date: this.stream.date,
      twitchId: this.stream.twitchId,
    }
  }
}

export class StreamsCollectionDto {
  constructor(private streams: Stream[]) {}

  toJson() {
    return this.streams.map((stream) => new StreamDto(stream).toJson())
  }
}

class MessageDto {
  constructor(private message: Message) {}

  toJson() {
    return {
      id: this.message.id,
      timestamp: this.message.timestamp,
      data: this.message.data,
    }
  }
}

class MessagesCollectionDto {
  constructor(private messages: Message[]) {}

  toJson() {
    return this.messages.map((message) => new MessageDto(message).toJson())
  }
}

export default class StreamsController {
  async show({ inertia, params }: HttpContext) {
    const stream = await Stream.findOrFail(params.id)
    const messages = await stream.related('messages').query().orderBy('timestamp', 'asc').exec()

    return inertia.render('streams/show', {
      stream: new StreamDto(stream).toJson(),
      messages: new MessagesCollectionDto(messages).toJson(),
    })
  }
}
