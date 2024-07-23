import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Message from './message.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Stream extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare date: Date

  @column()
  declare twitchId: string

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
