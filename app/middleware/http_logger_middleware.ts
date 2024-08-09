import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

import prettyMs from 'pretty-ms'

export default class HttpLoggerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { logger, request, response } = ctx
    const reqID = request.id()
    const url = request.url()
    const method = request.method()
    const ip = request.ip()
    const beginTime = process.hrtime()
    const headers = request.headers()
    // [003bdcdf-5cc6-4eb7-ab48-8b2915ad51a1] Started GET "/" for 86.213.102.32 at 2024-07-28 17:20:36 +0200
    logger.info(`[${reqID}] Started ${method} "${url}" for ${ip}`, {
      headers,
      body: request.all(),
    })

    await next()

    response.response.on('finish', () => {
      const diffTime = process.hrtime(beginTime)
      const elapsedMs = prettyMs((diffTime[0] * 1e9 + diffTime[1]) / 1e6)
      const statusCode = response.response.statusCode
      const { content } = response.lazyBody
      const isContentObject = typeof content === 'object' && content !== null

      // [3f4a9d64-1a1d-48cd-b5df-def5163b99d5] Completed 302 Found in 10ms (ActiveRecord: 2.5ms | Allocations: 1233)
      const logMsg = `[${reqID}] Completed ${statusCode} in ${elapsedMs}`
      if (isContentObject) {
        logger.info(logMsg, content)
      } else {
        logger.info(logMsg)
      }
    })
  }
}
