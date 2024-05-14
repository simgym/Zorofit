import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithGoogle } from "../index";
import { auth, db } from "../index";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import bodyBuilderImg from "../assets/4.jpg";
import { BiImageAdd } from "react-icons/bi";
// import { upload } from "../index";
import defaultAvatar from "../assets/default.jpg";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../index";
// import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Login.css";

// it is not working until i reload the comp or move to next comp
// same for login

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [photoURL, setPhotoURL] = useState(defaultAvatar);
  const [uid, setUid] = useState("");
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
      console.log(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      const user = userCredentials.user;
      await updateProfile(user, { displayName: signupName }); // for setting user's display name
      console.log(user);
      setUid(user.uid);
      // upload(avatar, user, setLoading); // for uploading avatar
    } catch (error) {
      console.error(error.code);
      setError(error.code);
    }
  };

  useEffect(() => {
    if (error === "auth/email-already-in-use") {
      setDisplayError("user already exists");
    } else if (error === "auth/invalid-email") {
      setDisplayError("Invalid Email");
    } else if (error === "auth/weak-password") {
      setDisplayError("Weak Password");
    } else if (error === "auth/missing-email") {
      setDisplayError("Enter email");
    }
  }, [error, auth.currentUser, uid]);

  useEffect(() => {
    const navigateHandler = async () => {
      try {
        if (uid) {
          const fileRef = ref(storage, uid + ".png");
          const snapshot = await uploadBytes(fileRef, avatar);
          const photoURL = await getDownloadURL(fileRef);
          if (photoURL) {
            navigate("/");
          }
          //------------------------for user details in firestore----------------------
          const userDocRef = doc(db, "users", "all users", "userDetails", uid);
          setDoc(userDocRef, {
            name: signupName ? signupName : auth.currentUser.displayName,
            about: "",
            uid: uid,
            gymName: "",
            trainerName: "",
            photoURL: URL.createObjectURL(avatar),
          });
          console.log("USER DATA IS SET");
        }
      } catch (error) {
        console.log(error);
      }
    };
    navigateHandler();
  }, [uid]);

  // useEffect(() => {
  //   if (auth.currentUser?.photoURL) {
  //     setPhotoURL(auth.currentUser.photoURL);
  //   }
  // }, [auth.currentUser]);

  return (
    <>
      <main className="login-wrapper">
        {error !== null ? (
          <p className="signup_error">{displayError}</p>
        ) : undefined}

        <form onSubmit={submitHandler}>
          <h2>SIGNUP</h2>
          <div className="login-input-wrapper">
            <div>
              <input
                type="text"
                value={signupName}
                placeholder="Name"
                onChange={(event) => setSignupName(event.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                value={signupEmail}
                placeholder="Email id"
                onChange={(event) => setSignupEmail(event.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                value={signupPassword}
                placeholder="Password"
                onChange={(event) => setSignupPassword(event.target.value)}
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
              <button type="submit" className="login-button">
                Signup
              </button>
              <button
                onClick={signInWithGoogle}
                type="submit"
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
          <img src={bodyBuilderImg} />
        </div>
      </main>
    </>
  );
};

export default Signup;
