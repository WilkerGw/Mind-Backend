const mongoose = require('mongoose'); // Importa a biblioteca Mongoose para interagir com o MongoDB

const connectDB = async () => { // Define uma função assíncrona chamada connectDB
  try {
    await mongoose.connect(process.env.MONGO_URI, { // Tenta se conectar ao banco de dados MongoDB usando a URI fornecida nas variáveis de ambiente
      useNewUrlParser: true, // Usa o novo parser de URL do MongoDB
      useUnifiedTopology: true, // Usa o novo gerenciador de topologia do MongoDB
    });
    console.log('Conectado ao MongoDB'); // Se a conexão for bem-sucedida, exibe uma mensagem no console
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message); // Se ocorrer um erro durante a conexão, exibe uma mensagem de erro no console
    process.exit(1); // Encerra o processo com código de status 1, indicando que houve um erro
  }
};

module.exports = connectDB; // Exporta a função connectDB para que possa ser usada em outros arquivos