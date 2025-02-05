const User = require('../models/user.model');
let signUp = {};

signUp.verifyDuplicateEmail = async (req, res, next) => {
  const { email } = req.body;
  try{
    const isUserEmailAlreadyExists = await User.exists({ email: email });
    if (isUserEmailAlreadyExists) {
      res.status(400).json({ message: 'The email already exists' });
      return;
    }
    next();
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};

module.exports = signUp;