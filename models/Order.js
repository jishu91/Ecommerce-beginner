const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        default: 'Placed'
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
