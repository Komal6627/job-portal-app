'use client'

 
function CandidateList({jobApplications, currentCandidateDetails, setCurrentCandidateDetails, showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal}) {
    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                jobApplications && jobApplications.length > 0 ? 
                 jobApplications.map(jobApplicantItem => <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                    <div className="px-4 my-6 flex justify-between items-center">
                        <h3>{jobApplicantItem?.name}</h3>
                    </div>
                 </div>) : null
                }
            </div>
        </>
    )
}

export default CandidateList