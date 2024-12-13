import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
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
        toast.error(response?.data?.error);
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
              <input
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
            <Link>
              <Link to={"/user/forget-password"}>
                <p className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Forget Your Password
                </p>
              </Link>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
