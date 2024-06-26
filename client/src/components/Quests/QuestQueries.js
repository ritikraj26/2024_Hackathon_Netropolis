const FetchLocations = () => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/locations`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchLocations : ", error);
      reject(error);
    }
  });
};

const FetchQuestsByLocation = ({ location_id }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/quest/location/${location_id}`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchQuestsByLocation : ", error);
      reject(error);
    }
  });
};

const FetchQuestsByUserId = ({ user_id }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/user_quest/user/${user_id}`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchQuestsByUserId : ", error);
      reject(error);
    }
  });
};

const FindQuestsByText = ({ search_query }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search_query: search_query,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/search_results`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FindQuestsByText : ", error);
      reject(error);
    }
  });
};

const FetchQuestsByCreatorId = ({ creator_id }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/quest/createdBy/${creator_id}`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchQuestsByCreatorId : ", error);
      reject(error);
    }
  });
};

const PublishQuest = ({ questData }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questData),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/create/quest`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("PublishQuest : ", error);
      reject(error);
    }
  });
};

const QuestPurchasedByUser = ({ quest_id, user_id }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quest_id: quest_id,
        user_id: user_id,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/compare/quest/createdBy`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        if (data === null || data === undefined) {
          reject("No data found");
        } else {
          console.log("Purchase response :", data);
          resolve(data.purchased === "True" ? true : false);
        }
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchQuestsByCreatorId : ", error);
      reject(error);
    }
  });
};

const FetchQuestByQuestId = ({ quest_id }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/quest/${quest_id}`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchQuestByQuestId : ", error);
      reject(error);
    }
  });
};

const PurchaseQuest = ({ quest_id, user_id, num_people, description }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quest_id: quest_id,
        user_id: user_id,
        num_people: num_people,
        description: description,
      }),
    };

    console.log("body: ", queryOptions.body);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/purchased/user_quest`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("PurchaseQuest : ", error);
      reject(error);
    }
  });
};

export {
  FetchLocations,
  FetchQuestsByLocation,
  FetchQuestsByUserId,
  FetchQuestByQuestId,
  FindQuestsByText,
  FetchQuestsByCreatorId,
  PublishQuest,
  PurchaseQuest,
  QuestPurchasedByUser,
};
