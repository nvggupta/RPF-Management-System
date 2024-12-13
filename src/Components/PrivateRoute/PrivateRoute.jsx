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
     location.pathname.includes("/user/registration"))) {
    if (user?.type === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/vendor" />;
    }
  }

  if (location.pathname === "/admin") {
    if (!isAuthenticated) {
      return <Navigate to="/user/login" />;
    } else {
      if (user?.type === "admin") {
        return <Navigate to="/admin/dashboard" />;
      }
    }
  }
  if(isAuthenticated && user?.type !== "admin" && location.pathname.includes("admin")){
    return <Navigate to="/vendor/dashboard" />;
  }
  if(isAuthenticated && user?.type !=="vendor" && (location.pathname.includes("/Vendor/rfp-for-quotes") || location.pathname.includes("/Vendor/dashboard"))){
    return <Navigate to="/admin/dashboard" />
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
  //     return <Navigate to="/shop/admin" />;
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