import { useState, useEffect } from "react";
import QuestSection from "../../components/Quests/QuestSection";
import {
  FetchLocations,
  FetchQuestsByLocation,
  FindQuestsByText,
} from "../../components/Quests/QuestQueries";

const QuestPage = () => {
  const [search, setSearch] = useState(null);
  const [locations, setLocations] = useState([]);
  const [questsSearch, setQuestsSearch] = useState(null);

  useEffect(() => {
    FetchLocations()
      .then((data) => {
        let locs = [];
        data.forEach((d) => {
          FetchQuestsByLocation({ location_id: d.uuid })
            .then((data) => {
              console.log(`query by loc-id ${d.uuid}: `, data);
              locs = [...locs, { uuid: d.uuid, name: d.name, quests: data }];

              setLocations(locs);
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((error) => {
        console.error("Dashboard :", error);
      });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (e.target[0].value === "") {
      setSearch(null);
      return;
    }

    FindQuestsByText({ search_query: e.target[0].value })
      .then((data) => {
        console.log("text query res : ", data);
        setQuestsSearch(data);
      })
      .catch((err) => {
        console.error(err);
      });
    setSearch(e.target[0].value);
  };

  return (
    <div className="quest-page relative w-screen mt-4">
      <div className="relative search-bar w-full max-w-xl px-4 left-1/2 -translate-x-1/2 ">
        <form onSubmit={handleSearchSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search Quests"
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* quests : show for five locations */}
      <div className="w-full h-full flex flex-col justify-center">
        <div className="w-full h-full min-w-[320px] max-w-[80%] px-4 self-center">
          {search ? (
            <QuestSection
              title={'Search Results for "' + search + '"'}
              testVariable={questsSearch}
            />
          ) : (
            locations.map((location) => (
              <QuestSection
                title={location.name}
                testVariable={location.quests}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestPage;
