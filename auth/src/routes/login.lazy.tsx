import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { UserLoginForm } from "@/components/forms/LoginForm";
import { UserResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { AuthSocial } from "@/components/AuthSocials";

export const Route = createLazyFileRoute("/login")({
  component: LoginIndex,
});

function LoginIndex() {
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
              Log in to Insights
            </h1>
            <p className="mt-1 text-sm text-gray-300">
              Don’t have an account?
              <Link
                className="text-blue-500 hover:text-blue-600 hover:text-blue-400 ml-1"
                to={"/signup"}
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-10 w-full">
            <AuthSocial />

            <div className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 text-gray-500">
              <div className="h-[2px] w-full bg-gray-200 bg-gray-800"></div>
            </div>
            <UserLoginForm />
          </div>
          <div className="mx-auto my-6 flex w-full items-center justify-between gap-3 text-sm text-gray-500 text-gray-500">
            <div className="h-[1px] w-full bg-gray-200 bg-gray-800"></div>
          </div>
          <UserResetPasswordForm
            dialogOpenTitle="Forgot your password? Reset password"
            dialogTitle="Reset your password"
            dialogDescription="Enter the email address you used to receive reset link."
          />
        </div>
      </div>
    </div>
  );
}
