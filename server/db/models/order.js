const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // REVIEW: why might this not work
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
  }
})

module.exports = Order
