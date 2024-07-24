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
const MessagesController = () => import('#controllers/messages_controller')

router.get('/', [HomeController, 'index']).use(
  middleware.auth({
    guards: ['basicAuth'],
  })
)

router.get('/streams/:id/messages', [MessagesController, 'index']).use(
  middleware.auth({
    guards: ['basicAuth'],
  })
)
