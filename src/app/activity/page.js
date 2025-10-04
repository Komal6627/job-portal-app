import { fetchJobApplicationForCandidate, fetchJobforCandidateAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";

export default async  function Activity() {
    const user = await currentUser();
    const jobList = await  fetchJobforCandidateAction();
    const jobApplicants = await fetchJobApplicationForCandidate()


return <div></div>
}