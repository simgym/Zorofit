import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../index";
import { auth } from "../index";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
          <span>
            <input
              type="email"
              value={signupEmail}
              placeholder="Email id"
              onChange={(event) => setSignupEmail(event.target.value)}
            />
          </span>
          <span>
            <input
              type="password"
              value={signupPassword}
              placeholder="Password"
              onChange={(event) => setSignupPassword(event.target.value)}
            />
          </span>
          <button type="submit">Signup</button>
          <button onClick={signInWithGoogle} typ="submit">
            Sign in with google
          </button>
          <div className="not_user">
            <p>Already a user? </p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default Signup;
