
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true, 
    match: [/.+\@.+\..+/, 'Por favor, insira um email válido.'],
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('User', userSchema);