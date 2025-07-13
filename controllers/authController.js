const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); 

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    return next(new Error('Por favor, preencha todos os campos.'));
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(409); 
      return next(new Error('Este email já está a ser utilizado.'));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        message: 'Utilizador registado com sucesso!',
      });
    } else {
      res.status(400);
      return next(new Error('Dados de utilizador inválidos.'));
    }
  } catch (error) {
    return next(error);
  }
};


const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user._id, 
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(401);
            return next(new Error('Credenciais inválidas.'));
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = {
  registerUser,
  loginUser,
};