const City = require('../models/city.model');
const Helper = require('../helpers/index');

exports.createCity = async (req, res) => {
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
    const itemsInserted = await City.insertMany(req.body);
    res.status(201).json({ message: 'City created', data: itemsInserted });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.getCities = async (req, res) => {
    try {

      const cities = await City.find();
      res.status(200).json({ message: 'Success getting cities', data: cities });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        message: error.message || 'Something goes wrong creating the user',
      });
    }
  };