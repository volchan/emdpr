// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

import Message from '#models/message'
import Stream from '#models/stream'
import { MessagesCollectionDto } from '#dtos/message_dtos'
import { StreamDto } from '#dtos/stream_dtos'

export type PaginationMeta = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string
  previousPageUrl: string | null
}

export default class MessagesController {
  async index({ inertia, params: { id }, request }: HttpContext) {
    const stream = await Stream.find(id)

    if (!stream) return inertia.render('errors/not_found')

    const page = request.input('page', 1)
    const limit = 50
    const messages = await Message.query()
      .where('stream_id', id)
      .orderBy('timestamp', 'asc')
      .paginate(page, limit)

    messages.baseUrl(`/streams/${id}/messages`)
    const json = messages.toJSON()
    const messagesCollection = new MessagesCollectionDto(json.data as Message[]).toJson()
    const res = {
      stream: new StreamDto(stream!).toJson(),
      messages: messagesCollection,
      paginate: json.meta as PaginationMeta,
    }

    if (request.header('Accept') === 'application/json') {
      return res
    } else {
      return inertia.render('messages/index', res)
    }
  }
}
