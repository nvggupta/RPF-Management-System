import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sidebar({ userType = "admin" }) {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between p-4">
      <div>
        <img
          src="https://www.velsof.com/wp-content/uploads/2016/07/Velocity-Software-Solutions-logo-1.png"
          alt="Logo"
          className="w-20 h-20 mx-auto mb-4 "
        />

        <ul className="space-y-4">
          <Link to={"/admin/dashboard"}>
            <li
              className={`px-4 py-2 rounded cursor-pointer ${
                activeItem === 0
                  ? "bg-gray-700 text-red-500"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleItemClick(0)}
            >
              Dashboard
            </li>
          </Link>
          {userType === "admin" && (
            <>
              <Link to={"/admin/vendor"}>
                <li
                  className={`px-4 py-2 rounded cursor-pointer ${
                    activeItem === 1
                      ? "bg-gray-700 text-red-500"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleItemClick(1)}
                >
                  Vendor
                </li>
              </Link>

              <li
                className={`px-4 py-2 rounded cursor-pointer ${
                  activeItem === 2
                    ? "bg-gray-700 text-red-500"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleItemClick(2)}
              >
                RFP List
              </li>
              <Link to={"/admin/category"}>
                <li
                  className={`px-4 py-2 rounded cursor-pointer ${
                    activeItem === 3
                      ? "bg-gray-700 text-red-500"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleItemClick(3)}
                >
                  Category
                </li>
              </Link>
            </>
          )}
          <li
            className={`px-4 py-2 rounded cursor-pointer ${
              activeItem === 4
                ? "bg-gray-700 text-red-500"
                : "hover:bg-gray-700"
            }`}
            onClick={() => handleItemClick(4)}
          >
            RFP Quotes
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
