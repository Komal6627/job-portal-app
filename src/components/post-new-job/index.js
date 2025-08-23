'use client'

import { Button } from "../ui/button"

function PostNewJob(params) {
    return(
        <div>
            <Button  className="disabled:opacity-60 flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700">
                Post a Job
            </Button>
        </div>
    )
}

export default PostNewJob