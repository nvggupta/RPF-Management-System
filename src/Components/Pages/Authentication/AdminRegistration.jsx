import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
function AdminRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const Submit = async (formData) => {
    setIsLoading(true);
    console.log("Submit Triggered");
    console.log(formData);
    try {
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/registeradmin",
        formData
      );
      console.log(response.data);
      if (response.data.response === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error[0]);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);

      console.log(error);
    }
  };
  const password = watch("password");
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 shadow-md bg-white rounded-lg">
          <div className="bg-blue-200 p-4 text-white text-left mb-4 w-full h-[150px]">
            <h2 className="mt-6  text-2xl font-bold text-blue-600">
              Welcome To RPF System
            </h2>
            <p className="mt-2  text-sm  text-blue-600">Sign-Up To Continue</p>
          </div>
          <form className="mt-8 space-y-6 p-6" onSubmit={handleSubmit(Submit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  className=" rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("firstname", {
                    required: "First name is required.",
                  })}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  className=" rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("lastname", {
                    required: "Last name is required.",
                  })}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile Number
                </label>
                <input
                  className=" rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("mobile", {
                    required: "Mobile number is required.",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10 digit mobile number.",
                    },
                  })}
                />
                {errors.mobile && (
                  <span className="text-red-500 text-sm">
                    {errors.mobile.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className=" rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className=" rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value: /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/,
                      message:
                        "Password must be at least 8 characters with at least one special character and alphanumeric characters.",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className=" rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("confirmPassword", {
                    required: "Confirm password is required.",
                    pattern: {
                      validate: (value) =>
                        value === password ||
                        "Confirm password must match the password.",
                      message:
                        "Confirm password must match the password criteria.",
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={` w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isLoading ? "bg-indigo-200" : "bg-indigo-600"
                } hover:bg-indigo-700 focus:outline-none`}
              >
                {isLoading ? "Pleasee wait..." : "Register"}
              </button>
            </div>
            <div className="text-center pb-4">
              <Link to={"/user/registration/vendor-registration"}>
                <p className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer mb-2">
                  Register As Vendor
                </p>
              </Link>
              <Link to={"/user/forget-password"}>
                <p className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Forget Your Password
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminRegistration;