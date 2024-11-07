import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { RegisterUserType, RegisterUser } from "@/actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loading } from "@/components/Loading";
import { AuthSocial } from "@/components/AuthSocials";

export const Route = createLazyFileRoute("/signup")({
  component: RegisterIndex,
});

function RegisterIndex() {
  const navigate = useNavigate();
  const FormSchema = z
    .object({
      email: z
        .string()
        .min(2, {
          message: "Enter a valid email address",
        })
        .email(),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
      confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "emily.ross@acme.ch",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterUserType) => {
      return await RegisterUser(data);
    },
    onSuccess: () => {
      toast.success("Registration successful", {
        style: {
          backgroundColor: "#DFF2BF", // Light green background
          color: "#4F8A10", // Dark green text
          border: "1px solid #4F8A10", // Dark green border
        },
      });

      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.message, {
        style: { backgroundColor: "#FFBABA", color: "#D8000C" },
      }); // Red for error)
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const { email, password } = data;
    const dataToSubmit = { email, password };
    registerMutation.mutate(dataToSubmit);
  }

  return (
    <div className="">
      <div className="flex min-h-dvh items-center justify-center p-4 sm:p-6">
        <div className="flex w-full flex-col items-start sm:max-w-sm">
          <div className="relative flex items-center justify-center rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/5">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 44"
              className="size-8 text-blue-500 dark:text-blue-500"
              aria-label="Insights logo"
            >
              <path
                strokeWidth="5"
                d="M32.5 33L32.5 11C32.5 6.30558 28.6944 2.5 24 2.5C19.3056 2.5 15.5 6.30558 15.5 11L15.5 33C15.5 37.6944 19.3056 41.5 24 41.5C28.6944 41.5 32.5 37.6944 32.5 33Z"
              ></path>
            </svg>
          </div>

          <div className="mt-6 flex flex-col">
            <h1 className="text-lg font-semibold text-gray-50">
              Register account
            </h1>
            <p className="mt-1 text-sm text-gray-300">
              Already have an account?
              <Link
                className="text-blue-500 hover:text-blue-600 hover:text-blue-400 ml-1"
                to={"/login"}
              >
                Log In
              </Link>
            </p>
          </div>

          <div className="mt-10 w-full">
            <AuthSocial />

            <div className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 text-gray-500">
              <div className="h-[2px] w-full bg-gray-200 bg-gray-800"></div>
            </div>

            <Form {...form}>
              <form
                action=""
                className="flex w-full flex-col gap-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-4">
                  <FormField
                    name="email"
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

                <div className="flex flex-col gap-y-4">
                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col space-y-2">
                          <FormLabel className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-gray-50">
                            Confirm Password
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
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <Loading />
                      <span className="text-gray-500">Registering...</span>
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </Form>
          </div>

          <div className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 text-gray-500">
            <div className="h-[1px] w-full bg-gray-200 bg-gray-800"></div>
          </div>

          <p className="text-sm text-gray-300 dark:text-gray-300 mr-2">
            Forgot your password?
            <a className="text-blue-300 hover:text-blue-600 ml-1" href="#">
              Reset password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
