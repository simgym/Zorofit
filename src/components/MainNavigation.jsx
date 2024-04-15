import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exerciseAction } from "../store/ExerciseStore";
import { auth } from "../index";
import defaultpic from "../assets/default.jpg";
import "./MainNavigation.css";

// once user has logged in add the profile opton which will open a list containing
// activity , my plan , logout options

// this my plan when clicked on should showcase the exercises i have selected for me
// and the diet i have selected too for each day of week

// By buying a membership based on your data you will be provided exercises and diet suited
// to your needs

// for diet create a component which will be used to create a diet plan by usinf ingrdients
// using spoonacular api

// check for erros in console for ref since ref are defined for font pages
// only so can't use in exercises and login pages so apply condition
// for ref to only work when user on front pages only

const MainNavigation = ({ scrollToSection, homeRef, programRef }) => {
  let it = 0;
  console.log("scrollToSection prop in MainNavigation:", scrollToSection, ++it);

  let location = useLocation();

  console.log("location is ", location);

  // const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  // const [isDietOpen, setIsDietOpen] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [isDietActive, setIsDietActive] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const exerciseHandler = () => {
    if (location.pathname == "/") {
      scrollToSection(programRef);
    } else {
      navigate("/exercise/referance");
    }

    // setIsExerciseOpen((prev) => !prev);

    // if (isDietOpen) {
    //   setIsDietOpen(false);
    // }
  };

  const dietHandler = () => {
    // setIsDietOpen((prev) => !prev);
    // if (isExerciseOpen) {
    //   setIsExerciseOpen(false);
    // }
  };

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
          {/* {isExerciseOpen && (
            <motion.ul
              className="nav-list"
              initial={{ opacity: 0, y: -10 }}
              exit={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <li>
                <Link
                  to={`/exercise/${exerciseList[0]}`}
                  onClick={() =>
                    dispatch(exerciseAction.exerciseType(exerciseList[0]))
                  }
                >
                  Cardio
                </Link>
              </li>
              <li>
                <Link
                  to={`/exercise/${exerciseList[1]}`}
                  onClick={() =>
                    dispatch(exerciseAction.exerciseType(exerciseList[1]))
                  }
                >
                  Powerlifting
                </Link>
              </li>
              <li>
                <Link
                  to={`/exercise/${exerciseList[2]}`}
                  onClick={() =>
                    dispatch(exerciseAction.exerciseType(exerciseList[2]))
                  }
                >
                  Strength
                </Link>
              </li>
              <li>
                <Link
                  to={`/exercise/${exerciseList[3]}`}
                  onClick={() =>
                    dispatch(exerciseAction.exerciseType(exerciseList[3]))
                  }
                >
                  Stretching
                </Link>
              </li>
            </motion.ul>
          )} */}
        </div>
        <div className="nav-item">
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
            animate={{ scaleX: isDietActive ? 1 : 0 }} // use ref poistion here as a condition
            transition={{ duration: 0.5 }}
          />
          {/* {isDietOpen && (
            <motion.ul
              className="nav-list"
              initial={{ opacity: 0, y: -10 }}
              exit={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <li>Fat loss</li>
              <li>Bulking</li>
            </motion.ul>
          )} */}
        </div>
        <div className="nav-item">
          <p>
            {auth.currentUser && (
              <img
                src={defaultpic}
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
