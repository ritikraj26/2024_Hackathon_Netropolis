const FetchTasksByQuest = ({ quest_id }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/task/quest/${quest_id}`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchTasksByQuest : ", error);
      reject(error);
    }
  });
};

const FetchCategories = () => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/categories`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchCategories : ", error);
      reject(error);
    }
  });
};

const FetchLocationType = () => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/location_types`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchLocationType : ", error);
      reject(error);
    }
  });
};

const FetchTasksByLocation = ({ location_id }) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get/task/location/${location_id}`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("FetchTasksByLocation : ", error);
      reject(error);
    }
  });
};

export {
  FetchTasksByLocation,
  FetchTasksByQuest,
  FetchCategories,
  FetchLocationType,
};
