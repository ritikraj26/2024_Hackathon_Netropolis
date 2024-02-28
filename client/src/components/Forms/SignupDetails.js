import { useContext, useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { UserSignup } from "../LoginSignup/UserQueries";
import { FetchLocations } from "../Quests/QuestQueries";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";

const SignupDetailsForm = (props) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [locations, setLocations] = useState([]);
  const { authSession, setAuthSession } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const details = {
      email: props?.creds?.email,
      password: props?.creds?.password,
      first_name: e.target[0].value,
      last_name: e.target[1].value,
      age: parseInt(e.target[2].value),
      gender: e.target[3].value,
      location_name: e.target[4].value,
      hobby: e.target[5].value,
      job: e.target[6].value,
      organization: e.target[7]?.value || "",
    };

    props.setDetails(details);

    if(props.role === "user") {
      UserSignup(details)
        .then((data) => {
          console.log("Sgnup data: ", data);
          sessionStorage.setItem("auth", JSON.stringify(data));
          setAuthSession({ ...data });
          toast.info("Signup Successful");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Signup error : ", err);
          toast.error("Signup failed");
          setSubmitting(false);
        });
    } else {
      ManagerSignup(details)
        .then((data) => {
          console.log("Sgnup data: ", data);
          sessionStorage.setItem("auth", JSON.stringify(data));
          setAuthSession({ ...data });
          toast.info("Signup Successful");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Signup error : ", err);
          toast.error("Signup failed");
          setSubmitting(false);
        });
    }
  };

  useEffect(() => {
    FetchLocations()
      .then((data) => {
        let locs = [];
        data.forEach((d) => {
          locs = [...locs, { uuid: d.uuid, name: d.name }];
        });

        console.log("locs ", locs);
        setLocations(locs);
      })
      .catch((error) => {
        console.error("Dashboard :", error);
      });
  }, []);

  return (
    <div className="signup-form px-5 py-3">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="mb-5 mr-[4px]">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              defaultValue={props?.details?.firstName}
              required
            />
          </div>
          <div className="ml-[4px]">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              defaultValue={props?.details?.lastName}
              required
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="mb-5 mr-[4px]">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              type="number"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              defaultValue={props?.details?.age}
              max={80}
              min={15}
              required
            />
          </div>
          <div className="ml-[4px]">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <select
              id="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="ml-[4px]">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <select
              id="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            >
              {locations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Hobbies
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="I like to..."
            defaultValue={props?.details?.hobbies}
            required
          ></textarea>
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job
          </label>
          <input
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            defaultValue={props?.details?.job}
            required
          />
        </div>
        {props.role === "manager" && (
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Organization
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              defaultValue={props?.details?.organization}
              required
            />
          </div>
        )}
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
            "Signup"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupDetailsForm;
