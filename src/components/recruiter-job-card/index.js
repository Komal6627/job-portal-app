'use client'

import { useState } from "react";
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import JobApplications from "../job-applicants";

function RecruiterJobCard({jobItem, jobApplications}) {
    console.log(jobApplications, "jobApplications for recruiter");
    
    const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false)
    const[currentCandidateDetails, setCurrentCandidateDetails] = useState(null)
    const [showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal] = useState(false)

     const applicantCount = jobApplications.filter(
    (item) => item.jobId === jobItem?._id.toString()  
  ).length;

   console.log("Final applicantCount:", applicantCount);
   

    return (
        <div>
            <CommonCard icon={<JobIcon/>} title={jobItem?.title}  footerContent = {
                <Button  className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700">
                     {applicantCount} Applicants
                </Button>
            } />

            <JobApplications
                showApplicantsDrawer={showApplicantsDrawer}
                setShowApplicantsDrawer={setShowApplicantsDrawer}
                showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDetails={setCurrentCandidateDetails}
                jobItem={jobItem}
                jobApplications={jobApplications.filter(jobApplicantItem.jobId === jobItem?._id)}
            />
        </div>
    )
}

export default RecruiterJobCard

