const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNegative: function(val) {
        if (val < 0) {
          throw new Error("Quantity can't be a negative number")
        }
      }
    }
  },
  price: {
    type: Sequelize.DECIMAL(19, 2),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'cancelled', 'completed'],
    defaultValue: 'created'
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Order
