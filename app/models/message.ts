import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Stream from './stream.js'

export type MessageData = {
  author: {
    badges: {
      clickAction: string | null
      clickURL: string | null
      icons: {
        height: number
        id: string
        url: string
        width: number
      }[]
      name: string
      title: string
      version: number
    }[]
    colour: string
    display_name: string
    id: string
    name: string
  }
  message: string
  message_id: string
  message_type: string
  time_in_seconds: number
  time_text: string
  timestamp: number
}

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare timestamp: number

  @column()
  declare data: MessageData

  @column()
  declare twitchId: string

  @column()
  declare streamId: string

  @belongsTo(() => Stream)
  declare stream: BelongsTo<typeof Stream>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
