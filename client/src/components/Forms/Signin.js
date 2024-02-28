import { useContext, useState } from "react";
import { Spinner } from "flowbite-react";
import { UserLogin } from "../LoginSignup/UserQueries";
import { ManagerLogin } from "../LoginSignup/ManagerQueries";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { authSession, setAuthSession } = useContext(AuthContext);

  const errStyle =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // check auth
    if(props.role === "user") {
      UserLogin({ email: e.target[0].value, password: e.target[1].value })
        .then((data) => {
          console.log("login data : ", data);
          sessionStorage.setItem("auth", JSON.stringify(data));
          setAuthSession({ ...data });
          setSubmitting(false);
          toast.info("Login successful");
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error("Login failed");
          console.error("Login error : ", err);
          setSubmitting(false);
        });
    }
    else {
      ManagerLogin({ email: e.target[0].value, password: e.target[1].value })
        .then((data) => {
          console.log("login data : ", data);
          sessionStorage.setItem("auth", JSON.stringify(data));
          setAuthSession({ ...data });
          setSubmitting(false);
          toast.info("Login successful");
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error("Login failed");
          console.error("Login error : ", err);
          setSubmitting(false);
        });
    }
  };

  return (
    <div className="signin-form px-5 py-3">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className={
              (error ? errStyle : " ") +
              "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            }
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className={
              (error ? errStyle : " ") +
              "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            }
            placeholder="name@domain.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            required
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {error}
            </p>
          )}
        </div>
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
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
