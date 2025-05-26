const mongoose = require('mongoose'); // Importa a biblioteca Mongoose para interagir com o MongoDB

// Define o esquema para o modelo Promotion
const promotionSchema = new mongoose.Schema({
  name: {
    type: String // Tipo do campo é String
  },
  type: {
    type: String, // Tipo do campo é String
    enum: ['desconto', 'brinde'] // O valor deve ser um desses valores específicos
  },
  discount: {
    type: Number, // Tipo do campo é Number
    default: 0 // Valor padrão é 0
  },
  startDate: {
    type: Date // Tipo do campo é Date
  },
  endDate: {
    type: Date // Tipo do campo é Date
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId, // Tipo do campo é ObjectId, referenciando o modelo 'Product'
      ref: 'Product' // Referência o modelo 'Product'
    }
  ]
});

// Exporta o modelo Promotion baseado no esquema definido
module.exports = mongoose.model('Promotion', promotionSchema);