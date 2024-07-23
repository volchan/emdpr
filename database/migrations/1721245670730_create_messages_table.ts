import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .unique()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.bigInteger('timestamp').notNullable()
      table.jsonb('data').notNullable()
      table.string('twitch_id').notNullable().unique().index()

      table.uuid('stream_id').notNullable().references('id').inTable('streams').index()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
