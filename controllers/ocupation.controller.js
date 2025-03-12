const Ocupation = require('../models/ocupation.model');
const UserOcupation = require('../models/userOcupation.model');
const Helper = require('../helpers/index');

exports.createOcupation = async (req, res) => {
  try {
    if(!Helper.isFullArray(req.body)){
        res.status(500).json({
            message: error.message || 'Something goes wrong creating the ocupations, array list is empty',
          });
        return;
    }

    const itemsInserted = await Ocupation.insertMany(req.body);
    res.status(200).json({ message: 'Ocupation created', data: itemsInserted });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the ocupation',
    });
  }
};

exports.assignOcupationToUser = async (req, res) => {
  try {
    const { ocupationId, userId, hourlyRate, serviceFee } = req.body;
    const userOcupation = await UserOcupation.findOne({ userId: userId});

    if(Helper.isNullOrUndefined(userOcupation)){
      const ocupationToAssign = new UserOcupation({ ocupationId: ocupationId, userId, hourlyRate, serviceFee })
      const ocupationAssigned = await ocupationToAssign.save();
      const ocupationAssignedResponse = {...ocupationAssigned._doc}
      res.status(200).json({ message: 'Ocupation assigned', data: ocupationAssignedResponse });
      return;
    }else{
      userOcupation.ocupationId = ocupationId;
      userOcupation.hourlyRate = hourlyRate;
      userOcupation.serviceFee = serviceFee;
      const ocupationAssignUpdated = await userOcupation.save();
      const response = {...ocupationAssignUpdated._doc};
      res.status(200).json({ message: 'Ocupation assigned', data: response });
      return;
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong assign ocupation to user.',
    });
  }
}

exports.getOcupationByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await UserOcupation.findOne({ userId: userId })
      .populate('ocupationId')
      .lean();
    if(Helper.isNullOrUndefined(response)){
      res.status(400).json({
        message: `Not found user with id: ${userId}`,
      });
      return;
    }

    const ocupationResponse = {
      ...response, 
      hourlyRate: (response.hourlyRate.toString()),
      serviceFee: (response.serviceFee.toString())
    };
    res.status(200).json({ message: 'Getting ocupation by user id', data: ocupationResponse });
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message || 'Something goes wrong getting ocupation by user id' })
  }
}

exports.getOcupations = async (req, res) => {
  try {
    const ocupations = await Ocupation.find().lean();
    res.status(200).json({ message: 'Success getting ocupations', data: ocupations });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong gettings the ocupations',
    });
  }
};