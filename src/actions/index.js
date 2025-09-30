'use server'

import connectToDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//create profile  action
export async function createProfileAction(formData, pathToRevalidate) {
    await connectToDB();
    await Profile.create(formData);

    revalidatePath(pathToRevalidate);    
}

export async function fetchProfileAction(id) {
    await connectToDB();
    const result = await Profile.findOne({userId : id})

    return JSON.parse(JSON.stringify(result));    
}

//create job action
export async function postNewJobAction(formData, pathToRevalidate) {
    await connectToDB();

    //  console.log("Saving job:", formData);
    await Job.create(formData);

    revalidatePath(pathToRevalidate)
}

//fecth job action

export async function fetchJobforRecruiterAction(id) {
    await connectToDB();
//   console.log("Fetching jobs for recruiterId:", id);
  const result = await Job.find({ recruiterId: id });
//   console.log("Result from DB:", result);
  return JSON.parse(JSON.stringify(result));
}


export async function fetchJobforCandidateAction() {
    await connectToDB();

    const result = await Job.find({});

    return JSON.parse(JSON.stringify(result));
}


//create job application
export async function createJobApplicationAction(data, pathToRevalidate) {
    await connectToDB();
    await Application.create(data);
    revalidatePath(pathToRevalidate);
}


//fetch job application - candidate
export async function fetchJobApplicationForCandidate(userId) {
  console.log("Querying with candidateUserId:", userId);
  const applications = await Application.find({ candidateUserId: userId });
  console.log("Applications fetched:", applications);
  return applications;
}



//fetch job application - recruiter

export async function fetchJobApplicationForRecruiter(recruiterUserId) {
    await connectToDB();
    const result = await Application.find({recruiterUserId})
    return JSON.parse(JSON.stringify(result));
}


//update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

//get candidate detils by candidateId

export async  function getCandidateDetailsByIdAction(currentCandidateId) {
    await connectToDB();
    const result =await Profile.findOne({userId : currentCandidateId})

    return JSON.parse(JSON.stringify(result));
}


