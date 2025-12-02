import { fetchProfileAction } from "@/actions";
import HomePageButtonControls from "@/components/homepage-button-controls";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";



export default async function Home() {
  const user = await currentUser();

  console.log(user, 'currentuser');

  const profileInfo  = await fetchProfileAction(user?.id)

  if (user && !profileInfo?._id) {
    redirect("/onboard")
  } 


  return (
    <Fragment>
      <div className="bg-white ">
        <div className="relative w-full">
          <div className="conatiner mx-auto  pl-6">
            <div className = "flex items-center flex-wrap gap-12 lg:gap-0">
                <div className="lg:w-5/12 space-y-8">
                    <span className="flex space-x-2">
                        <span className="block w-14 mb-2 border-b-2 border-gray-700"></span>
                        <span className="font-medium text-gray-600">One Stop Solution to Find Jobs</span>
                    </span>
                    <h1 className="text-4xl font-bold md:text-6xl text-violet-700">
                        The Best <br/> Job Portal
                    </h1>
                    <p className="text-xl text-gray-700">
                       Find Best Jobs From Product and Service Base Companies and build Your Carrer
                    </p>
                    <HomePageButtonControls  user= {JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
                </div>
                <div className="relative w-full lg:w-[50%] flex items-center justify-end">
                    <img 
                       src="https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png"
                    alt="Job Portal"
                       className="h-full w-full object-contain z-10"
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
