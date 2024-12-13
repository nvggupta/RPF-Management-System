
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
//   const navigate = useNavigate();
  const params = useLocation();
  console.log(params);
};

export default PrivateRoute;
