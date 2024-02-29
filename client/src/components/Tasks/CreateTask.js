import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { FetchLocations } from "../Quests/QuestQueries";
import { FetchCategories, FetchLocationType } from "./TaskQueries";
import { Spinner } from "flowbite-react";

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
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
  footer: {
    base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
    popup: "border-t",
  },
};

function CreateTask() {
  const [openModal, setOpenModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locationTypes, setLocationTypes] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    created_by: "",
    duration: 0,
    points: 0,

    // Add more fields as needed
  });

  function onCloseModal() {
    setOpenModal(false);
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

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/japan-full.png"
              })`,
            }}
          />
          <Modal.Header className="relative z-10 bg-transparent m-5">
            Create a New Task
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                placeholder="Enter your task name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput
                id="description"
                type="text"
                placeholder="Enter you task description"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskPoints" value="Points" />
              </div>
              <TextInput
                id="taskPoints"
                type="text"
                placeholder="Enter your task points"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
              </div>
              <select
                id="base-input"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:focus:border-primary-800 dark:text-gray-300"
              >
                {locations.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <label
                  htmlFor="locationtype-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location Type
                </label>
              </div>
              <select
                id="locationtype-input"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:focus:border-primary-800 dark:text-gray-300"
              >
                {locationTypes.map((locationType, index) => (
                  <option key={index} value={locationType.name}>
                    {locationType.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <label
                  htmlFor="category-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
              </div>
              <select
                id="category-input"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:focus:border-primary-800 dark:text-gray-300"
              >
                {categories.map((categories, index) => (
                  <option key={index} value={categories.name}>
                    {categories.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="creator name" value="Creator Name" />
              </div>
              <TextInput
                id="creator name"
                type="text"
                placeholder="Enter your name"
                required
              />
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateTask;
