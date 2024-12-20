import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MobileModal from "./components/MobileModal/MobileModal";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";
import FAQ from "./components/FAQ/FAQ";
import Profile from "./components/Profile/Profile";
import Blog from "./components/Blog/Blog";
import NeedASurvey from "./components/BlogPages/NeedASurvey";
import CanYouOrder from "./components/BlogPages/CanYouOrder";
import PlatProblems from "./components/BlogPages/PlatProblems";
import AdversePossession from "./components/BlogPages/AdversePossesion";
import LoginModal from "./components/LoginModal/LoginModal";

import {
  register,
  authorizeUser,
  checkToken,
  getUserData,
  update,
} from "./components/utils/auth";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { Route, Routes, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";

function App() {
  //states go here
  const [currentUser, setCurrentUser] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate("");

  // functions go here

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleMobileModal = () => {
    setActiveModal("mobile");
    console.log("pie");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  function checkLoggedIn() {
    const jwt = localStorage.getItem("jwt");
    return checkToken(jwt)
      .then((res) => {
        setLogin(true);
        setCurrentUser(res.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const loginUser = (user) => {
    setIsLoading(true);
    const makeRequest = () => {
      return authorizeUser(user).then((res) => {
        localStorage.setItem("jwt", res.token);

        return checkLoggedIn(res.user);
      });
    };
    handleSubmit(makeRequest);
  };

  // const registerUser = (values) => {
  //   register(values)
  //     .then((user) => {
  //       loginUser(user);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const updateUser = (user) => {
  //   const jwt = localStorage.getItem("jwt");
  //   const makeRequest = () => {
  //     return update(user, jwt).then((res) => {
  //       setCurrentUser(res);
  //     });
  //   };
  //   handleSubmit(makeRequest);
  // };

  const logoutUser = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLogin(false);
    navigate.push("/");
  };

  // useeffcts here

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     checkLoggedIn(jwt)
  //       .then(() => {
  //         getUserData(jwt)
  //           .then((res) => {
  //             setCurrentUser(res.user);
  //           })
  //           .catch((err) => {
  //             if (err.response && err.response.status === 401) {
  //               console.error("Token expired or invalid. Logging out...");
  //               logoutUser();
  //             } else {
  //               console.error("Error fetching user data:", err);
  //             }
  //           });
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // }, [isLoggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          handleCreateModal={handleCreateModal}
          handleLogin={handleLoginModal}
          handleRegister={handleRegisterModal}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<Main handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/about"
            element={<About handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/services"
            element={<Services handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/contact"
            element={<Contact handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/faq"
            element={<FAQ handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/blog"
            element={<Blog handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/need-a-survey"
            element={<NeedASurvey handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/can-you-order"
            element={<CanYouOrder handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/plat-problems"
            element={<PlatProblems handleMobileModal={handleMobileModal} />}
          ></Route>
          <Route
            exact
            path="/adverse-possession"
            element={
              <AdversePossession handleMobileModal={handleMobileModal} />
            }
          ></Route>

          {/* protected routes */}
          <Route
            exact
            path="/profile"
            element={<Profile logout={logoutUser} />}
          ></Route>
        </Routes>
        <Footer />

        {activeModal === "mobile" && (
          <MobileModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "mobile"}
            isLoggedIn={isLoggedIn}
            handleLogout={logoutUser}
            openMobileModal={handleMobileModal}
            // handleLoginModal={handleLoginModal}
          />
        )}

        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            loginUser={loginUser}
            openRegisterModal={handleRegisterModal}
            isLoading={isLoading}
          />
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

// {isMobile ? (<> <MobileView handleMobileModal={handleMobileModal} /></>) :()}
