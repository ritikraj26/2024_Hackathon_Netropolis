import { useContext, useEffect, useState } from "react";
import QuestSection from "../../components/Quests/QuestSection";
import {
  FetchQuestsByLocation,
  FetchQuestsByUserId,
} from "../../components/Quests/QuestQueries";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userQuests, setUserQuests] = useState(null);
  const [featuredQuests, setFeaturedQuests] = useState(null);
  const { authSession } = useContext(AuthContext);

  useEffect(() => {
    // fetch user's quests and location based
    console.log("authSession dashboard:", authSession);
    if (authSession === null || authSession === undefined) {
      navigate("/error");
    }

    FetchQuestsByUserId({ user_id: authSession.uuid })
      .then((data) => {
        console.log("FetchQuestsByUserId data : ", data);
        setUserQuests(data);
      })
      .catch((err) => {
        console.error("Dashboard FetchQuestsByUserId : ", err);
        toast.error("Error in connecting to serverr");
        setUserQuests([]);
      });

    FetchQuestsByLocation({ location_id: authSession.location })
      .then((data) => {
        console.log("FetchQuestsByLocation data : ", data);
        setFeaturedQuests(data);
      })
      .catch((err) => {
        console.error("Dashboard FetchQuestsByLocation : ", err);
        toast.error("Error in connecting to serverr");
        setFeaturedQuests([]);
      });
  }, [authSession, navigate]);

  return (
    <div className="relative">
      <div className="w-full h-full flex flex-row justify-center">
        {/* <div className="absolute top-0 left-0 -z-50 ">
          <img
            src={process.env.PUBLIC_URL + "/jp-as-3.jpg"}
            alt="mockup"
            className="opacity-50 w-screen h-screen object-cover"
          />
        </div> */}
        <div className="w-full h-full min-w-[320px] max-w-[80%] px-4 self-center">
          <QuestSection title="Your Quests" testVariable={userQuests} />
          <QuestSection title="Featured Quests" testVariable={featuredQuests} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
