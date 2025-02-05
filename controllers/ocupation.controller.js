const Ocupation = require('../models/ocupation.model');
const Helper = require('../helpers/index');

exports.createOcupation = async (req, res) => {
  try {
    // const { items } = req.body;

    // console.log(items);
    if(!Helper.isFullArray(req.body)){
        res.status(500).json({
            message: error.message || 'Something goes wrong creating the user',
          });
        return;
    }
    // const city = new City({ description });
    // const savedcity = await city.save();
    // const cityResponse = {...savedcity._doc}
    const itemsInserted = await Ocupation.insertMany(req.body);
    res.status(201).json({ message: 'Ocupation created', data: itemsInserted });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the ocupation',
    });
  }
};

exports.getOcupations = async (req, res) => {
    try {

      const ocupations = await Ocupation.find();
      res.status(201).json({ message: 'Success getting ocupations', data: ocupations });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        message: error.message || 'Something goes wrong gettings the ocupations',
      });
    }
  };