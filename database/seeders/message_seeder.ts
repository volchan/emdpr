import Message, { type MessageData } from '#models/message'
import Stream from '#models/stream'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

type JsonData = MessageData[]

const streamData = [
  {
    date: new Date('2024-06-23'),
    twitchId: '2179711073',
  },
  {
    date: new Date('2024-06-24'),
    twitchId: '2180393607',
  },
  {
    date: new Date('2024-06-26'),
    twitchId: '2182258117',
  },
  {
    date: new Date('2024-07-04'),
    twitchId: '2189218512',
  },
  {
    date: new Date('2024-07-07'),
    twitchId: '2191657978',
  },
  {
    date: new Date('2024-07-08'),
    twitchId: '2192465393',
  },
  {
    date: new Date('2024-07-09'),
    twitchId: '2193494493',
  },
  {
    date: new Date('2024-07-10'),
    twitchId: '2194149182',
  },
  {
    date: new Date('2024-07-14'),
    twitchId: '2194976969',
  },
  {
    date: new Date('2024-07-15'),
    twitchId: '2197523249',
  },
  {
    date: new Date('2024-07-16'),
    twitchId: '2198422981',
  },
  {
    date: new Date('2024-07-18'),
    twitchId: '2199302922',
  },
  {
    date: new Date('2024-07-19'),
    twitchId: '2201090026',
  },
  {
    date: new Date('2024-07-20'),
    twitchId: '2202072512',
  },
  {
    date: new Date('2024-07-23'),
    twitchId: '2205383277',
  },
]

export default class extends BaseSeeder {
  async run() {
    const dataFolder = path.join(path.dirname(import.meta.url), '/data')
    const dataFolderUrl = fileURLToPath(dataFolder)

    const streams = await Stream.createMany(streamData)

    const messagesData = [] as Partial<Message>[]

    fs.readdir(dataFolderUrl, async (err, files) => {
      if (err) {
        return console.error(err)
      }
      for (const file of files) {
        const filePath = path.join(dataFolderUrl, file)
        const data = fs.readFileSync(filePath, 'utf-8')
        const parsedData = JSON.parse(data) as JsonData
        const streamDate = new Date(file.split('.')[0])

        const stream = streams.find((el) => el.date.getTime() === streamDate.getTime())
        const matchRegexp = new RegExp('(?:^@.* \\|\\| .*)|(?:^\\|\\| .*)', 'g')
        parsedData.map((jsonData) => {
          if (!matchRegexp.test(jsonData.message)) return

          messagesData.push({
            timestamp: jsonData.timestamp,
            data: jsonData,
            twitchId: jsonData.message_id,
            streamId: stream?.id,
          })
        })
      }
    })

    await Message.createMany(messagesData)
  }
}
