const UserSignup = (props) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
        first_name: props.first_name,
        last_name: props.last_name,
        location_name: props.location_name,
        gender: props.gender,
        age: props.age,
        hobby: props.hobby,
        job: props.job,
      }),
    };

    console.log("Req body : ", queryOptions.body);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup/user`,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("UserSignup : ", error);
      reject(error);
    }
  });
};

const UserLogin = (props) => {
  return new Promise(async (resolve, reject) => {
    const queryOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/login/user    `,
        queryOptions
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        resolve(data);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (error) {
      console.error("UserLogin : ", error);
      reject(error);
    }
  });
};

export { UserLogin, UserSignup };
