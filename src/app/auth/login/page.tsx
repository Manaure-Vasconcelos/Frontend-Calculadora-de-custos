import FormLogin from '@/components/forms/FormLogin';
import { Calculator } from 'lucide-react';

export default function Login() {
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1625225233840-695456021cde?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div className="bg-black bg-opacity-50 p-6 rounded-xl">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Price Calculator
                </span>
              </h1>
              <p className="text-lg font-normal text-white lg:text-xl ">
                Your cost calculator that helps you in the daily life of an
                entrepreneur
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Sign in to access your account
              </h1>
            </div>

            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
