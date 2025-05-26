const mongoose = require('mongoose'); // Importa a biblioteca Mongoose para interagir com o MongoDB

// Define o esquema para o modelo Agendamento
const agendamentoSchema = new mongoose.Schema({
  name: {
    type: String, // Tipo do campo é String
    required: true // Campo é obrigatório
  },
  telephone: {
    type: String, // Tipo do campo é String
    required: true // Campo é obrigatório
  },
  date: {
    type: Date, // Tipo do campo é Date
    required: true // Campo é obrigatório
  },
  hour: {
    type: String, // Tipo do campo é String
    required: true // Campo é obrigatório
  },
  observation: {
    type: String, // Tipo do campo é String
    required: true // Campo é obrigatório
  },
  contactado: {
    type: Boolean, // Tipo do campo é Boolean
    default: false // Valor padrão é false
  },
  compareceu: {
    type: Boolean, // Tipo do campo é Boolean
    default: false // Valor padrão é false
  },
  faltou: {
    type: Boolean, // Tipo do campo é Boolean
    default: false // Valor padrão é false
  }
});

// Exporta o modelo Agendamento baseado no esquema definido
module.exports = mongoose.model('Agendamento', agendamentoSchema);