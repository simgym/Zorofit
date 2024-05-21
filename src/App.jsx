import "./App.css";
import Logo from "./components/Logo";
import Homepage from "./pages/Homepage";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./authentication/Login";
import RootLayout from "./pages/Root";
import Errorpage from "./pages/Errorpage";
import Exercises from "./pages/Exercises";
import Programs from "./components/Programs";
import MembershipPlans from "./components/MembershipPlans";
import Services from "./components/Services";
import Signout from "./authentication/Logout";
import Signup from "./authentication/Signup";
import UserProfile from "./pages/UserProfile";
import Diet from "./pages/Diet";
import About from "./pages/About";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  // let it = 0;
  // console.log(it + 1);
  const homeRef = useRef(null);
  const programRef = useRef(null);
  const membershipRef = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          homeRef={homeRef}
          programRef={programRef}
          scrollToSection={scrollToSection}
        />
      ),
      errorElement: <Errorpage />,
      children: [
        {
          index: true,
          element: (
            <>
              <section id="home" ref={homeRef}>
                <Homepage
                  membershipRef={membershipRef}
                  scrollToSection={scrollToSection}
                />
              </section>
              <section id="program" ref={programRef}>
                <Programs />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="membership" ref={membershipRef}>
                <MembershipPlans />
              </section>
            </>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/exercise/:type", element: <Exercises /> },
        { path: "/signout", element: <Signout /> },
        { path: "/signup", element: <Signup /> },
        { path: "/myprofile/:userid", element: <UserProfile /> },
        { path: "/about/:userid", element: <About /> },
        { path: "/diet", element: <Diet /> },
      ],
    },
  ]);

  const [showComp, setShowComp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComp(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Logo />

      {showComp && (
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <SkeletonTheme baseColor="#313131" highlightColor="#525252">
              {" "}
              <RouterProvider router={router} />
            </SkeletonTheme>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default App;
