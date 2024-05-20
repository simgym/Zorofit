import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithGoogle } from "../index";
import { auth, db } from "../index";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import bodyBuilderImg from "../assets/4.jpg";
import { BiImageAdd } from "react-icons/bi";
import defaultAvatar from "../assets/default.jpg";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../index";
import { doc, setDoc } from "firebase/firestore";
import "./Login.css";

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [photoURL, setPhotoURL] = useState(defaultAvatar);
  const [userPhotoUrl, setUserPhotoUrl] = useState("");
  const [uid, setUid] = useState("");
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      const user = userCredentials.user;
      setUid(user.uid);

      // upload avatar, get url
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, avatar);
        const avatarUrl = await getDownloadURL(avatarRef);
        setUserPhotoUrl(avatarUrl);

        // update user profile with displayName, photoURL
        await updateProfile(user, {
          displayName: signupName,
          photoURL: avatarUrl,
        });
      } else {
        await updateProfile(user, {
          displayName: signupName,
        });
      }

      //------------------------for user details in firestore----------------------
      const userDocRef = doc(db, "users", "all users", "userDetails", uid);
      setDoc(userDocRef, {
        name: signupName ? signupName : auth.currentUser.displayName,
        about: "",
        uid: uid,
        gymName: "",
        trainerName: "",
      });
      console.log("USER DATA IS SET");

      navigate("/");
    } catch (error) {
      console.error(error.code);
      setError(error.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      if (error === "auth/email-already-in-use") {
        setDisplayError("User already exists");
      } else if (error === "auth/invalid-email") {
        setDisplayError("Invalid Email");
      } else if (error === "auth/weak-password") {
        setDisplayError("Weak Password");
      } else if (error === "auth/missing-email") {
        setDisplayError("Enter email");
      }
    }
  }, [error]);

  return (
    <main className="login-wrapper">
      {error && <p className="signup_error">{displayError}</p>}
      <form onSubmit={submitHandler}>
        <h2>SIGNUP</h2>
        <div className="login-input-wrapper">
          <div>
            <input
              type="text"
              value={signupName}
              placeholder="Name"
              onChange={(e) => setSignupName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              value={signupEmail}
              placeholder="Email id"
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              value={signupPassword}
              placeholder="Password"
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>
          <div className="signup-avatar-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="avatar-input"
              style={{ border: "none" }}
            />
            <div className="avatar-img-container">
              <img src={photoURL} alt="Avatar" className="avatar" />
            </div>
          </div>
        </div>
        <div className="auth-links-wrapper">
          <div className="login-buttons-wrapper">
            <button type="submit" className="login-button" disabled={loading}>
              Signup
            </button>
            <button
              onClick={signInWithGoogle}
              type="button"
              className="google-login-button"
            >
              <FcGoogle />
            </button>
          </div>
          <div className="create_account">
            <p>Already a user? </p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
      <div className="login-builder-wrapper">
        <img src={bodyBuilderImg} alt="Body Builder" />
      </div>
    </main>
  );
};

export default Signup;
