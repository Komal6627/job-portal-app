'use client'

import { Drawer, DrawerContent } from "../ui/drawer"
import { ScrollArea } from "../ui/scroll-area"





function JobApplications({showApplicantsDrawer, setShowApplicantsDrawer, showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal, currentCandidateDetails, setCurrentCandidateDetails, jobItem, jobApplications}) {
    return(
        <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
            <DrawerContent className="max-h-[50vh]">
                <ScrollArea className="h-auto overflow-y-auto">
                    
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default JobApplications