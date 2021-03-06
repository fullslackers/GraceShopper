const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.ENUM,
    values: ['1', '2', '3', '4', '5'],
    allowNull: false
  }
})

module.exports = Review
