import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResetPasswordAuthentication from "../Pages/ResetPassword/ResetPasswordAuthentication";
function Header() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUserData(null);
    setShowResetPassword(false);
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h3 className="text-blue-400 text-lg">
          Welcome To RPF Management System
        </h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span
              className="text-gray-600 cursor-pointer p-4 "
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {userData?.name ? `Welcome ${userData?.name}` : "Welcome Admin"}
              {showDropdown && isLoggedIn && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => setShowResetPassword(true)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Reset Password
                  </button>
                </div>
              )}
            </span>
          </div>
          {isLoggedIn ? (
            <Link to={"/user/login"}>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/user/login">
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      {showResetPassword && (
        <ResetPasswordAuthentication
          setShowResetPassword={setShowResetPassword}
        />
      )}
    </div>
  );
}

export default Header;
