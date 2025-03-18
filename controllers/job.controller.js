const Address = require('../models/address.model');
const Job = require('../models/job.model');
const JobAbility = require('../models/jobAbility.model');
const JobForUser = require('../models/jobForUser.model');
const Helper = require('../helpers/index');

exports.createJob = async (req, res) => {
  try {
    const { description, title, employerId } = req.body;
    const job = new Job({ description, title, employerId });
    const savedJob = await job.save();
    const jobResponse = {...savedJob._doc}
    res.status(200).json({ message: 'Job created', data: jobResponse });
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
      .populate({ path: 'employerId', select: '-password' })
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