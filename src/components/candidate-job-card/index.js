'use client'

import { Fragment } from "react"
import { default as CommonCard } from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"

function CandidateJobCard({jobItem}) {
    return(
        <Fragment>
            <CommonCard icon={<JobIcon/>} 
             title={jobItem.title}
             description={jobItem.companyName}
             footerContent={
                <Button className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700"> View Details</Button>
             }
            />

        </Fragment>
    )
}

export default CandidateJobCard