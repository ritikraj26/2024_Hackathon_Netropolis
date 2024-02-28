import UserProfile from "./UserProfile";
import CMProfile from "./CMProfile";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { AuthContext } from "../../App";
import { useContext } from "react";

const ProfilePage = () => {
  const { authSession } = useContext(AuthContext);

  if (authSession !== null && authSession !== undefined) {
    if (authSession.role === "user") {
      return <UserProfile />;
    }

    if (authSession.role === "manager") {
      return <CMProfile />;
    }
  }

  return <ErrorPage />;
};

export default ProfilePage;
