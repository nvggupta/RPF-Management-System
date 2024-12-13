import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({children}) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAuthenticated = user && user?.token;


  if (!isAuthenticated && 
    !(location.pathname.includes("/user/login") || 
      location.pathname.includes("/user/register"))) {
    return <Navigate to="/user/login" />;
  }

  if (isAuthenticated && 
    (location.pathname.includes("/user/login") || 
     location.pathname.includes("/user/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/home/dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  if (location.pathname === "/Home/category") {
    if (!isAuthenticated) {
      return <Navigate to="/user/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/home/dashboard" />;
      }
    }
  }

  if (isAuthenticated && 
    user?.role !== "admin" && 
    location.pathname.includes("/home/dashboard")) {
    return <Navigate to="/unauthorized" />;
  }

  if (isAuthenticated && 
    user?.role === "admin" && 
    location.pathname === "/home") {
    return <Navigate to="/home/dashboard" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;

 // if (
  //   !isAuthenticated &&
  //   !(
  //     location.pathname.includes("/login") ||
  //     location.pathname.includes("/register")
  //   )
  // ) {
  //   return <Navigate to="/auth/login" />;
  // }

  // if (
  //   isAuthenticated &&
  //   (location.pathname.includes("/login") ||
  //     location.pathname.includes("/register"))
  // ) {
  //   if (user?.role === "admin") {
  //     return <Navigate to="/admin/dashboard" />;
  //   } else {
  //     return <Navigate to="/shop/home" />;
  //   }
  // }

  // if (
  //   isAuthenticated &&
  //   user?.role !== "admin" &&
  //   location.pathname.includes("admin")
  // ) {
  //   return <Navigate to="/unauth-page" />;
  // }

  // if (
  //   isAuthenticated &&
  //   user?.role === "admin" &&
  //   location.pathname.includes("shop")
  // ) {
  //   return <Navigate to="/admin/dashboard" />;
  // }