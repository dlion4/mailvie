import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Button } from "./ui/button";

export function AuthSocial(){
    return (
      
        <div className="gap-2 sm:flex sm:flex-row sm:items-center">
          <Button className="py-5 d-flex align-center space-x-4 w-full inline-flex items-center gap-2">
            <FaGithub className="h-4 w-4" />
            Login with GitHub
          </Button>
          <div className="d-none d-sm:my-3" />
          <Button className="py-5 d-flex align-center space-x-4 w-full inline-flex items-center gap-2 my-2 d-sm:my-0">
            <FaGoogle className="h-4 w-4" />
            Login with Google
          </Button>
        </div>

    );
}