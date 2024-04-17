import "./Login.scss";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../services/exchangeApi";
import { clearMessage } from "../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleUser);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // gestion de l'affichage du message erreur en fonction de la réponse de l'api
  const message = useSelector((state) => state.api.messageError);
  // loading pour attendre la réponse de l'api
  const [isLoading, setIsLoading] = useState(false);
  // état du "rememberMe" coché ou pas
  const [checked, setChecked] = useState(false);
  // gestion des identifiants
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // gestion de la validité des inputs via les regex
  const [validInput, setValidInput] = useState({
    email: false,
    password: false,
  });
  // gestion de l'affichage du message d'erreur en fontion de la saisie utilisateur
  const [error, setError] = useState(null);

  // checkbox
  const onClick = () => {
    setChecked(!checked);
  };

  // Inputs
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setValidInput({
      ...validInput,
      [e.target.name]: e.target.validity.valid,
    });
    if (message !== null) {
      dispatch(clearMessage());
    }
    setIsLoading(false);
    setError(null);
  };

  // gestion du submit
  const handleClick = (e) => {
    e.preventDefault();
    if (validInput.email && validInput.password) {
      setIsLoading(true);
      login(credentials, dispatch, navigate, checked);
    } else {
      setError("visible");
    }
  };

  return (
    <Layout>
      <section className="sign-in-content">
        {message === null && isLoading && <Loader />}
        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              name="email"
              title="Please enter a valid email address"
              pattern="^[a-z0-9_\-]+@[a-z0-9\-]+\.[a-z]{2,}"
              onChange={onChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              name="password"
              minLength="10"
              title="Please enter a password with 10 characters and without (>,/,<,:,;,?,',`,&,|)"
              pattern="^[^>\/<:;?'`&\|]\w{10,}?"
              onChange={onChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" onClick={onClick} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" onClick={handleClick}>
            Sign In
          </button>
          {message && <span>Username or password not found</span>}
          {error && <span>Username or password invalid</span>}
        </form>
      </section>
    </Layout>
  );
};

export default Login;
