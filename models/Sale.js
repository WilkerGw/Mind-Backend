const mongoose = require('mongoose'); // Importa a biblioteca Mongoose para interagir com o MongoDB

// Define o esquema para o modelo Sale
const saleSchema = new mongoose.Schema({
  client: { 
    type: mongoose.Schema.Types.ObjectId, // Tipo do campo é ObjectId, referenciando o modelo 'Client'
    ref: 'Client', // Referência o modelo 'Client'
    required: true // Campo é obrigatório
  },
  products: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, // Tipo do campo é ObjectId, referenciando o modelo 'Product'
        ref: 'Product', // Referência o modelo 'Product'
        required: true // Campo é obrigatório
      },
      quantity: { 
        type: Number, // Tipo do campo é Number
        required: true, // Campo é obrigatório
        min: 1 // Valor mínimo é 1
      }
    }
  ],
  seller: { 
    type: String, // Tipo do campo é String
    required: true // Campo é obrigatório
  },
  paymentMethod: { 
    type: String, // Tipo do campo é String
    enum: ['PIX', 'débito', 'dinheiro', 'cartão', 'boleto'], // O valor deve ser um desses valores específicos
    required: true // Campo é obrigatório
  },
  parcels: [
    {
      installment: { 
        type: Number, // Tipo do campo é Number
        required: true, // Campo é obrigatório
        min: 1 // Valor mínimo é 1
      },
      value: { 
        type: Number, // Tipo do campo é Number
        required: true, // Campo é obrigatório
        min: 0 // Valor mínimo é 0
      },
      dueDate: { 
        type: Date, // Tipo do campo é Date
        required: true // Campo é obrigatório
      }
    }
  ],
  saleDate: {
    type: String, // Tipo do campo é String
    validate: {
      validator: function(v) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v); // Valida se o valor está no formato YYYY-MM-DD
      },
      message: props => `Data inválida: ${props.value} não está no formato YYYY-MM-DD` // Mensagem de erro se a validação falhar
    }
  },
  warranty: Boolean, // Tipo do campo é Boolean
  warrantyPeriod: String, // Tipo do campo é String
  notes: String, // Tipo do campo é String
  total: { 
    type: Number, // Tipo do campo é Number
    required: true, // Campo é obrigatório
    validate: {
      validator: function(v) {
        return v >= 0; // Valida se o valor é não negativo
      },
      message: 'Total deve ser um número válido e não negativo' // Mensagem de erro se a validação falhar
    }
  }
});

// Exporta o modelo Sale baseado no esquema definido
module.exports = mongoose.model('Sale', saleSchema);