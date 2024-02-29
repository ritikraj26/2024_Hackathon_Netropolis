import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const navbarTheme = {
  root: {
    base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
    rounded: {
      on: "rounded",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-around",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full md:block md:w-auto mx-5",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pr-4 pl-3 md:p-0",
    active: {
      on: "bg-primary-700 text-white dark:text-white md:bg-transparent md:text-primary-700",
      off: "border-b border-gray-100  text-gray-700 hover:bg-primary-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-primary-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-primary-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-primary-700 dark:focus:ring-gray-600 md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};

const AuthNavContext = createContext({});

const TopNavbar = (props) => {
  const navigate = useNavigate();
  const { authSession, setAuthSession } = useContext(AuthContext);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // fetch user data
    if (authSession !== null || authSession !== undefined) {
      console.log("authSession : ", authSession);
      setUserObj({
        first_name: authSession.first_name,
        last_name: authSession.last_name,
        email: authSession.email,
      });
    }
  }, [authSession]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("auth");
    setAuthSession(null);
    navigate("/login");
  }, [navigate, setAuthSession]);

  return (
    <AuthNavContext.Provider value={{}}>
      <div className="box-border m-0 relative sticky z-50 w-full h-16 bg-white border-b-2 border-primary-200 left-0 top-0 dark:bg-gray-700 dark:border-gray-600 ">
        <Navbar fluid theme={navbarTheme}>
          <Navbar.Brand href="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.jpeg"}
              className="mr-3 h-6 sm:h-9 rounded rounded-full"
              alt="Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Japan Explore
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={userObj?.profile_img}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {userObj?.first_name} {userObj?.last_name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {userObj?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link
              href="/dashboard"
              active={window.location.pathname === "/dashboard"}
              className="text-xl"
            >
              Dashboard
            </Navbar.Link>
            <Navbar.Link
              href="/quests"
              active={window.location.pathname === "/quests"}
              className="text-xl"
            >
              Quests
            </Navbar.Link>
            {authSession.role === "manager" && (
              <Navbar.Link
                href="/editor"
                active={window.location.pathname === "/leaderboard"}
                className="text-xl"
              >
                Quest Editor
              </Navbar.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div>{props.children}</div>
    </AuthNavContext.Provider>
  );
};

export default TopNavbar;
