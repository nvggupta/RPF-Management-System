import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CreateRFP from "./CreateRFP";
import SelectCategory from "./SelectCategory";
import RFPQuotes from "./RFPQuotes";
import UpdateRFP from "./UpdateRFP";
import UpdateCategory from "./UpdateCategory";

function RFP() {
  const [userData] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [currentPage, setCurrentPage] = useState(1);
  const [RFPData, setRFPData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [createRFP, setCreateRFP] = useState(false);
  const [newRFPData , setNewRFPData] = useState('');
  const [rfpquote , setRFPQuote] = useState(false);
  const [updateRFPData, setUpdateRFPData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
 console.log(RFPData);
  async function getRFP() {
    setIsLoading(true);
    try {
      if (userData && userData.token) {
        console.log("triggeres");
        const response = await axios.get(
          "https://rfpdemo.velsof.com/api/rfp/all",
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        setRFPData(response.data.rfps);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Error Occurred In Getting RFP: " + error.message);
      console.log("Error Occured In RFP ", error);
    }
  }
  const handleDecrementPages = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => Number(prev) - 1);
    } else {
      toast.error("Enter The Page Greater Then 0");
    }
  };
  const handleIncrementPages = () => {
    if (currentPage < RFPData.length - 2) {
      setCurrentPage((prev) => Number(prev) + 1);
    } else {
      toast.error("Enter The Page Lesser Then " + totalPages);
    }
  };
  const handleCloseRFP = async(id)=>{
        try {
            const response = await axios.get(`https://rfpdemo.velsof.com/api/rfp/closerfp/${id}`,{
                headers:{
                    Authorization: `Bearer ${userData.token}`
                }
            })
            if(response.data.response === "success"){
                toast.success(response.data.response);
            }
            else{
              typeof response.data.errors === "object" ? toast.error(response.data.errors[0]) : toast.error(response.data.error || response.data.errors || response.data.message);
            }
        } catch (error) {
            console.log("Error Occured To Close The RFP")
            toast.error(error);
        }
  }
  useEffect(() => {
    getRFP();
  }, [createRFP]);

   if(rfpquote){
     return <RFPQuotes setRFPQuote={setRFPQuote} rfpquote={rfpquote}/>
   }

   if(updateRFPData) {
     return <UpdateCategory rfpData={updateRFPData} setUpdateRFPData={setUpdateRFPData} />
   }

  const handleUpdateRFP = (rfpItem)=>{
    setUpdateRFPData(rfpItem);
  }
  
  const filteredRFP = RFPData?.filter((item) =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const last = currentPage * itemsPerPage;
  const first = last - itemsPerPage;
  const currentRFP = filteredRFP?.slice(first, last);
  const totalPages = Math.ceil(filteredRFP?.length / itemsPerPage);

  return (
    <div>
      {!createRFP ? (
        <div className="p-4">
          <ToastContainer />
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">RFP List</h1>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search RFP..."
                className="px-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              onClick={()=>setCreateRFP(true)}
              >
                ADD RFP
              </button>
            </div>
          </div>
          {isLoading ? (
            <p className="text-blue-500">Loading...</p>
          ) : filteredRFP?.length > 0 ? (
            <>
              <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">RFP No.</th>
                    <th className="border border-gray-300 p-2">RFP Title</th>
                    <th className="border border-gray-300 p-2">
                      RFP Last Date
                    </th>
                    <th className="border border-gray-300 p-2">Min Amount</th>
                    <th className="border border-gray-300 p-2">Max Amount</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRFP?.map((RFPitem) => (
                    <tr
                      key={RFPitem?.id}
                      className="text-center hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 p-2">
                        {RFPitem?.id}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {RFPitem?.item_name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {RFPitem?.last_date}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {RFPitem?.minimum_price}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {RFPitem?.maximum_price}
                      </td>
                      <td
                        className={`border border-gray-300 p-2 ${
                          RFPitem.status === "closed"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {RFPitem.status}
                      </td>
                      <td className="border border-gray-300 p-2 flex flex-col sm:flex-row gap-2 justify-center items-center">
                        <button className="w-full sm:w-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>handleCloseRFP(RFPitem?.id)}>
                          close
                        </button>
                        <button className="w-full sm:w-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={()=>setRFPQuote(RFPitem.rfp_id)}
                        >
                          Quote
                        </button>
                        <button className={`w-full sm:w-auto px-3 py-1 text-white rounded hover:bg-green-600 ${RFPitem.status === "closed" ? "bg-green-300 cursor-not-allowed" : "bg-green-500"}`}                         onClick={()=>handleUpdateRFP(RFPitem)}
                         disabled={RFPitem.status === "closed"}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleDecrementPages}
                  >
                    -
                  </button>
                  <input
                    className="w-16 px-2 py-1 border rounded text-center"
                    type="number"
                    value={currentPage}
                    onChange={(e) => e.target.value < totalPages+1 && e.target.value > 0 && setCurrentPage(e.target.value)}
                    min={1}
                    max={totalPages}
                  />
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleIncrementPages}
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  You Can Enter The Value Between 1 to {totalPages}
                </p>
              </div>{" "}
            </>
          ) : (
            <p className="text-red-500">No List found.</p>
          )}
        </div>
      ) : (
        <SelectCategory  totalRFP={RFPData.length} setCreateRFP={setCreateRFP}/>
      )}
    </div>
  );}

export default RFP;