const Address = require('../models/address.model');
const Job = require('../models/job.model');
const JobAbility = require('../models/jobAbility.model');
const JobForUser = require('../models/jobForUser.model');
const Helper = require('../helpers/index');

exports.createJob = async (req, res) => {
  try {
    const { description, title, employerId } = req.body;
    const job = new Job({ description, title, employerId });
    const savedJob = await (await job.save()).populate({ path: 'employerId', select: '-password', populate: { path: 'roleId' }});
    const jobResponse = {...savedJob._doc}
    res.status(200).json({ message: 'Job created', data: jobResponse });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
      const { _id, title, description, hourlyRate, serviceFee } = req.body;
      let jobToUpdate = {
        ...( !Helper.isNullOrWhiteSpace(title) && { title } ),
        ...( !Helper.isNullOrWhiteSpace(description) && { description } ),
        ...( !Helper.isNullOrWhiteSpace(hourlyRate) && { hourlyRate } ),
        ...( !Helper.isNullOrWhiteSpace(serviceFee) && { serviceFee } ),
      }
      const jobUpdated = await Job.findByIdAndUpdate(_id, jobToUpdate, {new: true})
        .populate({ path: 'employerId', select: '-password', populate: { path: 'roleId' }});
      if(!jobUpdated){
        res.status(404).json({ message: 'Job not found' });
        return;
      }
      
      res.status(200).json({ message: 'Job updated', data: jobUpdated });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.getJobsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.query;
    const jobs = await Job.find({ employerId: employerId })
      .populate({ path: 'employerId', select: '-password', populate: { path: 'roleId' } })
      .lean();

    const jobsResponse = await Promise.all(
      jobs.map(async (job) => {
        const address = await Address.findOne({ jobId: job._id }).populate('cityId').lean()
        const skills = await JobAbility.find({ jobId: job._id }).populate('abilityId').lean()

        const jobMapping = {
          ...job,
          address,
          skills
        }

        return jobMapping;
      })
    );

    res.status(200).json({ message: 'Success getting jobs', data: jobsResponse });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the user',
    });
  }
};

exports.getAbilitiesByJobId = async (req, res) => {
  try {
    const { jobId } = req.query;
    const abilitiesByJob = await JobAbility.find({ jobId: jobId })
      .populate('abilityId')
      .lean();

    res.status(200).json({ message: 'Success getting abilities', data: abilitiesByJob });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong getting abilities by job',
    });
  }
};

exports.insertAbilitiesForJob = async (req, res) => {
  try {
    const { jobId } = req.query;
    await JobAbility.deleteMany({ jobId: jobId });
    const rowsInserted = await JobAbility.insertMany(req.body);
    res.status(200).json({ message: 'Success updating abilities', data: rowsInserted })
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong inserting abilities for user',
    });
  }
}