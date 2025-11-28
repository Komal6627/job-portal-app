"use client";

import { initialCandidateFormData, initialRecruiterFormData, candidateOnboardFormControls, recruiterOnboardFormControls} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";

function AccountInfo({ profileInfo }) {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );

  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);

    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  console.log(candidateFormData, recruiterFormData, "acountpage");

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
          />
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
