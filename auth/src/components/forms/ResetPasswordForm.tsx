import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { toast } from "sonner";
import { Loading } from "@/components/Loading";
import { RequestPasswordResetLink } from "@/actions";

export function UserResetPasswordForm({
  dialogOpenTitle,
  dialogTitle,
  dialogDescription,
}: {
  dialogOpenTitle: string;
  dialogTitle: string;
  dialogDescription: string;
}) {
  const schema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "someone@gmail.com",
    },
  });

  const passwordResetMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      return await RequestPasswordResetLink(data.email);
    },
    onError: (error: any) => {
      toast.error(error.message, {
        style: { backgroundColor: "#FFBABA", color: "#D8000C" },
      });
    },
    onSuccess: (data: any) => {
      toast.success(data.message, {
        style: {
          backgroundColor: "#DFF2BF",
          color: "#4F8A10",
          border: "1px solid #4F8A10",
        },
      });
    },
  });

  function passwordResetSubmit(data: z.infer<typeof schema>) {
    passwordResetMutation.mutate({ email: data.email });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-blue-300 hover:text-blue-600 ml-1 hover:bg-[#ccc] transition-all duration-300"
          variant={"ghost"}
        >
          {dialogOpenTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex-start rounded-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(passwordResetSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <Input {...field} className="w-full col-span-3" />
                  <FormDescription>
                    You'll receive an email to reset your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-2">
              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={passwordResetMutation.isPending}
              >
                {passwordResetMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <Loading />
                    Saving changes...
                  </div>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
