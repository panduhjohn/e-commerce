// api/cart
// route to '/' sending 'hey from cart'

const express = require('express')
const router = express.Router()
const cartController = require('./controllers/cartController')

router.get('/', (req, res) => {
    res.send('hey from cart')
})

router.post('/product', cartController.addProductToCart)

module.exports = router



//1. create folder in "cart" named models
    //create cart.js 
//2. in app.js create cartRouter require with the folder tree
//3. in app.js create app.use with the route ',' the name of the router
//4. create folder in routes named "cart"
    //create file called Cart.js (uppercase for some reason)
//5. create folder in "cart" named "controllers"
    //create cartController.js

