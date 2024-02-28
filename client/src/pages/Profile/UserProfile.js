import Avatar from "../../components/Profile/UserAvatar";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { AuthContext } from "../../App";
import { useContext } from "react";

const UserProfile = () => {
  const { authSession } = useContext(AuthContext);

  if (authSession !== null && authSession !== undefined) {
    if (authSession.role === "user" || authSession.role === "manager") {
      return <Avatar />;
    }
  }

  return <ErrorPage />;
};

export default UserProfile;
