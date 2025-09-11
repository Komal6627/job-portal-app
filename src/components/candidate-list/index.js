'use client'

import { Button } from "../ui/button"

 
function CandidateList({jobApplications, currentCandidateDetails, setCurrentCandidateDetails, showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal}) {
    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                jobApplications && jobApplications.length > 0 ? 
                 jobApplications.map(jobApplicantItem => <div    key={jobApplicantItem._id || jobApplicantItem.id}  className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                    <div className="px-4 my-6 flex justify-between items-center">
                        <h3>{jobApplicantItem?.name}</h3>
                        <Button className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700">View Profile</Button>
                    </div>
                 </div>) : null
                }
            </div>
        </>
    )
}

export default CandidateList