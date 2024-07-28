import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const adminName = process.env['ADMIN_NAME']
    const adminPassword = process.env['ADMIN_PASSWORD']

    if (!adminName || !adminPassword) {
      throw new Error('ADMIN_NAME and ADMIN_PASSWORD must be set in the .env file')
    }

    const userName = process.env['USER_NAME']
    const userPassword = process.env['USER_PASSWORD']

    if (!userName || !userPassword) {
      throw new Error('USER_NAME and USER_PASSWORD must be set in the .env file')
    }

    const admin = await User.firstOrCreate(
      { username: adminName },
      {
        username: adminName,
        password: adminPassword,
        admin: true,
      }
    )

    console.log(`Admin user created with username ${admin.username}`)

    const user = await User.firstOrCreate(
      { username: userName },
      {
        username: userName,
        password: userPassword,
        admin: false,
      }
    )

    console.log(`User created with username ${user.username}`)
  }
}
