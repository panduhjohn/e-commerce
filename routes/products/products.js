const express = require('express')
const router = express.Router()
const createProductController = require('../admin/controllers/createProductController')
const productController = require('../products/controllers/productController')

router.get('/', createProductController.getAllProducts)

router.get('/search', productController.searchProductByQuery)

router.get('/:id', productController.getById)

router.get('/getproductsbycategoryid/:id', createProductController.getByCategoryId)


module.exports = router
