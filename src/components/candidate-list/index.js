"use client";

import { getCandidateDetailsByIdAction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {

    async function handleFetchCandidateDetails(getCurrentCandidateId){
        const data = await getCandidateDetailsByIdAction(getCurrentCandidateId);

        console.log(data);

        if (data) {
            setCurrentCandidateDetails(data)
            setShowCurrentCandidateDetailsModal(true)
        }
        
    }

    console.log(currentCandidateDetails);
    
  return (
    <>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div
                key={jobApplicantItem._id || jobApplicantItem.id}
                className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3>{jobApplicantItem?.name}</h3>
                  <Button
                    onClick={() => handleFetchCandidateDetails(jobApplicantItem?.candidateUserId)}
                    className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() =>{ setShowCurrentCandidateDetailsModal(null);setShowCurrentCandidateDetailsModal(false)} }
      >
        <DialogContent>
          {/* <DialogTitle>Candidate Details</DialogTitle> */}

          <div className="text-lg font-medium">
            <h1 >Name :- {currentCandidateDetails?.candidateInfo?.name}</h1>
            <h1>Email :-  {currentCandidateDetails?.email}</h1>
            <p>Current Company :- {currentCandidateDetails?.candidateInfo.currentCompany}</p>
            <p>Current Job Location :- {currentCandidateDetails?.candidateInfo.currentJobLocation}</p>
            <p>Total Experience:- {currentCandidateDetails?.candidateInfo.totalExperience } Years</p>
            <p>Salary:- {currentCandidateDetails?.candidateInfo.currentSalary}</p>
            <p>Notice Period:- {currentCandidateDetails?.candidateInfo.noticePeriod} Days</p>
            <div className="flex gap-4 mt-1 text-lg">
           Previous Companies:-  {currentCandidateDetails?.candidateInfo?.previousCompany.split(",").map((previousCompany, index) => (
               <h2 key={`${previousCompany}-${index}`}  >{previousCompany}</h2>
              ))}
            </div>
             <div className="flex gap-4 mt-1 text-lg">
           Skills:-  {currentCandidateDetails?.candidateInfo?.skills.split(",").map((skillItem, index) => (
               <h2 key={`${skillItem}-${index}`}  >{skillItem}</h2>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CandidateList;
