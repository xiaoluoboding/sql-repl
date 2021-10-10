// import { Sequelize, Model, DataTypes } from 'sequelize'
import { Sequelize } from 'sequelize'

const dbPath = './employees.db'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  define: {
    timestamps: false,
    underscored: true,
  },
})

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

// class Employees extends Model {
//   public id!: number
//   public name!: string
//   public designation!: number
//   public manager!: number
//   public hired_on!: string
//   public salary!: number
//   public commission!: number
//   public dept!: number
// }

// Employees.init({
//   id: DataTypes.INTEGER,
//   name: DataTypes.STRING,
//   designation: DataTypes.STRING,
//   manager: DataTypes.INTEGER,
//   hired_on: DataTypes.DATE,
//   salary: DataTypes.INTEGER,
//   commission: DataTypes.FLOAT,
//   dept: DataTypes.INTEGER
// }, {
//   sequelize,
//   tableName: 'employees'
// })

// Employees.sync()

export { sequelize }
