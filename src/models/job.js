import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  location: String,
  type: String,
  experience: String,
  description: String,
  skills: String,
  recruiterId: String,
  applicants: [
    {
      name: String,
      email: String,
      userId: String,
      status: String,
    },
  ],
});

mongoose.models = {};

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
export default Job;