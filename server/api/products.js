const router = require('express').Router()
const {Product, Category, Review} = require('../db/models')
const {adminCheckMiddleware, loginCheckMiddleware} = require('./middleware')
module.exports = router

// All users can view all products and product by id

router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page || 1
    const perPage = 10
    const offset = (page - 1) * perPage
    // select * from products limit 10 offset ${offset} order by updateAt desc
    const pageOfProducts = await Product.findAll({
      include: [{model: Category, fields: ['title']}],
      limit: perPage,
      offset: offset,
      orderBy: 'updatedAt'
    })
    res.json(pageOfProducts)

    // const allProducts = await Product.findAll({include: [Category]})
    // res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/categories', async (req, res, next) => {
  try {
    const allCategories = await Category.findAll()
    res.json(allCategories)
  } catch (err) {
    next(err)
  }
})

router.get('/reviews', async (req, res, next) => {
  try {
    const allReviews = await Review.findAll()
    res.json(allReviews)
  } catch (err) {
    next(err)
  }
})

router.get('/categories/:filter', async (req, res, next) => {
  try {
    const page = req.query.page || 1
    const perPage = 10
    const offset = (page - 1) * perPage

    const category = await Category.findOne({
      where: {
        title: req.params.filter
      }
    })

    const id = category.id

    const pageOfProducts = await Product.findAll({
      include: [{model: Category, where: {id}}],
      limit: perPage,
      offset: offset,
      orderBy: 'updatedAt'
    })
    res.json(pageOfProducts)

    // const category = await Category.findOne({
    //   where: {
    //     title: req.params.filter
    //   }
    // })
    // const id = category.id
    // const productsByCategory = await Product.findAll({
    //   include: {
    //     model: Category,
    //     where: {id}
    //   }
    // })
    // res.json(productsByCategory)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const whichProduct = await Product.findById(req.params.productId, {
      include: [Category]
    })
    res.json(whichProduct)
  } catch (err) {
    next(err)
  }
})

// Only administrators can create or edit products...add check for isAdmin?

router.post('/', adminCheckMiddleware, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/reviews', async (req, res, next) => {
  try {
    const userId = req.user.id
    const data = req.body
    const review = {...data, userId}
    const newReview = await Review.create(review)
    res.status(201).json(newReview)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', adminCheckMiddleware, async (req, res, next) => {
  try {
    const whichProduct = await Product.findById(req.params.productId)
    const updatedProduct = await whichProduct.update(req.body)
    res.status(204).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', adminCheckMiddleware, async (req, res, next) => {
  try {
    await req.params.productId.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
