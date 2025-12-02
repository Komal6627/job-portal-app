"use Client";
import { Button } from "@/components/ui/button";

function HomePageButtonControls( {user,profileInfo}) {
  return (
    <div className="flex space-x-4">
      <Button
        href={"/jobs"}
        className="flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700"
      >
        Browse Job
      </Button>
      <Button
        href={"/jobs"}
        className="flex h-11 items-center justify-center px-5 bg-violet-600 text:white hover:bg-violet-700"
      >
        Post New Job
      </Button>
    </div>
  );
}

export default HomePageButtonControls;
