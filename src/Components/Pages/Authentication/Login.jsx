import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/login",
        formData
      );

      if (response.data.response === "success") {
        toast.success(response?.data?.response + "fully" + " Login");
        setUserData(response.data);
        navigate("/admin/dashboard");
        } else {
        toast.error(typeof response?.data?.error === 'string' ? response?.data?.error : response?.data?.error[0]);
      }
      setIsLoading(false);
   
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
  }, [userData]);
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg ">
          <div className="bg-blue-200 p-4 text-white text-left mb-4 w-full h-[150px]">
            <h2 className="mt-6  text-2xl font-bold text-blue-600">
              Welcome To RPF System
            </h2>
            <p className="mt-2  text-sm  text-blue-600">Login To Continue</p>
          </div>
          <form onSubmit={handleSubmit(Submit)} className="space-y-6 p-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                        value: /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/,
                        message:
                          "Password must be at least 8 characters with at least one special character and alphanumeric characters.",
                      },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            >
              {isLoading ? "Please Wait..." : "Login"}
            </button>
          </form>
          <div className="text-center mt-4">
          <div className="flex justify-around mb-5">
            <Link to={"/user/registration/vendor-registration"}>
              <p className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Register As Vendor
              </p>
            </Link>
            <Link to={"/user/registration/admin-registration"}>
              <p className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Register As Admin
              </p>
            </Link>

          </div>
            <div className="flex justify-around mb-5">
              <Link to={"/user/forget-password"}>
                <p className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Forget Your Password
                </p>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;