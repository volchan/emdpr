/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const HomeController = () => import('#controllers/home_controller')
const StreamsController = () => import('#controllers/streams_controller')

router.get('/', [HomeController, 'index']).use(
  middleware.auth({
    guards: ['basicAuth'],
  })
)

router.get('/streams/:id', [StreamsController, 'show']).use(
  middleware.auth({
    guards: ['basicAuth'],
  })
)
