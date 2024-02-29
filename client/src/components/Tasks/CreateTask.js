import { Modal } from "flowbite-react";
import { useState, useEffect, useContext } from "react";
import { FetchLocations } from "../Quests/QuestQueries";
import { FetchCategories, FetchLocationType } from "./TaskQueries";
import { Spinner } from "flowbite-react";
import { CreateTask } from "./TaskQueries";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const createTaskTheme = {
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

function CreateTaskModal(props) {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locationTypes, setLocationTypes] = useState([]);
  const { authSession } = useContext(AuthContext);
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  function onCloseModal() {
    props.setCreateTask(false);
  }

  useEffect(() => {
    FetchLocations()
      .then((data) => {
        let locs = [];
        data.forEach((d) => {
          locs = [...locs, { uuid: d.uuid, name: d.name }];
        });

        console.log("locs ", locs);
        setLocations(locs);
      })
      .catch((error) => {
        console.error("Dashboard :", error);
      });

    // Fetch categories
    FetchCategories()
      .then((data) => {
        let cats = [];
        data.forEach((d) => {
          cats = [...cats, { uuid: d.uuid, name: d.name }];
        });

        console.log("cats ", cats);
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch locationTypes
    FetchLocationType()
      .then((data) => {
        let locationTypes = [];
        data.forEach((d) => {
          locationTypes = [...locationTypes, { uuid: d.uuid, name: d.name }];
        });

        console.log("locationtypes ", locationTypes);
        setLocationTypes(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (authSession === null || authSession === undefined) {
      toast.error("Please login to create a task", {
        toastId: "not-authenticated",
      });
      setSubmitting(false);
      navigate("/login");
    }

    const reqData = {
      creator_id: authSession.uuid,
      name: e.target[0].value,
      description: e.target[1].value,
      points: parseInt(e.target[2].value),
      duration: parseInt(e.target[3].value),
      location_id: e.target[4].value,
      location_type_id: e.target[5].value,
      category_id: e.target[6].value,
    };
    console.log("submitting data : ", reqData);

    CreateTask(reqData)
      .then((data) => {
        console.log("CreateTask : ", data);
        toast.success("Task created successfully");
        props.setCreateTask(false);
        setSubmitting(false);
        navigate(0);
      })
      .catch((err) => {
        toast.error("Error creating task", { toastId: "create-task-failed" });
        console.error("CreateTask : ", err);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Modal
        show={props.craeteTask}
        size="xl"
        onClose={onCloseModal}
        theme={createTaskTheme}
        popup
      >
        <div className="relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-60 bg-gradient-to-r from-green-200 to-pink-200" />
          <Modal.Header className="relative z-10 bg-transparent m-5">
            Create a New Task
          </Modal.Header>
        </div>
        <div className="mx-2 max-h-full flex flex-col p-4 max-w-screen overflow-y-auto max-sm:p-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <div className="mb-1 block">
                  <label
                    htmlFor="task-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Title
                  </label>
                </div>
                <input
                  type="text"
                  id="task-name"
                  name="task-name"
                  required
                  className="active:border-primary-500 w-full p-2 border-2 border-gray-200 rounded-md"
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <label
                    htmlFor="questDesc"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Description
                  </label>
                </div>
                <textarea
                  id="questDesc"
                  name="questDesc"
                  required
                  className="w-full p-2 border-2 border-gray-200 rounded-md"
                />
              </div>
              <div>
                <div className="inline-block">
                  <div className="mb-1 block">
                    <label
                      htmlFor="task-points"
                      className="text-center wrap block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task Points <br />
                      (max 1000)
                    </label>
                  </div>
                  <input
                    type="number"
                    id="task-points"
                    className="w-[100px] p-2 border-2 border-gray-200 rounded-md"
                    min={0}
                    max={1000}
                    required
                  />
                </div>
                <div className="inline-block ml-4">
                  <div className="mb-1 block">
                    <label
                      htmlFor="task-points"
                      className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task Duration <br />
                      (in days)
                    </label>
                  </div>
                  <input
                    type="number"
                    id="task-points"
                    className="w-[100px] p-2 border-2 border-gray-200 rounded-md"
                    min={1}
                    max={20}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 block">
                  <label
                    htmlFor="base-input"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                </div>
                <select
                  id="base-input"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:focus:border-primary-800 dark:text-gray-300"
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location.uuid}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="mb-1 block">
                  <label
                    htmlFor="locationtype-input"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location Type
                  </label>
                </div>
                <select
                  id="locationtype-input"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:focus:border-primary-800 dark:text-gray-300"
                >
                  {locationTypes.map((locationType, index) => (
                    <option key={index} value={locationType.uuid}>
                      {locationType.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="mb-1 block">
                  <label
                    htmlFor="category-input"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                </div>
                <select
                  id="category-input"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:focus:border-primary-800 dark:text-gray-300"
                >
                  {categories.map((categories, index) => (
                    <option key={index} value={categories.uuid}>
                      {categories.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex justify-center">
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
                    "Create Task"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default CreateTaskModal;
