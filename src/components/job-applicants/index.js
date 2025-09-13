'use client'

import CandidateList from "../candidate-list"
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer"
import { ScrollArea } from "../ui/scroll-area"


function JobApplications({showApplicantsDrawer, setShowApplicantsDrawer, showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal, currentCandidateDetails, setCurrentCandidateDetails, jobApplications}) {
    return(
        <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
            <DrawerContent className="max-h-[50vh]">
                <DrawerTitle className="sr-only">Candidate Details</DrawerTitle>
                <ScrollArea className="h-auto overflow-y-auto">
                    <CandidateList 
                        currentCandidateDetails = {currentCandidateDetails}
                        setCurrentCandidateDetails={setCurrentCandidateDetails}
                        jobApplications={jobApplications}
                        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                        setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default JobApplications