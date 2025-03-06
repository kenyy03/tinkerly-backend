const Address = require('../models/address.model');
const Helper = require('../helpers/index');

exports.saveAddress = async (req, res) => {
  try {
    const { userId, cityId, neighborhood, directions } = req.body;
    const addressFound = await Address.findOne({userId: userId}).populate('cityId');
    
    if(Helper.isNullOrUndefined(addressFound)){
      // create address
      const address = new Address({ cityId, neighborhood, directions, userId })
      const addressCreated = await (await address.save()).populate('cityId');
      const addressResponse = {...addressCreated._doc};
      res.status(200).json({ message: 'Address created', data: addressResponse });
      return;
    }else{
      // update address
      const { _id } = req.body;
          let addressToUpdate = {
            ...( !Helper.isNullOrWhiteSpace(userId) && { userId } ),
            ...( !Helper.isNullOrWhiteSpace(cityId) && { cityId } ),
            ...( !Helper.isNullOrWhiteSpace(neighborhood) && { neighborhood } ),
            ...( !Helper.isNullOrWhiteSpace(directions) && { directions } ),
          }
      const addressUpdated = await Address.findByIdAndUpdate(_id, addressToUpdate, {new: true}).populate('cityId');
      if(!addressUpdated){
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'Address updated', data: addressUpdated });
      return;
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.getAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const address = await Address.findOne({userId: userId}).populate('cityId');
    res.status(200).json({ message: 'Success getting address', data: address });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};