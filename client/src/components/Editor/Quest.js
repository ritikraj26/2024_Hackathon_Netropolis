import { useContext, useState } from "react";
import { Spinner } from "flowbite-react";
import { EditorPageContext } from "../../pages/EditorPage/EditorPage";
import TaskCard from "./TaskCard";
import { AuthContext } from "../../App";
import { toast } from "react-toastify";
import { PublishQuest } from "../Quests/QuestQueries";
import { useNavigate } from "react-router-dom";

const QuestEditSection = () => {
  const navigate = useNavigate();
  const { authSession } = useContext(AuthContext);
  const { taskList, setTaskList } = useContext(EditorPageContext);
  const [submitting, setSubmitting] = useState(false);

  console.log("Selected Task List : ", taskList);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (authSession === null || authSession === undefined) {
      toast.error("Not authenticated");
      setSubmitting(false);
      return;
    }

    let day = 1;

    console.log("submit task list : ", taskList);

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
        toast.error("Error publishing quest");
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
          required
          className="w-full p-2 border-2 border-gray-200 rounded-md"
        />
        <label htmlFor="questDesc" className="text-lg font-bold">
          Quest Description
        </label>
        <textarea
          id="questDesc"
          name="questDesc"
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
            className="max-w-xs w-full p-2 border-2 border-gray-200 rounded-md"
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
          <div className="task-item-empty mb-4">No tasks found</div>
        )}
        <div className="flex flex-col"></div>
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
      </form>
    </div>
  );
};

export default QuestEditSection;
