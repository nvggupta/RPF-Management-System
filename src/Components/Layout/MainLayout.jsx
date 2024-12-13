import React from 'react'
import Sidebar from '../Component/Sidebar';
import Header from '../Component/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';

function MainLayout() {
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