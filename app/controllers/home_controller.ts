// import type { HttpContext } from '@adonisjs/core/http'

import Stream from '#models/stream'
import { HttpContext } from '@adonisjs/core/http'
import { StreamsCollectionDto } from './streams_controller.js'

export default class HomeController {
  async index({ inertia }: HttpContext) {
    return inertia.render('home', {
      streams: new StreamsCollectionDto(
        await Stream.query().orderBy('date', 'asc').exec()
      ).toJson(),
    })
  }
}
