"use client";

import { Fragment, useState } from "react";
import { default as CommonCard } from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

function CandidateJobCard({ jobItem }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobItem.title}
          description={jobItem.companyName}
          footerContent={
            <Button
              className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700"
              onClick={() => setShowJobDetailsDrawer(true)}
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <div>
                <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                  {jobItem?.title}
                </DrawerTitle>

                <div className="mt-2 flex items-center gap-2 text-lg text-gray-600">
                  <span>{jobItem?.location}</span>
                  <span>• {jobItem?.type}</span>
                  <span>• {jobItem?.experience} year</span>
                </div>
              </div>

              <div className="flex-gap-3">
                <Button className="disabled:opacity-60  px-5 bg-violet-600 text:white hover:bg-violet-700 m-1">
                  Apply
                </Button>
                <Button
                  className="disabled:opacity-60  px-5 bg-violet-600 text:white hover:bg-violet-700 m-1"
                  onClick={() => setShowJobDetailsDrawer(false)}
                >
                  Cancle
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <div>
            <h1 className="text-xl font-semibold">Skills</h1>
            <div className="flex gap-4 mt-1">
              {jobItem?.skills.split(",").map((skillItem) => (
                <h2 className="text-lg font-normal">{skillItem}</h2>
              ))}
            </div>
          </div>

          <DrawerDescription className="text-xl font-normal text-gray-800 mt-6">
            {jobItem?.description}
          </DrawerDescription>
          <div></div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;
