'use server'

import connectToDB from "@/database"
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

     console.log("Saving job:", formData);
    await Job.create(formData);

    revalidatePath(pathToRevalidate)
}

//fecth job action

export async function fetchJobforRecruiterAction(id) {
    await connectToDB();
  console.log("Fetching jobs for recruiterId:", id);
  const result = await Job.find({ recruiterId: id });
  console.log("Result from DB:", result);
  return JSON.parse(JSON.stringify(result));
}