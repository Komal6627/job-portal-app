"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../common-form";

function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-light text-violet-700 ">
              Welcome to onbording
            </h1>
            <TabsList>
              <TabsTrigger
                value="candidate"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white bg-gray-200 text-black hover:bg-violet-700 hover:text-white  m-1"
              >
                Candidate
              </TabsTrigger>

              <TabsTrigger
                value="recruiter"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white bg-gray-200 text-black hover:bg-violet-700 hover:text-white  m-1"
              >
                Recruiter
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="candidate">
            Candidate
        </TabsContent >

        <TabsContent value="recruiter">
           <CommonForm formControls={recruiterOnboardFormControls} buttonText={'Onboard as recruiter'}/>
        </TabsContent >
      </Tabs>
    </div>
  );
}

export default OnBoard;
