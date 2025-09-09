'use client'

import CandidateJobCard from "../candidate-job-card"
import PostNewJob from "../post-new-job"
import RecruiterJobCard from "../recruiter-job-card"

function JobListing({user, profileInfo, jobList, jobApplications}) {
    // console.log(jobApplications, "jobappliactions") 
    return(
       <div>
            <div className="max-auto max-w-7xl">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-violet-800">
                        {
                            profileInfo?.role === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"
                        }
                    </h1>
                    <div className="flex items-center">
                        {
                            profileInfo?.role === 'candidate' ? <p>Filter</p>: <PostNewJob user={user} profileInfo={profileInfo}/>
                        }
                    </div>
                </div>
                <div className="pt-6 pb-24">
                    <div className="grid grid-col-1 gap-y-10 lg:grid-col-3 ">
                        <div className="lg:col-span-4">
                            <div className="conatiner  mx-auto p-0 space-y-8">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {
                                        jobList && jobList.length > 0
                                        ? jobList.map((jobItem, index) => 
                                        profileInfo?.role === "candidate" ? (
                                            <CandidateJobCard 
                                            profileInfo={profileInfo}
                                            key={jobItem._id || index} jobItem={jobItem} 
                                            jobApplications = {jobApplications}
                                            />
                                        ) : (
                                            <RecruiterJobCard 
                                            profileInfo={profileInfo} 
                                            key={jobItem._id || index} jobItem={jobItem}
                                            jobApplications = {jobApplications}
                                            />
                                        )
                                        ):null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default JobListing

