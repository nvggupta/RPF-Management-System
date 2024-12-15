import React, { useEffect, useState } from 'react'
import axiosInstance from '../utills/Apihook'

function RFPQuotes() {

  const [rfpQuotes, setRFPQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const getRFPQuotes = async(id)=>{
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/rfp/quotes/${1}`);
      console.log(response.data);
      setRFPQuotes(response.data.rfpquotes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }
  useEffect(()=>{
    getRFPQuotes();
  },[])

  return (
    <div>RFPQuotes</div>
  )
}

export default RFPQuotes