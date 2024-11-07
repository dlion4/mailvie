import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function ResetPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex-start rounded-md">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Enter the email address you used to receive reset link.
          </DialogDescription>
        </DialogHeader>
        <div className="d-flex flex-col space-y-2">
          <div className="">
            <Input
              id="emailAddress"
              defaultValue="mailvie@test.com"
              className="col-span-3 w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
