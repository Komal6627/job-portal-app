'use client'

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog,  DialogContent, DialogTitle, DialogHeader } from "../ui/dialog"
import CommonForm from "../common-form"
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils"

function PostNewJob({profileInfo}) {
    const [showJobDialog, setShowJobDialog] = useState(false);
    const [jobFormData, setJobFormData] = useState(initialPostNewJobFormData);

     useEffect(() => {
    if (profileInfo?.recruiterInfo?.companyName) {
      setJobFormData(prev => ({
        ...prev,
        companyName: profileInfo?.recruiterInfo?.companyName,
      }));
    }
  }, [profileInfo]);

  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every((control) => jobFormData[control].trim() !== '');
  }

    return(
        <div>
            <Button onClick={() => setShowJobDialog(true)}  className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700">
                Post a Job
            </Button>
            <Dialog open={showJobDialog} onOpenChange={()=> 
           { setShowJobDialog(false);
             setJobFormData({
                ...initialPostNewJobFormData,
                companyName: profileInfo?.recruiterInfo?.companyName,

             })
           }


            }>
                <DialogContent className="sm: max-w-screen-md h-[600px] overflow-auto ">
                    
                    <DialogHeader>
                        <DialogTitle className="text-violet-700 font-bold text-xl">Post New Job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm buttonText={'Add'} 
                            formData={jobFormData}
                            setFormData={setJobFormData}
                            formControls={postNewJobFormControls}
                            isBtnDisabled={!handlePostNewBtnValid()}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostNewJob