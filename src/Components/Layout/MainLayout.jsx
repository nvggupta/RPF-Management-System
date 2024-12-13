import React, { useEffect } from 'react'
import Sidebar from '../Component/Sidebar';
import Header from '../Component/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';

function MainLayout() {

  // useEffect(() => {
  //   let timer = null;
  //   const user = JSON.parse(localStorage.getItem("userItem"));
  //   if (user && !timer) {
  //     timer = setInterval(() => {
  //       localStorage.removeItem("userItem");
  //       clearInterval(timer);
  //     }, 60000);
  //   }
  //   return () => {
  //     if (timer) {
  //       clearInterval(timer);
  //     }
  //   };
  // }, []);   
  return (
    <div className="h-screen w-full flex">
    <div className="hidden md:block w-64">
      <Sidebar />
    </div>
    <div className="flex-1 flex flex-col h-full">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  </div>
);
}

export default MainLayout