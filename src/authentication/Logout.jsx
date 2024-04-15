import { auth } from "../index";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Signout = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    if (auth.currentUser) {
      try {
        await signOut(auth);
        console.log("user is signed out");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No user is signed in");
    }
  };
  return (
    <div className="signout">
      <p>Are you sure?</p>
      <div className="signout-buttons">
        <button onClick={logoutHandler}>logout</button>
        <button onClick={() => navigate("/")}>Continue browsing</button>
      </div>
    </div>
  );
};

export default Signout;
