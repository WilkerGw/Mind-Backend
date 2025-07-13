const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String,
    enum: ['desconto', 'brinde']
  },
  discount: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

module.exports = mongoose.model('Promotion', promotionSchema);