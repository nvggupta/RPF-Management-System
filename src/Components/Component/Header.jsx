import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  };

  console.log(userData);
  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h3 className="text-blue-400 text-lg">
          Welcome To RPF Management System
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {userData?.name ? `Welcome ${userData?.name}` : "Welcome Admin"}
          </span>
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
               <button
                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                 
               >
                 Login
               </button>
             </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;



// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { removeUser, setUser } from "../Features/RPFslice";

// function Header() {
//   const dispatch = useDispatch();


//   const userData = useSelector((state) => state.rpf.user);
//   const isLoggedIn = !!userData; 

//   useEffect(() => {

//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) {
//       const parsedUser = JSON.parse(userInfo);
//       dispatch(setUser(parsedUser));
//     }
//   }, [dispatch]);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     dispatch(removeUser());
//   };

//   const handleLogin = () => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) {
//       const parsedUser = JSON.parse(userInfo);
//       dispatch(setUser(parsedUser));
//     }
//   };

//   return (
//     <div className="w-full bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <h3 className="text-blue-400 text-lg">
//           Welcome To RPF Management System
//         </h3>
//         <div className="flex items-center gap-4">
//           <span className="text-gray-600">
//             {userData?.name ? `Welcome ${userData.name}` : "Welcome Admin"}
//           </span>
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link to="/user/login">
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 onClick={handleLogin}
//               >
//                 Login
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
