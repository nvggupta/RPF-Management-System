import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

function RFPForQuotes() {
    const [userInfo , setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
    const [quotesData , setQuotesData] = useState();
    const AdminQuotes = async()=>{
        try {
            const response = await axios.get(`https://rfpdemo.velsof.com/api/rfp/getrfp/${userInfo?.user_id}`,{
                headers:{
                    Authorization : `Bearer ${userInfo?.token}`,
                }
            });
            setQuotesData(response.data.response);
             
        } catch (error) {
            console.log(error);
            toast.error("Error Occured");
            
        }
    }
  return (
    <div>RFPForQuotes</div>
  )
}

export default RFPForQuotes