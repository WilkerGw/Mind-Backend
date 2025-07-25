const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      // ADICIONADO: Campo para armazenar o preço no momento da venda
      unitPrice: { type: Number, required: true, min: 0 } 
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
  timestamps: true
});

module.exports = mongoose.model('Sale', saleSchema);