import {
  createFilterCategoryAction,
  fetchJobApplicationForCandidate,
  fetchJobApplicationForRecruiter,
  fetchJobforCandidateAction,
  fetchJobforRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobsPage({searchParams}) {
  console.log(searchParams, "searchparams");
  
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobforCandidateAction()
      : await fetchJobforRecruiterAction(user?.id);

  // console.log(jobList, "joblist server");

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationForCandidate(profileInfo?.userId)
      : await fetchJobApplicationForRecruiter(profileInfo?.userId);

  const fetchFilterCategories = await createFilterCategoryAction()

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={JSON.parse(JSON.stringify(jobList))}
      jobApplications={JSON.parse(JSON.stringify(getJobApplicationList))}
      filterCategories = {fetchFilterCategories}
    />
  );
}

export default JobsPage;
