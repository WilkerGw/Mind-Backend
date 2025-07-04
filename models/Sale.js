const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  seller: { type: String, required: true },
  paymentMethod: { type: String, enum: ['PIX', 'débito', 'dinheiro', 'cartão', 'boleto'], required: true },
  parcels: [
    {
      installment: { type: Number, required: true, min: 1 },
      value: { type: Number, required: true, min: 0 },
      dueDate: { type: Date, required: true }
    }
  ],
  saleDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  warranty: Boolean,
  warrantyPeriod: String,
  notes: String,
  total: { type: Number, required: true, min: 0 }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Sale', saleSchema);