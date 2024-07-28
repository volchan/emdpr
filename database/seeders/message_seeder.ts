import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Stream from '#models/stream'
import Message, { type MessageData } from '#models/message'

export default class extends BaseSeeder {
  async run() {
    const dataFolder = path.join(path.dirname(import.meta.url), '/data')
    const dataFolderUrl = fileURLToPath(dataFolder)

    const filenames = fs.readdirSync(dataFolderUrl)

    for (const file of filenames) {
      const filePath = path.join(dataFolderUrl, file)
      const data = fs.readFileSync(filePath, 'utf-8')
      const parsedData: MessageData[] = JSON.parse(data)
      const streamID = file.split('.')[0]
      const date = new Date(parsedData[0].timestamp / 1000)
      console.log(
        `Processing stream https://www.twitch.tv/videos/${streamID} from ${date.toLocaleDateString()}`
      )
      const stream = await Stream.firstOrCreate(
        { date, twitchId: streamID },
        { date, twitchId: streamID }
      )
      const matchRegexp = new RegExp('(?:^@.* \\|\\| .*)|(?:^\\|\\| .*)', 'g')
      for (const jsonData of parsedData) {
        if (matchRegexp.test(jsonData.message)) {
          await Message.firstOrCreate(
            {
              twitchId: jsonData.message_id,
            },
            {
              timestamp: jsonData.timestamp,
              data: jsonData,
              twitchId: jsonData.message_id,
              streamId: stream.id,
            }
          )
        }
      }
    }
  }
}
