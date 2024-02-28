const ManagerSignup = (props) => {
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
          organaization: props.organaization,
        }),
      };
  
      console.log("Req body : ", queryOptions.body);
  
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/signup/manager`,
          queryOptions
        );
  
        if (response.status >= 200 && response.status < 300) {
          const data = await response.json();
          resolve(data);
        } else {
          throw new Error(`HTTP Error ${response.status}`);
        }
      } catch (error) {
        console.error("ManagerSignup : ", error);
        reject(error);
      }
    });
  };
  
  const ManagerLogin = (props) => {
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
          `${process.env.REACT_APP_BACKEND_URL}/api/login/manager    `,
          queryOptions
        );
  
        if (response.status >= 200 && response.status < 300) {
          const data = await response.json();
          resolve(data);
        } else {
          throw new Error(`HTTP Error ${response.status}`);
        }
      } catch (error) {
        console.error("ManagerLogin : ", error);
        reject(error);
      }
    });
  };
  
  export { ManagerLogin, ManagerSignup };
  