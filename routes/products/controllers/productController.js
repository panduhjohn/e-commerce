const Product = require('../../products/models/Product')

const paginate = require('../utils/pagination')

module.exports = {
  createProductByCategoryId: (req, res) => {
    for (let i = 0; i < 10; i++) {
      let newProduct = new Product()

      newProduct.category = req.params.categoryID
      newProduct.name = faker.commerce.productName()
      newProduct.price = faker.commerce.price()
      newProduct.image = faker.image.image()

      newProduct.save().catch(err => {
        throw err
      })
    }

    req.flash('success', `Fake ${req.params.categoryName} Product created`)

    res.redirect('/api/admin/get-all-categories')
  },

  //? http://localhost:3000/api/admin/get-all-categories
  getAllProducts: (req, res) => {
    Product.find({})
      .populate('category')
      .exec((error, products) => {
        if (error) throw error

        // console.log('dog', products)
        res.render('products/products', { products: products })
      })
  },

  //?  http://localhost:3000/api/products/5dadd3b9d90a5c308c7e1cba
  getById: (req, res) => {
    console.log(req.params)

    Product.findById(req.params.id, (error, product) => {
      if (error) throw error

      res.render('products/product', { product: product })
    })
  },

  //?  http://localhost:3000/api/products/getproductsbycategoryid/5da89aa69baff90840f4dbed
  getByCategoryId: (req, res) => {
    Product.find({ category: req.params.id })
      .populate('category')
      .exec((error, products) => {
        if (error) throw error

        res.render('products/products', { products: products })
      })
  },

  getPageIfUserLoggedIn: (req, res, next) => {
    if (req.user) paginate(req, res, next)
    else res.render('index')
  },

  



  // api/product/deleteproductbyid
  // deleteProduct: (req, res) => {
  //   Product.find({ category: req.params.id }).deleteProduct('id')

  //   res.render('products/products', { products: products })
  // }
}
