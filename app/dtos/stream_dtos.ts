import Stream from '#models/stream'

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
