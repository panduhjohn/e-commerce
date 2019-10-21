const express = require('express')
const router = express.Router()
const createProductController = require('../admin/controllers/createProductController')




router.get('/', createProductController.getAllProducts)

router.get('/:id', createProductController.getById) 

router.get('/getproductsbycategoryid/:id', createProductController.getByCategoryId)


module.exports = router