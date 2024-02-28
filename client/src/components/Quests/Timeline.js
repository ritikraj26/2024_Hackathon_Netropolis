import { Timeline } from "flowbite-react";
import React from "react";

const timelineTheme = {
  root: {
    direction: {
      horizontal: "items-base sm:flex",
      vertical: "relative border-l border-gray-200 dark:border-gray-700",
    },
  },
  item: {
    root: {
      horizontal: "relative mb-6 sm:mb-0",
      vertical: "mb-10 ml-6",
    },
    content: {
      root: {
        base: "mt-3 sm:pr-8",
      },
      body: {
        base: "mb-4 text-base font-normal text-gray-500 dark:text-gray-400",
      },
      time: {
        base: "mb-1 text-md font-normal leading-none text-primary-700 dark:text-primary-500",
      },
      title: {
        base: "text-lg font-semibold text-gray-900 dark:text-white max-sm:text-sm",
      },
    },
    point: {
      horizontal: "flex items-center",
      line: "hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex",
      marker: {
        base: {
          horizontal:
            "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700",
          vertical:
            "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary-400 dark:border-gray-900 dark:bg-gray-700",
        },
        icon: {
          base: "h-3 w-3 text-cyan-600 dark:text-cyan-300",
          wrapper:
            "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900",
        },
      },
      vertical: "",
    },
  },
};

const TimelineComponent = (props) => {
  const tasks = [
    {
      task_uuid: "f1c347fb-1617-4738-a5e5-8244b1f79642",
      task_name: "Experience feeding farmed fish by local fishermen",
      task_description: "fishing activties",
      task_points: 20,
      task_duration: 2,
      day_number: 1,
    },
    {
      task_uuid: "386494db-9ba2-41d2-9cfd-377a4bd13d66",
      task_name:
        "Experience casting a net for inshore fishing by local fishermen",
      task_description: "fishing activties",
      task_points: 20,
      task_duration: 3,
      day_number: 2,
    },
    {
      task_uuid: "8c315f7e-66af-4666-aa29-96ff89f8f51f",
      task_name: "Experience helping with fish preparation and sorting",
      task_description: "fishing activties",
      task_points: 20,
      task_duration: 3,
      day_number: 3,
    },
    {
      task_uuid: "0796fd91-b1de-4893-b4d2-9ca99d1065cb",
      task_name: "Experience helping with fish preparation and sorting",
      task_description: "fishing activties",
      task_points: 20,
      task_duration: 3,
      day_number: 4,
    },
    {
      task_uuid: "3f872292-8d5e-48c3-b830-601088d64a35",
      task_name: "Experience helping with fish preparation and sorting",
      task_description: "fishing activties",
      task_points: 20,
      task_duration: 3,
      day_number: 5,
    },
    {
      task_uuid: "a01a8b67-6f8b-4e59-822b-9cd98859305c",
      task_name: "Experience helping with fish preparation and sorting",
      task_description: "fishing activties",
      task_points: 20,
      task_duration: 3,
      day_number: 6,
    },
  ];

  tasks.sort((a, b) => a.day_number - b.day_number);

  // Group tasks by day number
  const groupedTasks = tasks.reduce((acc, task) => {
    const dayNumber = task.day_number;
    if (!acc[dayNumber]) {
      acc[dayNumber] = [];
    }
    acc[dayNumber].push(task);
    return acc;
  }, {});

  // Convert grouped tasks object into an array
  const combinedTasks = Object.entries(groupedTasks).map(
    ([dayNumber, tasks]) => ({
      dayNumber,
      tasks,
    })
  );

  // Sort the combined tasks array based on day number
  combinedTasks.sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div>
      <Timeline theme={timelineTheme}>
        {combinedTasks &&
          combinedTasks.map((day, index) => (
            <Timeline.Item key={index}>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>Day {day.dayNumber}</Timeline.Time>
                {day.tasks.map((task, taskIndex) => (
                  <React.Fragment key={taskIndex}>
                    <Timeline.Title>{task.task_name}</Timeline.Title>
                    {/* Include task description or other task details here if needed */}
                  </React.Fragment>
                ))}
              </Timeline.Content>
            </Timeline.Item>
          ))}
      </Timeline>
    </div>
  );
};

export default TimelineComponent;
