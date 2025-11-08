'use client'

import CommonCard from "../common-card";
import JobIcon from "../job-icon";

import { Tabs, TabsTrigger, TabsList, TabsContent } from "../ui/tabs";

function CandidateActivity({jobList, jobApplicants}) {
    console.log(jobList, "jobList_CA");
    console.log( jobApplicants, "jobApplicants_CA");

    const uniqueStatusArray = [...new Set(jobApplicants.map(jobApplicantItem => jobApplicantItem.status).flat(1))]

    console.log("uniqueStatusArray" , uniqueStatusArray);
    
    
    return(
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full" >
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight  text-violet-800">Your Activity</h1>

                   <TabsList>
                {
                    uniqueStatusArray.map(status => (
                        <TabsTrigger className="mx-0.5 bg-violet-600 text:white hover:bg-violet-700 "  key={status} value={status}>{status}</TabsTrigger>
                    ))
                }
            </TabsList>
            </div>
            <div className="pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="flex flex-col gap-4">
                         {
                            uniqueStatusArray.map(status => 
                                <TabsContent key={status} value={status}>
                                    {
                                        jobList.filter(jobItem => jobApplicants.filter((JobApplication) => JobApplication.status.indexOf(status) > -1).findIndex(filterdItemByStatus => jobItem._id === filterdItemByStatus.jobId ) > -1
                                    ).map(finalFilterdItem => <CommonCard
                                    key={finalFilterdItem._id?.toString()}
                                     icon={<JobIcon/>}
                                     title={finalFilterdItem?.title}
                                     description={finalFilterdItem.companyName}
                                    />)}
                                </TabsContent>
                            )
                         }
                    </div>
                </div>
            </div>
            </Tabs>
         
        </div>
    );
}

export default CandidateActivity

