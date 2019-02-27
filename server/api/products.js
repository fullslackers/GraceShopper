const router = require('express').Router()
const {Product, Category, ProductCategory} = require('../db/models')
module.exports = router

// All users can view all products and product by id

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({include: [Category]})
    res.json(allProducts)
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

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const whichProduct = await Product.findById(req.params.productId)
    const updatedProduct = await whichProduct.update(req.body)
    res.status(204).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    // REVIEW: mixing await & .then
    await req.params.productId.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
