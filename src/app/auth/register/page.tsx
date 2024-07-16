import Link from 'next/link';
import FormRegister from '@/components/forms/FormRegister';

export default function Register() {
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              'url(https://plus.unsplash.com/premium_photo-1661311947753-065ef4af9087?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                  Price Calculator
                </span>
              </h1>
              <p className="text-lg font-normal text-white lg:text-xl dark:text-gray-400">
                Want to calculate your product's selling price more simply?
              </p>
              <p className="text-lg font-normal text-white lg:text-xl dark:text-gray-400">
                Sign up for Price Calculator now and start pricing quickly and
                easily.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto mb-4">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                  alt=""
                />
              </div>
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Get your free account now.
              </h1>
            </div>

            <div className="mt-8">
              <FormRegister />

              <p className="mt-6 text-sm text-center text-gray-400">
                You have account?{' '}
                <Link
                  href="/auth/login"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign In
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
