import { Banner } from "flowbite-react";
import { useContext } from "react";
import { EditorPageContext } from "../../pages/EditorPage/EditorPage";

const TaskCard = ({ task, minus, showSelected }) => {
  const { taskList, setTaskList } = useContext(EditorPageContext);

  const handleTaskClick = (e) => {
    e.preventDefault();

    if (minus) {
      const newList = taskList.map((t) => {
        if (t.uuid === task.uuid) {
          return { ...t, selected: false };
        }
        return t;
      });
      setTaskList(newList);
    } else {
      const newList = taskList.map((t) => {
        if (t.uuid === task.uuid) {
          return { ...t, selected: true };
        }
        return t;
      });
      setTaskList(newList);
    }
  };

  return (
    <Banner
      className={
        (showSelected == task.selected ? " " : "hidden ") +
        " mb-2 border-primary-600 relative "
      }
      onClick={handleTaskClick}
    >
      <div className="relative left-1/2 -translate-x-1/2 hover:bg-primary-100 flex w-[calc(100%-2rem)] flex-row justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row lg:max-w-7xl">
        <div className="flex flex-col items-start md:mb-0 md:flex-row md:items-center mx-2">
          <span className="text-pretty text-center self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">
            {task.duration + " Days"}
          </span>
        </div>
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <p className="flex items-center text-sm font-normal text-gray-700 dark:text-gray-400 ">
            {task.name}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <button
            type="submit"
            className=" text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm p-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {minus ? (
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="hover:fill-white hover:bg-black text-primary-900 font-extrabold text-2xl"
                height="1em"
                width="1em"
              >
                <path d="M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" />
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>
    </Banner>
  );
};

export default TaskCard;
