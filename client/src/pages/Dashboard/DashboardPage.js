import { useContext } from "react";
import CMDashboard from "./CMDashboard";
import { AuthContext } from "../../App";
import UserDashboard from "./UserDashboard";
import { ErrorPage } from "../ErrorPage/ErrorPage";

const DashboardPage = () => {
  const { authSession } = useContext(AuthContext);

  if (authSession !== null && authSession !== undefined) {
    if (authSession.role === "user") {
      return <UserDashboard role={"user"}/>;
    }

    if (authSession.role === "manager") {
      return <UserDashboard role={"manager"} />;
    }
  }

  return <ErrorPage />;
};

export default DashboardPage;
