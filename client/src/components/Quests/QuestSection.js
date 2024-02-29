import { UserQuest, SkeletonUserQuest } from "../../components/Quests/UserCard";
import { IoMdArrowDropleftCircle } from "react-icons/io";

const QuestSection = (props) => {
  return (
    <div>
      <h1 className="text-2xl max-sm:text-xl text-gray-800 mt-4">
        {props.title}
      </h1>
      <div className="card-carousel relative">
        <div className="flex flex-row items-center py-4 overflow-x-auto">
          {props.testVariable === null ? (
            <>
              <div className="absolute z-10 opacity-0 hover:opacity-80 top-1/2 -translate-y-1/2 w-[40px]">
                <button className="pointer-none">
                  <IoMdArrowDropleftCircle className="w-full text-9xl text-gray-600" />
                </button>
              </div>
              <SkeletonUserQuest />
              <SkeletonUserQuest />
              <SkeletonUserQuest />
              <SkeletonUserQuest />
            </>
          ) : (
            <>
              {props.testVariable.length === 0
                ? "No quests found"
                : props.testVariable.map((quest) => {
                    console.log(props.title + " " + quest);
                    return (
                      <UserQuest
                        location={quest.location}
                        quest_name={quest.quest_name}
                        num_tasks={quest.total_tasks}
                        total_duration={quest.quest_total_duration}
                        total_points={quest.quest_total_points}
                        description={quest.quest_description}
                        quest_uuid={quest.quest_uuid}
                        key={quest.quest_uuid}
                      />
                    );
                  })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestSection;
