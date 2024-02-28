import { Card } from "flowbite-react";

const SkeletonUserQuest = () => {
  return (
    <div className="relative animate-pulse ml-4">
      <Card
        className="max-w-[230px]  max-sm:max-w-[240px] rounded-3xl"
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
  return (
    <div className="relative mx-4">
      <Card
        className="max-w-[230px] max-sm:max-w-[240px] rounded-3xl"
        renderImage={() => (
          <img
            src={process.env.PUBLIC_URL + "/jp-as-1.jpg"}
            alt="image 1"
            className="h-[180px] max-sm:h-[120px] rounded-t-3xl opacity-65 object-cover"
          />
        )}
      >
        <div className="quest-location absolute top-0 left-0 p-6">
          <h5 className="tracking-tight  max-w-xs">{props.location}</h5>
          <h3 className="text-2xl font-bold ">{props.quest_name}</h3>
        </div>
        <div className="flex flex-row">
          <div className="basis-1/2">
            <p className="font-bold text-3xl text-center ">{props.num_tasks}</p>
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
    </div>
  );
};

export { UserQuest, SkeletonUserQuest };
