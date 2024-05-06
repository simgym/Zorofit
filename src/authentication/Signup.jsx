import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../index";
import { auth } from "../index";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import bodyBuilderImg from "../assets/4.jpg";
import "./Login.css";

// change the UI
// check why signIN with Google isn't working

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [uid, setUid] = useState("");
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );

      const user = userCredentials.user;
      console.log(user);
      setUid(user.uid);
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
    if (uid) {
      navigate("/");
    }
  }, [uid]);

  return (
    <>
      <main className="login-wrapper">
        {error !== null ? (
          <p className="signup_error">{displayError}</p>
        ) : undefined}

        <form onSubmit={submitHandler}>
          <h2>LOGIN</h2>
          <div className="login-input-wrapper">
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
          </div>
          <div className="auth-links-wrapper">
            {" "}
            <div className="login-buttons-wrapper">
              {" "}
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

/*
<main className="login-wrapper">
        <form onSubmit={submitHandler}>
          <h2>LOGIN</h2>
          <div className="login-input-wrapper">
            <div>
              <input
                type="email"
                value={email}
                placeholder="Email id"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="auth-links-wrapper">
            {" "}
            <div className="login-buttons-wrapper">
              {" "}
              <button type="submit" className="login-button">
                Login
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
*/
