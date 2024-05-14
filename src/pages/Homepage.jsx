import "./Homepage.css";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import { useEffect, useState } from "react";
import { auth } from "../index";

const Homepage = ({ membershipRef, scrollToSection }) => {
  console.log(scrollToSection);
  if (auth.currentUser) {
    console.log("CURRENT USER NAME IS : ", auth.currentUser.displayName);
  }
  const [image, setImage] = useState(0);
  const images = [img1, img2, img3];

  useEffect(() => {
    const timer = setTimeout(() => {
      setImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);
    return () => clearTimeout(timer);
  }, [image]);

  return (
    <>
      <main
        className={
          image === 0
            ? "home-wrapper1"
            : image === 1
            ? "home-wrapper2"
            : "home-wrapper3"
        }
      >
        <span className="home-content">
          <h3 className="home-title">Get fit & healthy.</h3>
          <p className="home-statement">Learn how to achieve your ideal body</p>
          <button
            className="home-button"
            onClick={() => scrollToSection(membershipRef)}
          >
            GET A MEMBERSHIP
          </button>
        </span>
      </main>
    </>
  );
};

export default Homepage;
