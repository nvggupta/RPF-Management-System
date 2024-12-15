import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RFPForQuotes() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [quotesData, setQuotesData] = useState([]);

  const getAdminQuotes = async () => {
    try {
      const response = await axios.get(
        `https://rfpdemo.velsof.com/api/rfp/getrfp/${userInfo?.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      setQuotesData(response.data.rfps);
    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    getAdminQuotes();
  }, []);

  const isDateValid = (lastDate) => {
    const today = new Date();
    const rfpDate = new Date(lastDate);
    return rfpDate > today;
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Request for Proposals (RFPs)</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                RFP No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                RFP Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Last Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Min Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Max Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {quotesData && quotesData.length > 0 ? (
              quotesData?.map((quote, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {quote.rfp_no}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {quote.item_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {quote.last_date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {quote.minimum_price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {quote.maximum_price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {quote.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {isDateValid(quote.last_date) && quote.status === "open" ? (
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Apply
                      </button>
                    ) : (
                      <span className="text-red-500">Closed</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RFPForQuotes;