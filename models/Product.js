const mongoose = require('mongoose'); // Importa a biblioteca Mongoose para interagir com o MongoDB

// Define o esquema para o modelo Product
const productSchema = new mongoose.Schema({
  code: {
    type: String, // Tipo do campo é String
    required: true, // Campo é obrigatório
    unique: true, // Campo deve ser único
    trim: true // Remove espaços em branco no início e fim do valor
  },
  name: {
    type: String, // Tipo do campo é String
    required: true // Campo é obrigatório
  },
  price: {
    type: Number, // Tipo do campo é Number
    required: true // Campo é obrigatório
  },
  costPrice: {
    type: Number, // Tipo do campo é Number
    required: true // Campo é obrigatório
  },
  type: {
    type: String, // Tipo do campo é String
    enum: ['Óculos de Sol', 'Aramação de Grau', 'Lente', 'Serviço/Conserto'], // O valor deve ser um desses valores específicos
    required: true // Campo é obrigatório
  },
  design: {
    type: String, // Tipo do campo é String
    enum: ['Quadrado', 'Redondo', 'Hexagonal', 'Gatinho', 'Ballgriff'], // O valor deve ser um desses valores específicos
    required: true // Campo é obrigatório
  },
  material: {
    type: String, // Tipo do campo é String
    enum: [
      'Acetato',
      'TR-90',
      'Metal',
      'TR-90+METAL',
      'ACETATO+METAL'
    ], // O valor deve ser um desses valores específicos
    required: true // Campo é obrigatório
  },
  stock: {
    type: Number, // Tipo do campo é Number
    min: 0, // Valor mínimo é 0
    required: true // Campo é obrigatório
  },
  createdAt: {
    type: Date, // Tipo do campo é Date
    default: Date.now // Valor padrão é a data atual
  }
});

// Exporta o modelo Product baseado no esquema definido
module.exports = mongoose.model('Product', productSchema);