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
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "admin",
        element: <Home />,
        children: [
          { path: "dashboard", element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> },
          { path: "category", element: <PrivateRoute><Category  /></PrivateRoute>},
          { path: "vendor", element: <PrivateRoute><Vendor></Vendor></PrivateRoute> },        ],
      },
      {
        path: "user",
        children: [
          { path: "login", element: <Login /> },
          {
            path: "registration",
            children: [
              { path: "vendor-registration", element: <PrivateRoute><VendorRegistration /></PrivateRoute> },
              { path: "admin-registration", element: <PrivateRoute><AdminRegistration /></PrivateRoute> },
            ],          },
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
