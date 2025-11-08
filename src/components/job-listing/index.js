"use client";

import { filterMenuDataArray } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";

function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  filterCategories,
}) {
  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    option: [...new Set(filterCategories.map((listItem) => listItem[item.id]))],
  }));

  console.log(filterMenus, "filterMenu");

  return (
    <div>
      <div className="max-auto max-w-7xl">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-violet-800">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1>
          <div className="flex items-center">
            {profileInfo?.role === "candidate" ? (
              <Menubar>
                {filterMenus.map((filterMenu, index) => (
                  <MenubarMenu key={`${filterMenu.id}-${index}`}>
                    <MenubarTrigger className="text-violet-700">
                      {filterMenu.name}
                    </MenubarTrigger>
                    <MenubarContent className="max-w-[200px]">
                      {filterMenu.option.map((option, optionIdx) => (
                        <MenubarItem
                          key={optionIdx}
                          className="flex items-center space-x-2 py-1 hover:bg-violet-50 rounded-md cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <div className="h-4 w-4 mt-1 flex-shrink-0 border border-gray-900 rounded"></div>
                            <Label className="cursor-pointer text-sm text-gray-700 leading-snug break-words">
                              {option}
                            </Label>
                          </div>
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
            ) : (
              <PostNewJob user={user} profileInfo={profileInfo} />
            )}
          </div>
        </div>
        <div className="pt-6 pb-24">
          <div className="grid grid-col-1 gap-y-10 lg:grid-col-3 ">
            <div className="lg:col-span-4">
              <div className="conatiner  mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                  {jobList && jobList.length > 0
                    ? jobList.map((jobItem, index) =>
                        profileInfo?.role === "candidate" ? (
                          <CandidateJobCard
                            profileInfo={profileInfo}
                            key={jobItem._id || index}
                            jobItem={jobItem}
                            jobApplications={jobApplications}
                          />
                        ) : (
                          <RecruiterJobCard
                            profileInfo={profileInfo}
                            key={jobItem._id || index}
                            jobItem={jobItem}
                            jobApplications={jobApplications}
                          />
                        )
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
