import { Navigate, Outlet } from "react-router-dom";
import PagesIndex from "../component/PagesIndex";

const PrivateRoutes = () => {
  const isValidToken = (adminToken) => {
    if (!adminToken) return false;
    return true;

    // Not checked the expire time because there is not expire time set in the token
  };
  const adminToken = PagesIndex.useSelector((store) => store.admin.adminToken);
  return isValidToken(adminToken) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
