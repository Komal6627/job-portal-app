"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { recruiterOnboardFormControls, initialRecruiterFormData, candidateFormControls, initialCandidateFormData } from "@/utils";
import {  createProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient('https://buswlgtlflujyoslykpt.supabase.co' ,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1c3dsZ3RsZmx1anlvc2x5a3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzE3OTYsImV4cCI6MjA3MTk0Nzc5Nn0.IQ4zdiOjpDXcgAv7hFb4d7z6vmCbiO9PZEW1Zl3AF-I")


function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)

  const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData)

  const[file, setFile] = useState(null)

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  console.log(recruiterFormData,'recruter form data');
  
  function handleRecruiterFormValid() {
      return recruiterFormData && recruiterFormData.name.trim() !== '' && recruiterFormData.companyName !== '' &&  recruiterFormData.companyRole.trim() !== ''
  }

  const currentAuthUser = useUser();
  const {user} = currentAuthUser;
  console.log(currentAuthUser);

  function handleFileChange(event) {
      event.preventDefault();
      // console.log(event.target.files, "resume");
      setFile(event.target.files[0])
  }

  async function handleUploadPdfToSupabase() {
    const {data, error} = await supabaseClient.storage.from('job-board').upload('/public/${file.name}', {
      cacheControl : "3600",
      upsert: false
    })
  };

  useEffect(() => {
    if (file) {
      handleUploadPdfToSupabase()
    }
  }, [file])
  

  async function createProfile(){
      const data = {
        recruiterInfo : recruiterFormData,
        role : 'recruiter',
        isPremiumUser : false,
        userId : user?.id,
        email : user?.primaryEmailAddress?.emailAddress,
        
      }
      await createProfileAction(data, '/onboard');
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
           <CommonForm  formControls={candidateFormControls}
            buttonText={'Onboard as candidate'} 
            formData={candidateFormData} 
            setFormData={setCandidateFormData} 
            handleFileChange={handleFileChange}
           />
        </TabsContent >

        <TabsContent value="recruiter">
           <CommonForm formControls={recruiterOnboardFormControls} buttonText={'Onboard as recruiter'}
           formData={ recruiterFormData}
           setFormData={setRecruiterFormData}
           isBtnDisabled={!handleRecruiterFormValid()}
           action={createProfile}
           />
        </TabsContent >
      </Tabs>
    </div>
  );
}

export default OnBoard;
