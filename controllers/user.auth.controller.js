const Helper = require('../helpers/index');
const User = require('../models/user.model');
const Ability = require('../models/ability.model');
const Address = require('../models/address.model');
const UserOcupation = require('../models/userOcupation.model');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/verify.jwt.middleware');
const cloudinary = require('../config/cloudinary.config');

exports.signUp = async (req, res) => {
  try {
    const { names, lastNames, email, phone, password, roleId } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      names,
      lastNames,
      email,
      phone,
      password: encryptedPassword,
      roleId: roleId._id,
    });

    const savedUser = await (await user.save()).populate('roleId');
    const token = auth.createToken(savedUser?._id, savedUser?.email);
    const userResponse = {...savedUser._doc, token, password: undefined}
    res.status(200).json({ message: 'User created', data: userResponse });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const username = await User.findOne({ email })
      .populate('roleId');
    const credentialsValid =
      username && (await bcrypt.compare(password, username?.password));
    if (!credentialsValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = auth.createToken(username?._id, username?.email);
    const userResponse = {...username._doc, token, password: undefined}
    res.status(200).json({ message: 'User logged', data: userResponse });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong login the user',
    });
  }
};

exports.getUserById = async (req, res) => {
  const { _id } = req.query;
  try{
    const user = await User.findById({_id})
      .populate('roleId');
    
    if(!user){
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const token = auth.createToken(user?._id, user?.email);
    const userResponse = {...user._doc, token, password: undefined}
    res.status(200).json({ message: 'User found', data: userResponse });
    return;
  }
  catch(error){
    res.status(500).json({
      message: error.message || 'Something goes wrong getting the user',
    });
  }
};

exports.updateUser = async (req, res) => {
  const { names, lastNames, phone, _id, description } = req.body;
  try{
    let userToUpdate = {
      ...( !Helper.isNullOrWhiteSpace(names) && { names } ),
      ...( !Helper.isNullOrWhiteSpace(lastNames) && { lastNames } ),
      ...( !Helper.isNullOrWhiteSpace(phone) && { phone } ),
      ...( !Helper.isNullOrWhiteSpace(description) && { description } ),
    }
    const response = await User.findByIdAndUpdate(_id, userToUpdate, {new: true})
      .populate('roleId')

    if(!response){
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const token = auth.createToken(response?._id, response?.email);
    const userResponse = {...response._doc, token, password: undefined} 
    res.status(200).json({ message: 'User updated', data: userResponse });
  }
  catch(error){
    res.status(500).json({
      message: error.message || 'Something goes wrong updating the user',
    });
  }
};

exports.changeImageProfile = async (req, res) => {
  const files = req.files;
  try{
    if(!files?.imageProfile){
      res.status(400).json({ message: 'No image provided' });
      return;
    }
    const { _id } = req.body;
    if(Helper.isNullOrWhiteSpace(_id)){
      res.status(400).json({ message: 'No user id provided' });
      return;
    }
    
    const responseCloudinary = await cloudinary.uploadImage(files?.imageProfile?.tempFilePath, 'users', _id); 
    if(!Helper.isFullObject(responseCloudinary)){
      res.status(500).json({ message: 'Something goes wrong uploading the image on cloudinary' });
      return;
    }

    const imageProfile = {
      publicId: responseCloudinary.public_id,
      url: responseCloudinary.secure_url
    }
    const userUpdated = await User.findByIdAndUpdate(_id, {imageProfile}, {new: true})
      .populate('roleId');
    
    if(!userUpdated){
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const token = auth.createToken(userUpdated?._id, userUpdated?.email);
    const userResponse = {...userUpdated._doc, token, password: undefined} 
    
    res.status(200).json({ message: 'User image profile updated', data: userResponse });
  }catch(error){
    res.status(500).json({
      message: error.message || 'Something goes wrong updating the user',
    });
  }
}

exports.publicProfile = async (req, res) => {
  try{
    const { _id, isPublicProfile } = req.body;
    if(Helper.isNullOrWhiteSpace(_id)){
      res.status(400).json({ message: 'No user id provided' });
      return;
    }
    const userUpdated = await User.findByIdAndUpdate(_id, {isPublicProfile}, {new: true})
      .populate('roleId');
    
    if(!userUpdated){
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const token = auth.createToken(userUpdated?._id, userUpdated?.email);
    const userResponse = {...userUpdated._doc, token, password: undefined} 
    
    res.status(200).json({ message: 'User public profile updated', data: userResponse });

  }catch(error){
    res.status(500).json({
      message: error.message || 'Something goes wrong updating the user',
    });
  }
};

exports.getUsersByIsPublicProfile = async (req, res) => {
  try{
    const users = await User.find({isPublicProfile: true})
      .populate('roleId');

    if(!users){
      res.status(404).json({ message: 'Users not found' });
      return;
    }
    const usersResponse = users.map(user => {
      const token = auth.createToken(user?._id, user?.email);
      const userResponse = {...user._doc, token, password: undefined} 
      return userResponse;
    })
    res.status(200).json({ message: 'Users found', data: usersResponse });
  }catch(error){
    res.status(500).json({
      message: error.message || 'Something goes wrong getting the users',
    });
  }
};

exports.getPublicUsersForResume = async (req, res) => {
  try {
    const users = await User.find({ isPublicProfile: true })
      .sort({ 'createdAt': -1 })
      .limit(3)
      .populate('roleId')

    if(!users){
      res.status(404).json({ message: 'Users Not Found' });
      return;
    }

    const usersResponse = await Promise.all( users.map(async (user) => {
      // const token = auth.createToken(user?._id, user?.email);
      const userResponse = {...user._doc, password: undefined}
      return userResponse;
    }));

    res.status(200).json({ message: 'Success getting users', data: usersResponse });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Something goes wrong getting the users' });
  }
};