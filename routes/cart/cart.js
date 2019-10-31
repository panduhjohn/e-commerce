// api/cart
// route to '/' sending 'hey from cart'
require('dotenv').config()

const express = require('express')
const router = express.Router()

const async = require('async')


const stripe = require('stripe')(process.env.STRIPE_SK) //* use secret stripe key

const cartController = require('./controllers/cartController')

const Cart = require('./models/Cart')

router.get('/', cartController.getUserShoppingCart)

router.post('/product', cartController.addProductToCart)

router.delete('/remove', cartController.removeProduct)

router.post('/payment', (req, res, next) => {
  const stripeToken = req.body.stripeToken
  const currentCharges = req.body.stripeMoney * 100

  stripe.customers
    .create({
      source: stripeToken
    })
    .then(customer => {
      const result = stripe.charges.create({
        amount: currentCharges,
        currency: 'usd',
        customer: customer.id
      })
      return result
    })
    .then(result => {
      async.waterfall([
        callback => {
          Cart.findOne(
            {
              owner: req.user._id
            },
            (error, cart) => {
              callback(error, cart)
            }
          )
        },
        (cart, callback) => {
          //? add items to user HX
          let user = req.user
          for (let order of cart.items) {
            user.history.push({
              item: order.item,
              paid: order.price
            })
          }
          user.save((error, user) => {
            if (error) return next(error)

            callback(null, cart)
          })
        },
        cart => {
          //? erase everything in cart.items
          Cart.update(
            {
              $set: {
                items: [],
                total: 0
              }
            },
            (error, updated) => {
              if (updated) res.render('thanks')
            }
          )
          //? add message that cart was charged.
        }
      ])
    })
    .catch(error => {
      let errors = {}
      errors.status = 500
      errors.message = error

      res.status(errors.status).json(errors)
    })
})

module.exports = router

//1. create folder in "cart" named models
//create cart.js
//2. in app.js create cartRouter require with the folder tree
//3. in app.js create app.use with the route ',' the name of the router
//4. create folder in routes named "cart"
//create file called Cart.js (uppercase for some reason)
//5. create folder in "cart" named "controllers"
//create cartController.js
