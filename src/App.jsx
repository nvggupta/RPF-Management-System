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
import RFP from "./Components/Admin/RFP";
import RFPForQuotes from "./Components/Vendors/RFPForQuotes";
import RFPQuotes from "./Components/Admin/RFPQuotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "admin",
        element: <Home />,
        children: [
          {
            path: "dashboard",
            element: (
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            ),
          },
          {
            path: "category",
            element: (
              <PrivateRoute>
                <Category />
              </PrivateRoute>
            ),
          },
          {
            path: "vendor",
            element: (
              <PrivateRoute>
                <Vendor />
              </PrivateRoute>
            ),
          },
          {
            path: "rfp",
            element: (
              <PrivateRoute>
                <RFP />
              </PrivateRoute>
            ),
          },
          {
            path: "rfp-for-quotes",
            element: (
              <PrivateRoute>
                <RFPQuotes />
              </PrivateRoute>
            ),
          }
        ],
      },
      {
        path: "user",
        children: [
          { path: "login", element: <Login /> },
          {
            path: "registration",
            children: [
              {
                path: "vendor-registration",
                element: (
                  <PrivateRoute>
                    <VendorRegistration />
                  </PrivateRoute>
                ),
              },
              {
                path: "admin-registration",
                element: (
                  <PrivateRoute>
                    <AdminRegistration />
                  </PrivateRoute>
                ),
              },
            ],
          },
          { path: "reset-password", element: <ResetPasswordAuthentication /> },
          { path: "forget-password", element: <ForgetPassword /> },
        ],
      },
      {
        path: "vendor",
        element: <Home />,
        children: [
          {
            path: "dashboard",
            element: (
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            ),
          },
          {
            path: "rfp-for-quotes",
            element: (
              <PrivateRoute>
                <RFPForQuotes />
              </PrivateRoute>
            ),
          },
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
