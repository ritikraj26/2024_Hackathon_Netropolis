import { Button, Modal, Badge } from "flowbite-react";
import { useState } from "react";
import TimelineComponent from "./Timeline";

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
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Quest Card</Button>
      <Modal
        theme={modalTheme}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/japan-full.png"
              })`,
            }}
          />
          <Modal.Header className="relative z-10 bg-transparent">
            {props.questName}
            <Badge className="mx-4">{props.questLocation} Location</Badge>
            <Badge className="mx-4 ">{props.questPoints} Points</Badge>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            <p className="truncate text-base leading-relaxed text-gray-500 dark:text-gray-400 max-sm:text-sm">
              {props.questDescription}
            </p>
          </div>
        </Modal.Body>
        <div className="max-h-[400px] max-sm:max-h-[300px] px-10 my-2 overflow-x-auto">
          <TimelineComponent />
        </div>
        <Modal.Footer>
          <button
            onClick={() => setOpenModal(false)}
            className=" text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Purchase
          </button>
          <button
            onClick={() => setOpenModal(false)}
            className=" text-black border  bg-white-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Decline
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuestModal;
