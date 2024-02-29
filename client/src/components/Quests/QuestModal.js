import { Button, Modal, Badge } from "flowbite-react";
import { useEffect, useState, useContext } from "react";
import TimelineComponent from "./Timeline";
import { FetchTasksByQuest } from "../Tasks/TaskQueries";
import { toast } from "react-toastify";
import { QuestPurchasedByUser } from "./QuestQueries";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const modalTheme = {
  root: {
    base: "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      off: "hidden",
    },
    sizes: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    },
    positions: {
      "top-left": "items-start justify-start",
      "top-center": "items-start justify-center",
      "top-right": "items-start justify-end",
      "center-left": "items-center justify-start",
      center: "items-center justify-center",
      "center-right": "items-center justify-end",
      "bottom-right": "items-end justify-end",
      "bottom-center": "items-end justify-center",
      "bottom-left": "items-end justify-start",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
  },
  body: {
    base: "p-6 flex-1 overflow-auto",
    popup: "pt-0",
  },
  header: {
    base: "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
    popup: "p-2 border-b-0",
    title:
      "text-xl font-medium text-gray-900 dark:text-white flex flex-row items-center",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-white p-1.5 text-sm text-primary-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
  footer: {
    base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
    popup: "border-t",
  },
};

const QuestModal = (props) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [owned, setOwned] = useState(false);
  const { authSession } = useContext(AuthContext);

  useEffect(() => {
    if (authSession === null || authSession === undefined) {
      toast.error("Error fetching user", { toastId: "fetch-user" });
      navigate("/error");
    }

    FetchTasksByQuest({ quest_id: props.quest_uuid })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        toast.error("Error fetching tasks", { toastId: "fetch-tasks" });
        console.error("FetchTasksByQuest : ", error);
      });

    // check if user owns the quest (purchased or created)
    console.log("creator_uuid : ", props.creator_uuid);
    if (authSession.uuid === props.creator_uuid) {
      console.log("creator same");
      setOwned(true);
    }

    QuestPurchasedByUser({
      quest_id: props.quest_uuid,
      user_id: authSession.uuid,
    })
      .then((data) => {
        console.log("Purchased or not : ", data);
        if (data) setOwned(true);
      })
      .catch((error) => {
        console.error("QuestPurchasedByUser : ", error);
      });
  }, [props.quest_uuid, props, authSession, navigate]);

  const handleEditQuest = (e) => {
    e.preventDefault();
    navigate(`/editor/${props.quest_uuid}`);
  };

  const handlePurchaseQuest = (e) => {
    e.preventDefault();
    props.setShowPurchase(true);
    props.setShowQuest(false);
  };

  return (
    <>
      <Modal
        theme={modalTheme}
        show={props.showQuest}
        onClose={() => props.setShowQuest(false)}
      >
        <div className="relative">
          <div className="absolute rounded-t-lg inset-0 bg-cover bg-center opacity-60 bg-gradient-to-r from-green-200 to-pink-200" />
          <Modal.Header className="relative z-10 bg-transparent">
            <div className="max-sm:flex-col max-sm:flex flex-row flex">
              {props.quest_name}
              <Badge className="ml-2 max-sm:my-1 max-sm:mx-0">
                {props.location} Location
              </Badge>
              <Badge className="ml-2 max-sm:my-1 max-sm:mx-0">
                {props.total_points} Points
              </Badge>
            </div>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            <p className="truncate text-base leading-relaxed text-gray-500 dark:text-gray-400 max-sm:text-sm">
              {props.description}
            </p>
          </div>
        </Modal.Body>
        <div className="max-h-[400px] max-sm:max-h-[300px] px-10 my-2 overflow-x-auto">
          <TimelineComponent tasks={tasks} />
        </div>

        <Modal.Footer className="max-sm:flex-col max-sm:flex max-sm:space-y-2">
          <div className="flex flex-row">
            <Button
              onClick={handlePurchaseQuest}
              disabled={owned}
              color="primary"
              className="mr-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Purchase
            </Button>
            <Button
              onClick={handleEditQuest}
              disabled={owned}
              color="primary"
              className=" text-black border border-gray-600  bg-white-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Edit Quest
            </Button>
          </div>
          {owned && (
            <span className="text-sm text-primary-700 bg-primary-100 rounded-xl p-2">
              You already own this quest
            </span>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuestModal;
