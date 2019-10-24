// owner, ref to user
// total price
// items
//[
//item, ref to product
//price
//quantity
//]

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  total: {type: Number, default : 0},
  items: [{
    item: { type: Schema.Types.ObjectId, ref: 'product' },
    price: { type: Number, default: 1 },
    quantity: { type: Number, default: 0 },
    
  }],

  
})

module.exports = mongoose.model('cart', CartSchema)
