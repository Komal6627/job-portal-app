import { fetchJobApplicationForCandidate, fetchJobforCandidateAction } from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";

export default async  function Activity() {
    const user = await currentUser();
    const jobList = await  fetchJobforCandidateAction();
    const jobApplicants = await fetchJobApplicationForCandidate(user?.id)


return <>
    <CandidateActivity
     jobList={JSON.parse(JSON.stringify(jobList))}
     jobApplicants={JSON.parse(JSON.stringify(jobApplicants))}
    />
</>
}

 
