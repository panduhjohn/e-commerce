const express = require('express')
const router = express.Router()

const categoryValidation = require('./utils/categoryValidation')
const categoryController = require('./controllers/categoryController')
const createProductController = require('./controllers/createProductController')
// const Category = require('../../routes/products/models/Category')

router.get('/', (req, res) => {
    res.send('hey from admin')
})

// http://localhost:3000/api/admin/add-category
router.get('/add-category', (req, res) => {
    res.render('products/addcategory')
})

router.post('/add-category', categoryValidation, (req, res) => {

    categoryController.addCategory(req.body)
        .then(category => {
            req.flash('success', `Category ${category.name} created`)

            res.redirect('/api/admin/add-category')
        })
        .catch(error => {
            req.flash('errors', error.message)

            res.redirect('/api/admin/add-category')
        })
    
    //! Optional way to handle category validation
    // req.checkBody('name', 'Category is required').notEmpty()

    // if (req.validationErrors()) {
    //     req.flash('errors', req.validationErrors())

    //     res.redirect('/api/admin/add-category')
    // } else {
    //     const newCategory = new Category

    //     newCategory.name = req.body.name

    //     newCategory.save((err, data) => {
    //         console.log(data);
    //         req.flash('success', 'Category added successfully')

    //         res.redirect('/api/admin/add-category')
    //         })
    // }
        
})

//! http://localhost:3000/api/admin/get-all-categories
router.get('/get-all-categories', categoryController.getAllCategories)

router.get(
  '/create-fake-product/:categoryName/:categoryID',
  createProductController.createProductByCategoryId
)

module.exports = router