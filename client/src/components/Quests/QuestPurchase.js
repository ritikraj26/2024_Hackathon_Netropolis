import React, { useState } from "react";
import { Modal, Textarea } from "flowbite-react";
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

function QuestPurchase(props) {
  const [createTaskModal, setCreateTaskModal] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function onCloseModal() {
    setCreateTaskModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onCloseModal();
    }, 2000);
  };

  return (
    <>
      <Modal
        show={createTaskModal}
        size="xl"
        onClose={onCloseModal}
        theme={createTaskTheme}
        popup
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
          <Modal.Header className="relative z-10 bg-transparent m-5">
            Quest Purchase Details
          </Modal.Header>
        </div>
        <div className="mx-2 max-h-full flex flex-col p-4 max-w-screen overflow-y-auto max-sm:p-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div className="flex space-x-4">
                {" "}
                {/* Flex container */}
                <div className="w-1/2">
                  {" "}
                  {/* Name field */}
                  <div className="mb-1 block">
                    <label
                      htmlFor="task-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
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
                <div className="w-1/2">
                  {" "}
                  {/* Age field */}
                  <div className="mb-1 block">
                    <label
                      htmlFor="task-points"
                      className="text-center wrap block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Age <br />
                    </label>
                  </div>
                  <input
                    type="number"
                    id="task-points"
                    className="w-full p-2 border-2 border-gray-200 rounded-md"
                    min={0}
                    max={1000}
                    required
                  />
                </div>
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
                    "Purchase Quest"
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

export default QuestPurchase;
