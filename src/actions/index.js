'use server'

import connectToDB from "@/database"
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//create profile  action
export async function createProfile(formData, pathToRevalidate) {
    await connectToDB();
    await Profile.create(formData);

    revalidatePath(pathToRevalidate);

    
}