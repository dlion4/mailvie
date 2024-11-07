import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoginUser } from "@/actions";
import { Loading } from "@/components/Loading";

export function UserLoginForm() {
  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "clement@gmail.com",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await LoginUser({ email, password });
    },
    onError: (error: any) => {
      toast.error(error.message, {
        style: { backgroundColor: "#FFBABA", color: "#D8000C" },
      });
      console.log(error);
    },
    onSuccess: () => {
      toast.success("Login successful", {
        style: {
          backgroundColor: "#DFF2BF", // Light green background
          color: "#4F8A10", // Dark green text
          border: "1px solid #4F8A10", // Dark green border
        },
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    loginMutation.mutate({ email: data.username, password: data.password });
  }

  return (
    <>
      <Form {...form}>
        <form
          action=""
          className="flex w-full flex-col gap-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-gray-50">
                      Email
                    </FormLabel>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        className="relative border-[#090e1a] outline-[#090e1a] w-full appearance-none rounded-md border px-2.5 py-2 shadow-sm outline-[#090e1a] transition sm:text-sm border-gray-300 border-gray-800 text-gray-900 text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 bg-[#090e1a] border-gray-300"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-gray-50">
                      Password
                    </FormLabel>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        className="relative border-[#090e1a] outline-[#090e1a] w-full appearance-none rounded-md border px-2.5 py-2 shadow-sm outline-[#090e1a] transition sm:text-sm border-gray-300 border-gray-800 text-gray-900 text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 bg-[#090e1a] border-gray-300"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <button
            className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center font-medium shadow-sm transition-all duration-100 ease-in-out text-base sm:text-sm disabled:pointer-events-none disabled:shadow-none outline outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500 dark:outline-blue-500 border-transparent text-white dark:text-white bg-blue-500 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:dark:bg-gray-800 disabled:dark:text-gray-600"
            tremor-id="tremor-raw"
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loading />
                <span className="text-gray-500">logging in...</span>
              </div>
            ) : (
              <p>Continue</p>
            )}
          </button>
        </form>
      </Form>
    </>
  );
}
