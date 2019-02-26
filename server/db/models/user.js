const crypto = require('crypto')
const {BOOLEAN, STRING} = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: STRING,
    allowNull: false
  },
  middleInitial: {
    type: STRING
  },
  lastName: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: STRING,
    validate: {
      /* Password is at least 8 chars and must contain at least 1 uppercase
      letter, 1 lowercase letter, and 1 special character. */
      is: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/
    },
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: STRING
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = User

// Instance Methods
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

// Class Methods
User.generateSalt = () => crypto.randomBytes(16).toString('base64')

User.encryptPassword = (plainText, salt) =>
  crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')

// Hooks
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
