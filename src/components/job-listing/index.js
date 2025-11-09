"use client";

import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io"; 
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
  const [filterParams, setFilterParams] = useState({});


  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilterparams = { ...filterParams };

    const indexOfCurrentSection = Object.keys(cpyFilterparams).indexOf(
      getSectionId
    );

    if (indexOfCurrentSection === -1) {
      cpyFilterparams = {
        ...cpyFilterparams,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption = cpyFilterparams[getSectionId].indexOf(
        getCurrentOption
      );

      if (indexOfCurrentOption === -1)
        cpyFilterparams[getSectionId].push(getCurrentOption);
      else cpyFilterparams[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilterParams(cpyFilterparams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterparams));
  }

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    option: [...new Set(filterCategories.map((listItem) => listItem[item.id]))],
  }));

  // console.log(filterParams, "filterParams");

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
                      {filterMenu.option.map((option, optionIdx) => {
                        const isSelected =
                          filterParams &&
                          Object.keys(filterParams).length > 0 &&
                          filterParams[filterMenu.id] &&
                          filterParams[filterMenu.id].includes(option);

                        return (
                          <MenubarItem
                            key={optionIdx}
                            className="flex items-center space-x-2 py-1 hover:bg-violet-50 rounded-md cursor-pointer"
                            onClick={() =>
                              handleFilter(filterMenu.id, option)
                            }
                          >
                            <div className="flex items-start gap-2">
                            
                              <div
                                className={`h-4 w-4 mt-1 flex-shrink-0 border border-gray-900 rounded flex items-center justify-center transition-all duration-200 ${
                                  isSelected ? "bg-white scale-110" : "scale-100"
                                }`}
                              >
                                {isSelected && (
                                  <IoMdCheckmark className="text-black text-[10px]" />
                                )}
                              </div>

                              {/* Label Text */}
                              <Label className="cursor-pointer text-sm text-gray-700 leading-snug break-words">
                                {option}
                              </Label>
                            </div>
                          </MenubarItem>
                        );
                      })}
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
          <div className="grid grid-col-1 gap-y-10 lg:grid-col-3">
            <div className="lg:col-span-4">
              <div className="container mx-auto p-0 space-y-8">
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
