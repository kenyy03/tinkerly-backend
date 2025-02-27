const Ability = require('../models/ability.model')
const UserAbilities = require('../models/userAbility.model');
const Helper = require('../helpers/index');

exports.getAbilitiesByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const abilitiesByUser = await UserAbilities.find({userId: userId}).populate('abilityId');
    res.status(200).json({ message: 'Success getting abilities', data: abilitiesByUser });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong getting abilities by user',
    });
  }
};

exports.getAllAbilities = async (req, res) => {
  try {
    const abilities = await Ability.find();
    res.status(200).json({ message: 'Success getting abilities', data: abilities });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong getting all abilities',
    });
  }
};

exports.insertAbilitiesForUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const rowsEliminated = await UserAbilities.deleteMany({ userId: userId });
    if(!Helper.isFullArray(rowsEliminated)){
      // res.status(400).json({ message: 'Somethings goes wrong eliminating abilities' });
      // return;
    }

    const rowsInserted = await UserAbilities.insertMany(req.body);
    res.status(200).json({ message: 'Success updating abilities', data: rowsInserted })
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong inserting abilities for user',
    });
  }
}

exports.insertAbilities = async (req, res) => {
  try {
    // const { items } = req.body;

    // console.log(items);
    if(!Helper.isFullArray(req.body)){
        res.status(500).json({
            message: error.message || 'Something goes wrong creating abilities',
          });
        return;
    }
    const itemsInserted = await Ability.insertMany(req.body);
    res.status(200).json({ message: 'Ocupation created', data: itemsInserted });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the ocupation',
    });
  }
};