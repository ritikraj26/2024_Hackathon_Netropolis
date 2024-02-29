import { useContext, useEffect, useState } from "react";
import { FetchTasksByCreatorId } from "../Tasks/TaskQueries";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import TaskCard from "../Editor/TaskCard";
import CreateTaskModal from "./CreateTask";

const UserCreatedTaskSection = () => {
  const [taskList, setTaskList] = useState(null);
  const { authSession } = useContext(AuthContext);
  const [craeteTask, setCreateTask] = useState(false);

  useEffect(() => {
    // Fetch locations
    FetchTasksByCreatorId({ creator_id: authSession.uuid })
      .then((data) => {
        console.log("UserCreatedTaskSection data : ", data);
        data.reverse();
        setTaskList(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch tasks", {
          toastId: "fetch-tasks",
        });
      });
  }, [authSession]);

  const handleNewTask = (e) => {
    e.preventDefault();

    setCreateTask(true);
  };

  return (
    <div className="max-sm:max-h-[400px] bg-gradient-to-r from-purple-200 to-pink-200 mx-2 max-h-full border rounded-xl flex flex-col p-4 max-w-screen overflow-y-auto max-sm:p-2">
      <div className="flex flex-row">
        <div className=" task-section-header text-xl mb-4 px-2">
          Task Created by You
        </div>
        <div className="items-center">
          <button
            onClick={handleNewTask}
            className=" text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm p-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="hover:fill-white hover:bg-black text-primary-900 font-extrabold text-2xl"
              height="1em"
              width="1em"
            >
              <path d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" />
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
            </svg>
          </button>
        </div>
      </div>
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
                    notEditable={true}
                  />
                );
              })
            ) : (
              <div className="task-item-empty">No tasks found</div>
            )}
          </>
        )}
      </div>
      {craeteTask && (
        <CreateTaskModal
          craeteTask={craeteTask}
          setCreateTask={setCreateTask}
        />
      )}
    </div>
  );
};

export default UserCreatedTaskSection;
