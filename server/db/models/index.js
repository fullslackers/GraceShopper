const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const Category = require('./category')
const db = require('../db')

const ProductCategory = db.define(
  'product-category',
  {},
  {
    freezeTableName: true
  }
)

Product.belongsToMany(Category, {through: ProductCategory})
Category.belongsToMany(Product, {through: ProductCategory})

const OrderProduct = db.define(
  'order-product',
  {},
  {
    freezeTableName: true
  }
)

Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  Review,
  ProductCategory,
  OrderProduct,
  db
}
