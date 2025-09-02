import { default as mongoose } from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    recruiterUserId : String,
    name : String,
    email : String,
    candidateUserId : String,
    status : Array,
    jobId : String,
    jobAppliedDate : String
})

const Application = mongoose.model.Application || mongoose.model('Application', ApplicationSchema)

export default Application

