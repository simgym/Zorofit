import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { exerciseAction } from "../store/ExerciseStore";
import { auth, storage } from "../index";
import defaultpic from "../assets/default.jpg";
import { useSelector } from "react-redux";
import { ref, getDownloadURL } from "firebase/storage";
import "./MainNavigation.css";

const MainNavigation = ({ scrollToSection, homeRef, programRef }) => {
  let it = 0;
  console.log("scrollToSection prop in MainNavigation:", scrollToSection, ++it);

  let location = useLocation();

  console.log("location is ", location);

  // let avatar = useSelector((state) => state.exerciseReducer.avatar);
  const [avatar, setAvatar] = useState(defaultpic);

  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [isDietActive, setIsDietActive] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        if (auth.currentUser && auth.currentUser.uid) {
          console.log("USER DISPLAY NAME : ", auth.currentUser.displayName);
          const fileRef = ref(storage, auth.currentUser.uid + ".png");

          if (fileRef) {
            const photoURL = await getDownloadURL(fileRef);
            console.log("PHOTOURL", photoURL);
            setAvatar(photoURL);
          }
        }
        // setIsLoading(false);
      } catch (error) {
        // Handle any errors here
        setAvatar(defaultpic);
        console.error("Error fetching avatar:", error);
      }
    };

    fetchData(); // Call the async function
  }, [auth.currentUser]);

  const exerciseHandler = () => {
    if (location.pathname == "/") {
      scrollToSection(programRef);
    } else {
      navigate("/exercise/referance");
    }
  };

  // const dietHandler = () => {
  // setIsDietOpen((prev) => !prev);
  // if (isExerciseOpen) {
  //   setIsExerciseOpen(false);
  // }
  //   navigate("/diet");
  // };

  const exerciseList = ["cardio", "powerlifting", "strength", "stretching"];

  return (
    <main>
      <div className="nav-content-wrapper">
        <div className="nav-item">
          <motion.p
            onClick={() => {
              navigate("/");
            }}
            onMouseEnter={() => setIsHomeActive(true)}
            onMouseLeave={() => setIsHomeActive(false)}
          >
            Home
          </motion.p>
          <motion.div
            className="underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHomeActive ? 1 : 0 }} // use condition of ref over here to check if viewport is at this reference  instead of using isExerciseActive
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="nav-item">
          <motion.p
            onClick={exerciseHandler}
            onMouseEnter={() => setIsExerciseActive(true)}
            onMouseLeave={() => setIsExerciseActive(false)}
          >
            Exercises
          </motion.p>
          <motion.div
            className="underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isExerciseActive ? 1 : 0 }} // use ref poistion here as a condition
            transition={{ duration: 0.5 }}
          />
        </div>
        {/* <div className="nav-item">
          <motion.p
            onClick={dietHandler}
            onMouseEnter={() => setIsDietActive(true)}
            onMouseLeave={() => setIsDietActive(false)}
          >
            Diet
          </motion.p>
          <motion.div
            className="underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isDietActive ? 1 : 0 }} 
            transition={{ duration: 0.5 }}
          />
        </div> */}
        <div className="nav-item">
          <p>
            {auth.currentUser && (
              <img
                src={avatar}
                onClick={() => setIsProfileClicked((prev) => !prev)}
              />
            )}
          </p>
          <p className="nav-login-link">
            {" "}
            {!auth.currentUser && <Link to="/login">Login</Link>}
          </p>
          {isProfileClicked && (
            <motion.ul
              className="nav-list"
              initial={{ opacity: 0, y: -10 }}
              exit={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <li onClick={() => setIsProfileClicked((prev) => !prev)}>
                <Link to={`/about/${auth.currentUser.uid}`}>About</Link>
              </li>
              <li onClick={() => setIsProfileClicked((prev) => !prev)}>
                <Link to={`/myprofile/${auth.currentUser.uid}`}>Profile</Link>
              </li>
              <li onClick={() => setIsProfileClicked((prev) => !prev)}>
                <Link to={`/signout`}>Signout</Link>
              </li>
            </motion.ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainNavigation;
