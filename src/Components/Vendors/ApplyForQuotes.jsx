import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ApplyForQuotes({ selectedQuote, setSelectedQuote }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const calculateTotalCost = () => {
    const item_price = parseFloat(watch("item_price")) || 0;
    const quantity = parseInt(watch("quantity")) || 0;
    const total = item_price * quantity;
    setValue("total_cost", total);
    return total;
  };

  const onSubmit = async (data) => {
    console.log(data);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const response = await axios.post(
        `https://rfpdemo.velsof.com/api/rfp/apply/${selectedQuote}`,
        {
          ...data,
          method: "PUT",
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Quote applied successfully!");
      reset();
      setSelectedQuote(null);
    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
    }
  };
  const onCancel = () => {
    console.log("Form reset");
    reset();
    setSelectedQuote(null);
    toast.info("Form reset successfully!");
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Create RFP Quote</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Vendor Price</label>
            <input
              type="number"
              {...register("item_price", {
                required: true,
                onChange: calculateTotalCost,
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter vendor price"
            />
          </div>

          <div>
            <label className="block text-gray-700">Item Description</label>
            <textarea
              {...register("itemDescription", { required: true })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item description"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: true,
                onChange: calculateTotalCost,
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-gray-700">Total Cost</label>
            <input
              type="number"
              {...register("total_cost", { required: true })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total cost"
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplyForQuotes;