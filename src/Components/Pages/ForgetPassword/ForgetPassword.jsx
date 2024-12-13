import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all", 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const Submit = async (formData) => {
    console.log("Form Data Submitted", formData);
    try {
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/forgetPassword",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.response === "success") {
        toast.success(response.data.message);
        setIsOtpSent(true);
      } else {
        toast.error(response.data.error[0]);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/confirmotpresetPassword",
        {
          email: watch("email"),    
          otp: watch("otp"),
          new_password: watch("new_password"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.response === "success") {
        toast.success(response.data.response);
      } else {
        toast.error(response.data.error[0]);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const password = watch("new_password");

  return (
    <>
      <ToastContainer />
      {
        !isOtpSent ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center shadow-md rounded-lg bg-white">
              <div className="bg-blue-200 p-4 text-white text-left mb-4 w-[400px] h-[150px]">
                <h2 className="mt-6 text-2xl md:text-3xl lg:text-2xl font-bold text-blue-600">
                  Welcome To RPF System
                </h2>
                <p className="mt-2 text-sm md:text-base lg:text-lg text-blue-600">
                  Enter Your Email To Continue
                </p>
              </div>

              <form onSubmit={handleSubmit(Submit)} className="w-full max-w-md mx-auto p-8 ">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Please Wait" : "Send OTP"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>
              <form onSubmit={handleOTPSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    OTP
                  </label>
                  <input
                    type="text"
                    {...register("otp", { required: "OTP is required" })}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={6}
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    {...register("new_password", { required: "New Password is required" })}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) => value === password || "Passwords don't match",
                    })}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Submit OTP"}
                </button>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ForgetPassword;