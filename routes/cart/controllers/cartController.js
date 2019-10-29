const Cart = require('../models/Cart')

module.exports = {
  createUserCart: (req, res) => {
    let cart = new Cart()

    cart.owner = req.user._id

    cart.save(err => {
      if (err) {
        res.status(400).json({
          confirmation: 'failure',
          message: error
        })
      } else {
        res.redirect('/')
      }
    })
  },

  addProductToCart: (req, res) => {
    Cart.findOne({ owner: req.user._id }).then(cart => {
      const totalPrice = parseFloat(req.body.priceValue)

      cart.items.push({
        item: req.body.productID,
        price: totalPrice,
        quantity: parseInt(req.body.quantity)
      })

      cart.total = (cart.total + totalPrice).toFixed(2)

      cart
        .save()
        .then(cart => {
          res.redirect('/api/cart')
        })
        .catch(err => {
          let errors = {}
          errors.status = 500
          errors.message = err

          res.status(errors.status).json(errors)
        })
    })
  },

  getUserShoppingCart: (req, res) => {
    Cart.findOne({ owner: req.user._id })
      .populate('items.item')
      .exec()
      .then(cart => {
        // console.log(cart)

        res.render('cart/cart', { foundCart: cart })
      })
      .catch(err => {
        let errors = {}
        errors.status = 500
        errors.message = err

        res.status(errors.status).json(errors)
      })
  },

  removeProduct: (req, res) => {
    //? remove item from items
    // Cart.findOne({ owner: req.user._id })
    Cart.findOne({ owner: req.user._id })
      .then(cart => {
        // console.log(`item BEFORE`, cart.items)
        cart.items.pull(req.body.item)
        // console.log(`item AFTER`, cart.items)
        cart.total = (cart.total - parseFloat(req.body.price).toFixed(2))

        cart
          .save()
          .then(cart => {
            req.flash('success', 'Successfully Removed')

            res.redirect('back')
          })
          .catch(err => {
            let errors = {}
            error.status = 500
            error.message = err

            res.status(errors.status).json(errors)
          })
      })
      .catch(err => {
        let errors = {}
        error.status = 500
        error.message = err

        res.status(errors.status).json(errors)
      })
  }



  
}
