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

router
  .group(() => {
    router.on('/').redirect('/')
    router.on('/:id').redirect('/streams/:id/messages')
    router.get('/:id/messages', [MessagesController, 'index']).use(
      middleware.auth({
        guards: ['basicAuth'],
      })
    )
  })
  .prefix('streams')

router.get('*', ({ inertia }) => inertia.render('errors/not_found'))
router.post('*', ({ inertia }) => inertia.render('errors/not_found'))
router.put('*', ({ inertia }) => inertia.render('errors/not_found'))
router.patch('*', ({ inertia }) => inertia.render('errors/not_found'))
router.delete('*', ({ inertia }) => inertia.render('errors/not_found'))
