"use client";

import {
  candidateOnboardFormControls,
  initialCandidateAccountFormData,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)
function AccountInfo({ profileInfo }) {
const [candidateFormData, setCandidateFormData] = useState(
  profileInfo?.candidateInfo
    ? { ...initialCandidateFormData, ...profileInfo.candidateInfo }
    : initialCandidateFormData
);

const [recruiterFormData, setRecruiterFormData] = useState(
  profileInfo?.recruiterInfo
    ? { ...initialRecruiterFormData, ...profileInfo.recruiterInfo }
    : initialRecruiterFormData
);


  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);

    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  console.log(candidateFormData, "candidateformdata");
  console.log(profileInfo, "acountpage");

async function handleResumeUpload(file) {
  console.log({file});
  
  const filePath = `public/${file.name}`;

  const { data, error } = await supabaseClient.storage
    .from("job-board-app")
    .upload(filePath, file, { cacheControl: "3600", upsert: false });
   console.log({data, error});
   
  if (!error && data) {
    setCandidateFormData(() => ({
      ...candidateFormData,
      resume: data.path, // <-- important! store path here
    }));
  } else {
    console.error("Resume upload error:", error);
  }
}


async function handleUpdateAccount() {
  const updatedData =
    profileInfo?.role === "candidate"
      ? {
          _id: profileInfo?._id,
          userId: profileInfo?.userId,
          role: profileInfo?.role,
          email: profileInfo?.email,
          isPremiumUser: profileInfo?.isPremiumUser,
          memberShipType: profileInfo?.memberShipType,
          memberShipStartDate: profileInfo?.memberShipStartDate,
          memberShipEndDate: profileInfo?.memberShipEndDate,
          candidateInfo: {
            ...candidateFormData,
            // use the updated resume from candidateFormData
            resume: candidateFormData.resume,
          },
        }
      : {
          _id: profileInfo?._id,
          userId: profileInfo?.userId,
          role: profileInfo?.role,
          email: profileInfo?.email,
          isPremiumUser: profileInfo?.isPremiumUser,
          memberShipType: profileInfo?.memberShipType,
          memberShipStartDate: profileInfo?.memberShipStartDate,
          memberShipEndDate: profileInfo?.memberShipEndDate,
          recruiterInfo: {
            ...recruiterFormData,
          },
        };
console.log({updatedData});

   await updateProfileAction(updatedData, "/account");
}

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between pb-6 border-b pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          Account Details
        </h1>
      </div>

      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <CommonForm
            action={handleUpdateAccount}
            formControls={
              profileInfo?.role === "candidate"
                ? candidateOnboardFormControls
                : recruiterOnboardFormControls
            }
            formData={
              profileInfo?.role === "candidate"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.role === "candidate"
                ? setCandidateFormData
                : setRecruiterFormData
            }
            buttonText="Update Profile"
            handleFileChange={(file) => handleResumeUpload(file)}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
