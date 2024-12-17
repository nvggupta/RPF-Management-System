import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate,useNavigate } from "react-router-dom";
function VendorRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedOption , setSelectionOption] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
 const navigate = useNavigate();
  const Submit = async (formData) => {
    console.log(typeof formData.revenue);
    // if(typeof formData.revenue === "string"){
    //   return alert("Please Enter The Correct Revenue");
    // }
    setIsLoading(true);
    try {
      console.log("Form Data Submitted: ", formData);
      formData.category = selectedOption;
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/registervendor",
        formData,
        
      );
      console.log("Response from API:", response.data);
      if (response.data.response === "success") {
        toast.success(response.data.response);
        navigate("/user/login");
      } else {
        toast.error(response.data.error[0]);
      }
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Registration Failed", error);
    }
  };
   const handleSelectedOption = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectionOption(selectedOptions.toString());
    console.log("Selected Options:", selectedOptions.toString());
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
  //  const revenue = watch("revenue"); 
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
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "First Name should only contain letters",
                  },
                })}
                type="text"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastname", 
                 { 
                required: "Last Name is required",
               pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Last Name should only contain letters",
                  },
                }
              )}
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastname.message}
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
              <div className="relative">
                <input
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
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
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
              <div className="relative">
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
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Revenue
              </label>
              <input
                {...register("revenue", 
                { 
                  required: "Revenue is required",
                  pattern : {
                    value : /^\d+(,\d+){2,}$/i,
                    message : "Please Enter The Last Three Revenue Seperated By Commas"

                  }
                   }
                )}
                type="text"
                placeholder="Revenue"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.revenue && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.revenue?.message}
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
                  pattern : {
                    value : /^[0-9]+$/i,
                    message : "Please Enter valid Number Of Employees"
                }
                }
                )}
                type="text"
                placeholder="Number of Employees"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.no_of_employees && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.no_of_employees.message}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                GST Number
              </label>
              <input
                {...register("gst_no", 
                { 
                  required: "GST Number is required",
                  pattern : {
                    value : /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}Z[A-Z0-9]{1}$/,
                    message : "Please Enter The Correct GST No"
                  }
                   })}
                type="text"
                placeholder="GST Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.gst_no && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gst_no.message}
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
                  pattern : {
                    value : /^[A-Z]{5}\d{4}[A-Z]$/,
                    message : "Please Enter Correct PAN No"
                  }
                })}
                type="text"
                placeholder="PAN Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
              />
              {errors.pancard_no && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pancard_no.message}
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
                    value: /^[1-9][0-9]{9}$/,
                    message: "Invalid Phone Number,Enter 10 Digit Mobile Number without leading zero",
                  },
                })}
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
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
                multiple
                onChange={handleSelectedOption}
              >
                <option value="" disabled>Select Category</option>
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
