const Role = require('../models/role.model');

exports.createRole = async (req, res) => {
  try {
    const { description } = req.body;

    const role = new Role({ description });
    const savedRole = await role.save();
    const roleResponse = {...savedRole._doc}
    res.status(201).json({ message: 'Role created', data: roleResponse });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.getRoles = async (req, res) => {
    try {

      const roles = await Role.find();
      res.status(201).json({ message: 'Success getting roles', data: roles });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        message: error.message || 'Something goes wrong creating the user',
      });
    }
  };