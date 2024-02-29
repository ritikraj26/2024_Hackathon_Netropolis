import { Modal, Spinner } from "flowbite-react";
import { useState, useContext } from "react";
import { PurchaseQuest } from "./QuestQueries";
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

const PurchaseModal = ({ quest, showPurchase, setShowPurchase }) => {
  const { authSession } = useContext(AuthContext);
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  function onCloseModal() {
    setShowPurchase(false);
  }

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

    PurchaseQuest({
      user_id: authSession.uuid,
      quest_id: quest.quest_uuid,
      num_people: parseInt(e.target[0].value),
      description: e.target[1].value,
    })
      .then((data) => {
        console.log("CreateTask : ", data);
        toast.success("Quest purchased successfully", {
          toastId: "create-task-success",
        });
        setShowPurchase(false);
        setSubmitting(false);
        navigate(0);
      })
      .catch((err) => {
        toast.error("Error purchasing quest", {
          toastId: "purchase-quest-failed",
        });
        console.error("CreateTask : ", err);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Modal
        show={showPurchase}
        size="xl"
        onClose={onCloseModal}
        theme={createTaskTheme}
        popup
      >
        <div className="relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-60 bg-gradient-to-r from-green-200 to-pink-200" />
          <Modal.Header className="relative z-10 bg-transparent m-5">
            Enter Member Details
          </Modal.Header>
        </div>
        <div className="mx-2 max-h-full flex flex-col p-4 max-w-screen overflow-y-auto max-sm:p-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <div className="mb-1 block">
                  <label
                    htmlFor="max-person"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Number of people
                  </label>
                </div>
                <input
                  type="number"
                  id="task-points"
                  className="w-[100px] p-2 border-2 border-gray-200 rounded-md"
                  min={1}
                  max={1000}
                  required
                />
              </div>
              <div className="mb-1 block">
                <label
                  htmlFor="member-desc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Member Descriptions
                </label>
              </div>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="The members are ..."
                required
              ></textarea>
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
};
export default PurchaseModal;
