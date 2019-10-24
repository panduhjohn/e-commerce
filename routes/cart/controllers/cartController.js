const Cart = require('../models/Cart')

module.exports = {
    createUserCart: (req, res) => {
        let cart = new Cart()

        cart.owner = req.user._id

        cart.save(( err ) => {
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

    addProductToCart: (res, req) => {
        console.log('req', req.user);
        
        Cart.findOne({ owner: req.user._id })
            .then(cart => {
                const totalPrice = parseFloat(req.body.priceValue)

                cart.items.push({
                    item: req.body.productID,
                    price: totalPrice,
                    quantity: parseInt(req.body.quantity)
                })

                cart.total = (cart.total + totalPrice).toFixed(2)

                cart.save()
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
        

    }
}