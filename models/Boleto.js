const mongoose = require('mongoose'); // Importa a biblioteca Mongoose para interagir com o MongoDB

// Define o esquema para o modelo Boleto
const boletoSchema = new mongoose.Schema({
  client: { 
    type: mongoose.Schema.Types.ObjectId, // Tipo do campo é ObjectId, referenciando o modelo 'Client'
    ref: 'Client', // Referência o modelo 'Client'
    required: true // Campo é obrigatório
  },
  parcelValue: { 
    type: Number, // Tipo do campo é Number
    required: true, // Campo é obrigatório
    min: 0.01 // Valor mínimo positivo
  },
  dueDate: { 
    type: Date, // Tipo do campo é Date
    required: true // Campo é obrigatório
  },
  status: { 
    type: String, // Tipo do campo é String
    enum: ['pago', 'aberto', 'atrasado'], // O valor deve ser um desses valores específicos
    default: 'aberto' // Status padrão é 'aberto'
  },
  description: { 
    type: String // Tipo do campo é String
  }
});

// Exporta o modelo Boleto baseado no esquema definido
module.exports = mongoose.model('Boleto', boletoSchema);