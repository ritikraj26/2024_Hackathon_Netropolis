import { useContext, useEffect, useState } from "react";
import { FetchLocations } from "../Quests/QuestQueries";
import { FetchTasksByLocation } from "../Tasks/TaskQueries";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import { Spinner } from "flowbite-react";
import TaskCard from "./TaskCard";
import { EditorPageContext } from "../../pages/EditorPage/EditorPage";

const TaskSection = () => {
  const { taskList, setTaskList, quest_id } = useContext(EditorPageContext);
  const [locations, setLocations] = useState(null);
  const { authSession } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch locations
    FetchLocations()
      .then((data) => {
        setLocations(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch locations", {
          toastId: "fetch-locations",
        });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (authSession === null || authSession === undefined) {
      toast.error("Not authenticated", { toastId: "not-authenticated" });
      setSubmitting(false);
      return;
    }

    const location_id = e.target[0].value;
    console.log("location_id: ", location_id);

    FetchTasksByLocation({ location_id: location_id })
      .then((data) => {
        const newData = data.map((task) => {
          return { ...task, selected: false };
        });
        setTaskList(newData);
        console.log(`loc by ${location_id} : `, newData);
        setSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch tasks", {
          toastId: "fetch-tasks",
        });
        setSubmitting(false);
      });
  };

  return (
    <div className="max-sm:max-h-[400px] bg-gradient-to-r from-green-200 to-pink-200 mx-2 max-h-full border rounded-xl flex flex-col p-4 max-w-screen overflow-y-auto max-sm:p-2">
      <div className="task-section-header text-xl mb-4">Task List</div>
      <form className="mx-auto w-full" onSubmit={handleSubmit}>
        <div className="task-location-select flex flex-row mb-4">
          <div className="mx-4">
            <select
              id="locations"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            >
              <option
                value=""
                selected={quest_id === null || quest_id === undefined}
                disabled
                hidden
              >
                Choose location
              </option>
              {locations &&
                locations.map((location, index) => (
                  <option
                    key={index}
                    value={location.uuid}
                    selected={
                      quest_id && location.uuid === taskList[0]?.location?.uuid
                    }
                  >
                    {location.name}
                  </option>
                ))}
            </select>
          </div>
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
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>

      <div className="task-list">
        {taskList && (
          <>
            {taskList.length > 0 ? (
              taskList.map((task) => {
                return (
                  <TaskCard
                    key={task.uuid}
                    task={task}
                    minus={false}
                    showSelected={false}
                  />
                );
              })
            ) : (
              <div className="task-item-empty">No tasks found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskSection;
