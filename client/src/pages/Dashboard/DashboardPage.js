import { useContext } from "react";
import CMDashboard from "./CMDashboard";
import { AuthContext } from "../../App";
import UserDashboard from "./UserDashboard";
import { ErrorPage } from "../ErrorPage/ErrorPage";

const DashboardPage = () => {
  const { authSession } = useContext(AuthContext);

  if (authSession !== null && authSession !== undefined) {
    if (authSession.role === "user") {
      return <UserDashboard />;
    }

    if (authSession.role === "manager") {
      return <CMDashboard />;
    }
  }

  return <ErrorPage />;
};

export default DashboardPage;
