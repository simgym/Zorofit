import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = (props) => {
  // console.log("scrollToSection prop in RootLayout:", props.scrollToSection);

  return (
    <>
      <span className="top_most_part">
        <MainNavigation
          scrollToSection={props.scrollToSection}
          homeRef={props.homeRef}
          programRef={props.programRef}
        />
      </span>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
