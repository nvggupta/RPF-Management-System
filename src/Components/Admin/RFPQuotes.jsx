import React, { useEffect, useState } from 'react';
import axiosInstance from '../utills/Apihook';
import { toast } from 'react-toastify';

function RFPQuotes({ setRFPQuote, rfpquote }) {
  const [rfpQuotes, setRFPQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10; 

  // Function to fetch quotes with pagination
  const getRFPQuotes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/rfp/quotes/${rfpquote}`);
      console.log(response.data);
      if(response.data.response === "success"){

        setRFPQuotes(response.data.quotes); 
        setTotalItems(response.data.totalItems); 
        setLoading(false);
      }
      else{
        typeof response.data.errors === "object" ? toast.error(response.data.errors[0]) : toast.error(response.data.error || response.data.errors || response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error);
      
    }
  };

  useEffect(() => {
    if (rfpquote) {
      getRFPQuotes(currentPage); 
    }
  }, [rfpquote, currentPage]);

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
   const last = currentPage * itemsPerPage;
   const first = last - itemsPerPage;
   const currentItems = rfpQuotes?.slice(first, last);
  const totalPages = Math.ceil(rfpQuotes?.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-2 sm:mb-0">RFP Quotes</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
          onClick={() => setRFPQuote(null)}
        >
          Cancel
        </button>
      </div>

      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : rfpQuotes?.length === 0 ? (
        <div className="text-center text-xl">No RFP Quotes</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Name</th>
                  <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Email</th>
                  <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Mobile</th>
                  <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Item Price</th>
                  <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((quote) => (
                  <tr key={quote.vendor_id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-2 sm:px-4 py-3 text-sm sm:text-base border-r">{quote.name}</td>
                    <td className="px-2 sm:px-4 py-3 text-sm sm:text-base border-r">{quote.email}</td>
                    <td className="px-2 sm:px-4 py-3 text-sm sm:text-base border-r">{quote.mobile}</td>
                    <td className="px-2 sm:px-4 py-3 text-sm sm:text-base border-r text-right font-medium">{quote.item_price}</td>
                    <td className="px-2 sm:px-4 py-3 text-sm sm:text-base text-right font-bold text-gray-700">{quote.total_cost}</td>
                  </tr>
                ))}
              </tbody>            </table>
          </div>

          <div className="flex flex-wrap justify-center mt-4 gap-2">
            {Array.from({length: totalPages}, (_, ind) => ind + 1)?.map((page, index) => (
              <button 
                key={index} 
                className="mx-1 px-2 sm:px-3 py-1 border rounded text-sm sm:text-base hover:bg-gray-100"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>          
        </div>
      )}
    </div>
  );
}

export default RFPQuotes;