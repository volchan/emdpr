import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    // Use the insert method to make a query
    await User.createMany([
      {
        username: 'volchan',
        password: 'secret',
      },
      {
        username: 'encre',
        password: 'supersecret',
      },
    ])
  }
}
