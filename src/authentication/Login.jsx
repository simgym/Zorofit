import { auth } from "../index";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import bodyBuilderImg from "../assets/4.jpg";
import "./Login.css";

// Handle edge cases for error

const Login = () => {
  if (auth.currentUser) {
    console.log("user is logged in", auth.currentUser.uid);
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState(""); // use this later

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      navigate("/");
      console.log(user);
    } catch (error) {
      console.error(error.code);
      setError(error.code);
    }
  };

  useEffect(() => {
    if (error === "auth/invalid-login-credentials") {
      setDisplayError("Invalid login credentials");
    } else if (error === "auth/invalid-email") {
      setDisplayError("Invalid Email");
    }
  }, [error]);

  return (
    <>
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
              <p>Create an account</p>
              <Link to="/signup">Signup</Link>
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

export default Login;
