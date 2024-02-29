import { Card } from "flowbite-react";
import QuestModal from "./QuestModal";
import { useState } from "react";

const SkeletonUserQuest = () => {
  return (
    <div className="relative animate-pulse ml-4">
      <Card
        className="w-[230px]  max-sm:w-[240px] rounded-3xl"
        renderImage={() => (
          <div className="h-[180px] max-sm:h-[120px] bg-primary-100 rounded-t-3xl "></div>
        )}
      >
        <div className="flex items-center w-full">
          <div className="h-2.5 bg-primary-100 rounded-full dark:bg-primary-700 w-32"></div>
          <div className="h-2.5 ms-2 bg-primary-200 rounded-full dark:bg-primary-600 w-24"></div>
          <div className="h-2.5 ms-2 bg-primary-200 rounded-full dark:bg-primary-600 w-full"></div>
        </div>
        <div className="flex items-center w-full">
          <div className="h-2.5 bg-primary-100 rounded-full dark:bg-primary-700 w-32"></div>
          <div className="h-2.5 ms-2 bg-primary-200 rounded-full dark:bg-primary-600 w-24"></div>
          <div className="h-2.5 ms-2 bg-primary-200 rounded-full dark:bg-primary-600 w-full"></div>
        </div>
      </Card>
    </div>
  );
};

const UserQuest = (props) => {
  const [showQuest, setShowQuest] = useState(false);

  const handleClick = () => {
    setShowQuest(true);
  };

  return (
    <div className="relative mx-4">
      <button onClick={handleClick}>
        <Card
          className="w-[230px] max-sm:w-[240px] rounded-3xl"
          renderImage={() => (
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 h-[180px] max-sm:h-[120px] rounded-t-3xl opacity-65 object-cover"></div>
          )}
        >
          <div className="quest-location absolute top-0 left-0 p-6">
            <h5 className="tracking-tight  max-w-xs">{props.location}</h5>
            <h3 className="text-2xl font-bold ">{props.quest_name}</h3>
          </div>

          <div className="flex flex-row">
            <div className="basis-1/2">
              <p className="font-bold text-3xl text-center ">
                {props.num_tasks}
              </p>
              <p className="text-center text-gray-600">Tasks</p>
            </div>
            <div className="basis-1/2">
              <p className="font-bold text-3xl text-center ">
                {props.total_duration}
              </p>
              <p className="text-center text-gray-600">Duration</p>
            </div>
          </div>
        </Card>
      </button>

      <QuestModal
        location={props.location}
        quest_name={props.quest_name}
        num_tasks={props.num_tasks}
        total_duration={props.total_duration}
        total_points={props.total_points}
        description={props.description}
        quest_uuid={props.quest_uuid}
        showQuest={showQuest}
        setShowQuest={setShowQuest}
      />
    </div>
  );
};

export { UserQuest, SkeletonUserQuest };
