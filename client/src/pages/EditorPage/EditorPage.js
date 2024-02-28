import { AuthContext } from "../../App";
import { createContext, useContext, useState } from "react";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import QuestEditSection from "../../components/Editor/Quest";
import TaskSection from "../../components/Editor/Tasks";

const EditorPageContext = createContext({
  taskList: [],
  setTaskList: () => {},
});

const EditorPage = () => {
  const { authSession } = useContext(AuthContext);
  const [taskList, setTaskList] = useState([]);

  if (
    authSession === null ||
    authSession === undefined ||
    (authSession.role !== "user" && authSession.role !== "manager")
  ) {
    return <ErrorPage />;
  }

  return (
    <EditorPageContext.Provider
      value={{
        taskList: taskList,
        setTaskList: setTaskList,
      }}
    >
      <div className="relative">
        {/* <div className="absolute -z-[100] top-0 right-0">
        <img
          src={process.env.PUBLIC_URL + "/jp-as-2.jpg"}
          alt="mockup"
          className="opacity-50 bg-cover"
        />
      </div> */}
        <div className="pt-4 w-full h-full flex flex-row max-sm:flex-col justify-around">
          {/* <div className="">Quest List</div> */}
          <div className="">
            <QuestEditSection />
          </div>
          <div className="w-full max-w-md max-sm:max-h-[400px] max-h-[640px] max-sm:order-first max-sm:relative max-sm:left-1/2 max-sm:-translate-x-1/2 rounded-xl">
            <TaskSection />
          </div>
        </div>
      </div>
    </EditorPageContext.Provider>
  );
};

export { EditorPage, EditorPageContext };
