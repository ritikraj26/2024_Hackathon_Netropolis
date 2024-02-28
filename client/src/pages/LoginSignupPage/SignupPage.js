import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SignupCredsForm from "../../components/Forms/SignupCreds";
import SignupDetailsForm from "../../components/Forms/SignupDetails";
import { useState } from "react";
import { AuthContext } from "../../App";


const commonStyle =
  "flex-row content-start relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow m-0 px-5 py-8";
const desktopStyle = "";
const mobileStyle = "max-sm:max-w-sm";

const SignupPage = () => {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState(0);
  const [creds, setCreds] = useState(null);
  const [details, setDetails] = useState(null);
  const { authSession } = useContext(AuthContext);

  const forms = [
    <SignupCredsForm
      creds={creds}
      setCreds={setCreds}
      setCurrPage={setCurrPage}
    />,
    <SignupDetailsForm
      details={details}
      setDetails={setDetails}
      creds={creds}
      role={authSession.role}
    />,
  ];

  const handleBackClick = (e) => {
    e.preventDefault();
    setCurrPage((prev) => prev - 1);
  };

  return (
    <div className="signup-page h-screen w-screen m-0 p-0">
      <div className="absolute top-0 left-0 -z-50 w-screen">
        <img
          src={process.env.PUBLIC_URL + "/jp-as-2.jpg"}
          alt="mockup"
          className=" w-screen h-screen object-cover hue-rotate-[70deg]"
        />
      </div>
      <div
        className={
          "signup-card " + commonStyle + " " + desktopStyle + " " + mobileStyle
        }
      >
        <div className="signup-header px-5 py-2 w-full flex flex-row">
          <button>
            <FaArrowLeft
              className="hover:scale-125 transform transition-transform duration-100 ease-in-out"
              onClick={handleBackClick}
            />
          </button>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              Signup
            </span>
          </div>
        </div>
        {currPage >= 0 && currPage < forms.length
          ? forms[currPage]
          : navigate("/")}
      </div>
    </div>
  );
};

export default SignupPage;
