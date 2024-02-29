import { useContext, useEffect, useState } from "react";
import QuestSection from "../../components/Quests/QuestSection";
import {
  FetchQuestsByLocation,
  FetchQuestsByUserId,
  FetchQuestsByCreatorId,
} from "../../components/Quests/QuestQueries";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserCreatedTaskSection from "../../components/Tasks/UserCreatedTask";

const UserDashboard = (props) => {
  const navigate = useNavigate();
  const [userQuests, setUserQuests] = useState(null);
  const [createdQuests, setCreatedQuests] = useState(null);
  const [featuredQuests, setFeaturedQuests] = useState(null);
  const { authSession } = useContext(AuthContext);

  const is_manager = props.role === "manager";

  useEffect(() => {
    // fetch user's quests and location based
    console.log("authSession dashboard:", authSession);
    if (authSession === null || authSession === undefined) {
      navigate("/error");
    }

    !is_manager &&
      FetchQuestsByUserId({ user_id: authSession.uuid })
        .then((data) => {
          console.log("FetchQuestsByUserId data : ", data);
          setUserQuests(data);
        })
        .catch((err) => {
          console.error("Dashboard FetchQuestsByUserId : ", err);
          toast.error("Error in connecting to server", {
            toastId: "fetch-quests",
          });
          setUserQuests([]);
        });

    !is_manager &&
      FetchQuestsByLocation({ location_id: authSession.location })
        .then((data) => {
          console.log("FetchQuestsByLocation data : ", data);
          setFeaturedQuests(data);
        })
        .catch((err) => {
          console.error("Dashboard FetchQuestsByLocation : ", err);
          toast.error("Error in connecting to server", {
            toastId: "fetch-quests",
          });
          setFeaturedQuests([]);
        });

    FetchQuestsByCreatorId({ creator_id: authSession.uuid })
      .then((data) => {
        console.log("FetchQuestsByCreatorId data : ", data);
        setCreatedQuests(data);
      })
      .catch((err) => {
        console.error("Dashboard FetchQuestsByCreatorId : ", err);
        toast.error("Error in connecting to server", {
          toastId: "fetch-quests",
        });
        setCreatedQuests([]);
      });
  }, [authSession, navigate, is_manager]);

  return (
    <div className="relative">
      <div className="w-full h-full flex flex-row justify-center max-sm:flex-col">
        {/* <div className="absolute top-0 left-0 -z-50 ">
          <img
            src={process.env.PUBLIC_URL + "/jp-as-3.jpg"}
            alt="mockup"
            className="opacity-50 w-screen h-screen object-cover"
          />
        </div> */}
        <div className="w-full h-full min-w-[320px] max-w-[80%] px-4 self-center">
          <QuestSection
            title="Your Created Quests"
            testVariable={createdQuests}
          />
          {!is_manager && (
            <QuestSection
              title="Your Purchased Quests"
              testVariable={userQuests}
            />
          )}

          {!is_manager && (
            <QuestSection
              title="Featured Quests"
              testVariable={featuredQuests}
            />
          )}
        </div>
        <div className="p-4 w-full max-w-md max-sm:max-h-[400px] max-h-[640px] max-sm:order-last max-sm:relative max-sm:left-1/2 max-sm:-translate-x-1/2 rounded-xl">
          <UserCreatedTaskSection />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
