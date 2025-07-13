const mongoose = require('mongoose');

const boletoSchema = new mongoose.Schema({
  client: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  parcelValue: { 
    type: Number,
    required: true,
    min: 0.01
  },
  dueDate: { 
    type: Date,
    required: true
  },
  status: { 
    type: String,
    enum: ['pago', 'aberto', 'atrasado'],
    default: 'aberto'
  },
  description: { 
    type: String
  }
});

module.exports = mongoose.model('Boleto', boletoSchema);