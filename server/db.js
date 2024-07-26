import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('converter', 'danik', 'makkarti', {
  host: 'localhost',
  dialect: 'postgres',
})
