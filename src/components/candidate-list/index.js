"use client";

import { getCandidateDetailsByIdAction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { createClient } from "@supabase/supabase-js";


const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)


function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIdAction(getCurrentCandidateId);

    // console.log(data);

    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  console.log(currentCandidateDetails);

  function handlePreviewResume() {
    const {data} = supabaseClient.storage.from('job-board-app').getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    const a = document.createElement('a');

    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // console.log(data, 'resume');
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(item =>item.candidateUserId === currentCandidateDetails?.userId);

    console.log(indexOfCurrentJobApplicant);
    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status : cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
    }

    console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
    
    
  }

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
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserId
                      )
                    }
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
        onOpenChange={() => {
          setShowCurrentCandidateDetailsModal(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent className="max-w-lg p-6 rounded-2xl shadow-xl bg-white">
          <DialogTitle className="sr-only">Candidate Details</DialogTitle>

          <div className="mb-4 border-b pb-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentCandidateDetails?.candidateInfo?.name}
            </h1>
            <p className="text-gray-600">{currentCandidateDetails?.email}</p>
          </div>

          <div className="space-y-3 text-gray-800">
            <p>
              <span className="font-semibold">Current Company:</span>{" "}
              {currentCandidateDetails?.candidateInfo.currentCompany}
            </p>
            <p>
              <span className="font-semibold">Job Location:</span>{" "}
              {currentCandidateDetails?.candidateInfo.currentJobLocation}
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {currentCandidateDetails?.candidateInfo.totalExperience} Years
            </p>
            <p>
              <span className="font-semibold">Salary:</span>{" "}
              {currentCandidateDetails?.candidateInfo.currentSalary}
            </p>
            <p>
              <span className="font-semibold">Notice Period:</span>{" "}
              {currentCandidateDetails?.candidateInfo.noticePeriod} Days
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Previous Companies</h2>
            <div className="flex flex-wrap gap-2">
              {(currentCandidateDetails?.candidateInfo?.previousCompanies ?? "")
                .split(",")
                .filter(Boolean)
                .map((previousCompany, index) => (
                  <span
                    key={`${previousCompany}-${index}`}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {previousCompany}
                  </span>
                ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {currentCandidateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem, index) => (
                  <span
                    key={`${skillItem}-${index}`}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skillItem}
                  </span>
                ))}
            </div>
          </div>
           <DialogFooter>
          <div className="flex gap-3">
              <Button onClick={handlePreviewResume}  className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700">
                Resume
              </Button>
              <Button className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700" onClick={() => handleUpdateJobStatus('selected')} >Select</Button>
              <Button className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700" onClick={() => handleUpdateJobStatus('rejected')}>Reject</Button>
          </div>
        </DialogFooter>
        </DialogContent>
       
      </Dialog>
    </>
  );
}

export default CandidateList;
