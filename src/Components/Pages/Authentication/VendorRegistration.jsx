import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function VendorRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const Submit = async (formData) => {
    console.log(formData);
    setIsLoading(true);
    try {
      console.log("Form Data Submitted: ", formData);
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/registervendor",
        formData
      );
      console.log("Response from API:", response.data);
      if (response.data.response === "success") {
        toast.success(response.data.response);
      } else {
        toast.error(response.data.error[0]);
      }
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Registration Failed", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://rfpdemo.velsof.com/api/categories"
      );
      console.log("Categories API Response:", response.data);
      if (response.data && response.data.categories) {
        const categoriesArray = Object.values(response.data.categories);
        setCategoryData(categoriesArray);
        console.log(categoriesArray)
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryData([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const password = watch("password");
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-5">
        <div className="w-full max-w-4xl  bg-white shadow-md rounded-lg">
          <div className="bg-blue-200 p-4 text-white text-left mb-4 w-full">
            <h1 className="text-xl font-bold text-blue-600  mb-6">
              Welcome To RPF
            </h1>
            <h2 className="text-xl font-bold text-blue-600  mb-6">
              Please Register to Continue
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(Submit)}
            className="grid grid-cols-2 gap-4 p-8"
          >
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("firstname", {
                  required: "First Name is required",
                })}
                type="text"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastname", { required: "Last Name is required" })}
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
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
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
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
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message: "Confirm Password must be at least 6 characters",
                  },
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Revenue
              </label>
              <input
                {...register("revenue", { required: "Revenue is required" })}
                type="text"
                placeholder="Revenue"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.revenue && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.revenue.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Number of Employees
              </label>
              <input
                {...register("no_of_employees", {
                  required: "Number of Employees is required",
                })}
                type="text"
                placeholder="Number of Employees"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.noOfEmployees && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.noOfEmployees.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                GST Number
              </label>
              <input
                {...register("gst_no", { required: "GST Number is required" })}
                type="text"
                placeholder="GST Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.gstNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gstNo.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                PAN Number
              </label>
              <input
                {...register("pancard_no", {
                  required: "PAN Number is required",
                })}
                type="text"
                placeholder="PAN Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.panNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.panNo.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                {...register("mobile", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid Phone Number",
                  },
                })}
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNo.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Categories
              </label>

              <select
                {...register("category", { required: "Category is required" })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categoryData?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="col-span-2 self-start justify-self-start py-3 px-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {isLoading ? "Please Wait..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default VendorRegistration;
