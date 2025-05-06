const Address = require('../models/address.model');
const Job = require('../models/job.model');
const JobAbility = require('../models/jobAbility.model');
const JobForUser = require('../models/jobForUser.model');
const Helper = require('../helpers/index');
const config = require('../config/index').config;


exports.createJob = async (req, res) => {
  try {
    const { description, title, employerId, hourlyRate, serviceFee } = req.body;
    const job = new Job({ description, title, employerId, hourlyRate, serviceFee });
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

exports.createJobForUser = async (req, res) => {
  try {
    const { jobId, employeeId, employerId, hourlyRate, serviceFee } = req.body;
    const jobForUser = new JobForUser({ 
      jobId, 
      employeeId, 
      employerId, 
      hourlyRate, 
      serviceFee 
    });
    const savedJob = await (await (await (await jobForUser.save())
      .populate({ path: 'employerId', select: '-password', populate: { path: 'roleId' }}))      
      .populate({ path: 'employeeId', select: '-password', populate: { path: 'roleId' }}))
      .populate({ path: 'jobId', select: '-employerId' });

    const jobResponse = {...savedJob._doc}
    res.status(200).json({ message: 'Job created', data: jobResponse });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the job for user',
    });
  }
};

exports.getJobForUserByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.query;
    const jobs = await JobForUser.find({ employeeId: employeeId })
      .populate({ path: 'employerId', select: '-password', populate: { path: 'roleId' } })
      .populate({ path: 'employeeId', select: '-password', populate: { path: 'roleId' } })
      .populate({ path: 'jobId', select: '-employerId' })
      .lean();

    // const jobsResponse = await Promise.all(
    //   jobs.map(async (job) => {
    //     const address = await Address.findOne({ jobId: job._id }).populate('cityId').lean()
    //     const skills = await JobAbility.find({ jobId: job._id }).populate('abilityId').lean()

    //     const jobMapping = {
    //       ...job,
    //       address,
    //       skills
    //     }

    //     return jobMapping;
    //   })
    // );

    // res.status(200).json({ message: 'Success getting jobs', data: jobsResponse });
    res.status(200).json({ message: 'Success getting jobs', data: jobs });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong getting the job for employee',
    });
  }
}

exports.getJobForUserByEmployer = async (req, res) => {
  try {
    const { employerId } = req.query;
    const jobs = await JobForUser.find({ employerId: employerId })
      .populate({ path: 'employerId', select: '-password', populate: { path: 'roleId' } })
      .populate({ path: 'employeeId', select: '-password', populate: { path: 'roleId' } })
      .populate({ path: 'jobId', select: '-employerId' })
      .lean();

    res.status(200).json({ message: 'Success getting jobs', data: jobs });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message || 'Something goes wrong getting the job for employee',
    });
  }
}

exports.updateJobForUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { 
      hourlyRate, 
      serviceFee, 
      isConfirmedByEmployee, 
      isConfirmedByEmployer, 
      status 
    } = req.body;

    // Validate status against config.JOB_STATUS if provided
    if (status && !Object.values(config.JOB_STATUS).includes(status)) {
      console.log('Invalid status value')
      return res.status(400).json({ 
        message: 'Invalid status value' 
      });
    }

    let jobToUpdate = {
      ...(!Helper.isNullOrWhiteSpace(hourlyRate) && { hourlyRate }),
      ...(!Helper.isNullOrWhiteSpace(serviceFee) && { serviceFee }),
      ...(typeof isConfirmedByEmployee === 'boolean' && { isConfirmedByEmployee }),
      ...(typeof isConfirmedByEmployer === 'boolean' && { isConfirmedByEmployer }),
      ...(!Helper.isNullOrWhiteSpace(status) && { status })
    };

    const updatedJob = await JobForUser.findByIdAndUpdate(id, jobToUpdate, { new: true })
      .populate({ path: 'employerId', select: '-password', populate: { path: 'roleId' } })
      .populate({ path: 'employeeId', select: '-password', populate: { path: 'roleId' } })
      .populate({ path: 'jobId', select: '-employerId' });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job for user not found' });
    }

    res.status(200).json({ 
      message: 'Job for user updated successfully', 
      data: updatedJob 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message || 'Something went wrong updating the job for user'
    });
  }
};