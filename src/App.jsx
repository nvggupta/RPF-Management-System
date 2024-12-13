import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VendorRegistration from "./Components/Pages/Authentication/VendorRegistration";
import Login from "./Components/Pages/Authentication/Login";
import Home from "./Components/Pages/Home";
import AdminRegistration from "./Components/Pages/Authentication/AdminRegistration";
import ResetPasswordAuthentication from "./Components/Pages/ResetPassword/ResetPasswordAuthentication";
import ForgetPassword from "./Components/Pages/ForgetPassword/ForgetPassword";
import MainLayout from "./Components/Layout/MainLayout";
import Dashboard from "./Components/Dashboard";
import Category from "./Components/Admin/Category";
import Vendor from "./Components/Admin/Vendor";
// import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
        children: [
          { path: "", element: <Dashboard></Dashboard> },
          { path: "category", element: <Category></Category> },
          { path: "vendor", element: <Vendor></Vendor> },
        ],
      },
      {
        path: "user",
        children: [
          { path: "login", element: <Login /> },
          {
            path: "registration",
            children: [
              { path: "vendor-registration", element: <VendorRegistration /> },
              { path: "admin-registration", element: <AdminRegistration /> },
            ],
          },
          { path: "reset-password", element: <ResetPasswordAuthentication /> },
          { path: "forget-password", element: <ForgetPassword /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <> 
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
