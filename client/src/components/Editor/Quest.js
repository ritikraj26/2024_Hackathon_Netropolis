import { useContext, useEffect, useState } from "react";
import { Spinner, Button } from "flowbite-react";
import { EditorPageContext } from "../../pages/EditorPage/EditorPage";
import TaskCard from "./TaskCard";
import { AuthContext } from "../../App";
import { toast } from "react-toastify";
import { FetchQuestsByLocation, PublishQuest } from "../Quests/QuestQueries";
import { useNavigate } from "react-router-dom";
import { FetchTasksByLocation, FetchTasksByQuest } from "../Tasks/TaskQueries";
import { FetchQuestByQuestId } from "../Quests/QuestQueries";

const QuestEditSection = () => {
  const navigate = useNavigate();
  const { authSession } = useContext(AuthContext);
  const { taskList, setTaskList, quest_id } = useContext(EditorPageContext);
  const [submitting, setSubmitting] = useState(false);
  const [questData, setQuestData] = useState(null);

  console.log("Selected   List : ", taskList);

  useEffect(() => {
    if (quest_id !== null && quest_id !== undefined) {
      // Fetch quest details
      FetchQuestByQuestId({ quest_id: quest_id })
        .then((data) => {
          console.log("Fetched quest : ", data);
          setQuestData({
            quest_name: data.quest_name,
            quest_description: data.quest_description,
            quest_max_people: data.quest_max_people,
          });
        })
        .catch((err) => {
          console.error("Error fetching quest : ", err);
          toast.error("Error fetching quest", {
            toastId: "fetch-quest",
          });
          navigate("/dashboard");
        });

      FetchTasksByQuest({ quest_id: quest_id })
        .then((data) => {
          const newData = data;
          // fetch quest by location same as these
          FetchTasksByLocation({ location_id: data[0].location.uuid })
            .then((data) => {
              console.log("Fetched tasks by location : ", data);
              // set the elements not present here as selected: false
              const newTaskList = data.map((task) => {
                console.log("Task : ", task);
                const found = newData.find((el) => el.uuid === task.uuid);
                if (found === undefined) {
                  return { ...task, selected: false };
                }
                return { ...task, selected: true };
              });
              console.log("New task list : ", newTaskList);
              setTaskList(newTaskList);
            })
            .catch((err) => {
              console.error("Error fetching tasks by location : ", err);
              toast.error("Error fetching tasks by location", {
                toastId: "fetch-tasks-by-location",
              });
              navigate("/dashboard");
            });
        })
        .catch((err) => {
          console.error("Error fetching tasks : ", err);
          toast.error("Error fetching tasks", {
            toastId: "fetch-tasks",
          });
          navigate("/dashboard");
        });
    }
  }, [quest_id, navigate, setTaskList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (authSession === null || authSession === undefined) {
      toast.error("Not authenticated", { toastId: "not-authenticated" });
      setSubmitting(false);
      return;
    }

    let day = 1;

    const reqData = {
      name: e.target[0].value,
      description: e.target[1].value,
      max_people: parseInt(e.target[2].value),
      location_name: e.target[3].value,
      creator_uuid: authSession.uuid,
      tasks: taskList.reduce((acc, task) => {
        if (task.selected) {
          day += task.duration;
          acc.push({
            uuid: task.uuid,
            day_number: day - task.duration,
          });
        }
        return acc;
      }, []),
    };

    console.log("Submitting quest : ", reqData);

    PublishQuest({ questData: reqData })
      .then((data) => {
        console.log("Quest published : ", data);
        toast.success("Quest published successfully");
        setSubmitting(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error publishing quest : ", error);
        toast.error("Error publishing quest", {
          toastId: "error-publishing-quest",
        });
        setSubmitting(false);
      });
  };

  return (
    <div className=" mx-2 max-h-full flex flex-col p-4 max-w-screen overflow-y-auto max-sm:p-2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="questName" className="text-lg font-bold">
          Quest Name
        </label>
        <input
          type="text"
          id="questName"
          name="questName"
          defaultValue={questData?.quest_name}
          required
          className="w-full p-2 border-2 border-gray-200 rounded-md"
        />
        <label htmlFor="questDesc" className="text-lg font-bold">
          Quest Description
        </label>
        <textarea
          id="questDesc"
          name="questDesc"
          defaultValue={questData?.quest_description}
          required
          className="w-full p-2 border-2 border-gray-200 rounded-md"
        />
        <div className="mb-5 mr-[4px]">
          <label htmlFor="base-input" className="text-lg font-bold">
            Maximum number of people
          </label>
          <input
            type="number"
            id="base-input"
            className="ml-2 max-w-[100px] w-full p-2 border-2 border-gray-200 rounded-md"
            defaultValue={questData?.quest_max_people}
            max={80}
            min={1}
            required
          />
        </div>
        <label htmlFor="questLocation" className="text-lg font-bold">
          Quest Location
        </label>
        <input
          type="text"
          id="questName"
          name="questName"
          required
          className="w-full p-2 border-2 border-gray-200 rounded-md mb-4"
          placeholder={"Select a task to see location"}
          value={taskList[0]?.location?.name}
          disabled
        />
        <label htmlFor="questTasks" className="text-lg font-bold">
          Quest Tasks
        </label>

        {taskList !== undefined && taskList !== null && taskList.length > 0 ? (
          taskList.map((task) => {
            return (
              <TaskCard
                key={task.uuid}
                task={task}
                minus={true}
                showSelected={true}
              />
            );
          })
        ) : (
          <div className="text-red-600 task-item-empty m-4">
            No tasks selected
          </div>
        )}
        <div className="flex flex-row">
          <button
            type="submit"
            className=" text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {submitting ? (
              <>
                <Spinner
                  aria-label="Spinner button example"
                  size="sm"
                  className="fill-primary-700 text-grey-0"
                />
                <span className="pl-3">Publishing...</span>
              </>
            ) : (
              "Publish Quest"
            )}
          </button>
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            color="primary"
            className="ml-4 text-black border border-gray-600  bg-white-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestEditSection;
