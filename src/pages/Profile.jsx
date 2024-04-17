import "./Profile.scss";
import Data from "../assets/accounts.json";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Accounts from "../components/Accounts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getUser, putUser } from "../services/exchangeApi";

const Profile = () => {
  const datas = { Data };
  const token = useSelector((state) => state.user.token) || localStorage.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const [hide, SetHide] = useState(false);
  const [credentials, setCredentials] = useState({
    firstName: firstName,
    lastName: lastName,
  });
  // gestion de la validité des inputs via les regex
  const [validInput, setValidInput] = useState({
    firstName: false,
    lastName: false,
  });

  if (firstName === null) {
    getUser(token, dispatch, navigate);
  }
  //button cancel
  const changeDOM = (e) => {
    e.preventDefault();
    SetHide(!hide);
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setValidInput({
      ...validInput,
      [e.target.name]: e.target.validity.valid,
    });
  };

  const updateChange = (e) => {
    e.preventDefault();
    if (validInput.firstName || validInput.lastName) {
      putUser(token, dispatch, credentials);
      SetHide(!hide);
    }
  };

  return (
    <>
      {token === null ? (
        navigate("/")
      ) : firstName === null ? (
        <Loader />
      ) : (
        <Layout>
          <div className={`header ${hide ? "invisible" : "visible"}`}>
            <h1>
              Welcome back
              <br />
              {firstName} {lastName} !
            </h1>
            <button className="edit-button" onClick={changeDOM}>
              Edit Name
            </button>
          </div>
          <div className={`headerEdit ${hide ? "visible" : "invisible"}`}>
            <h1>Welcome back</h1>
            <form onSubmit={updateChange}>
              <div className="input-info">
                <label htmlFor="firstName">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={firstName}
                    minLength={3}
                    maxLength={40}
                    title="Numbers and symbols are not allowed"
                    pattern="^[^>\/<:;?'`&\|]([A-Za-zÀ-ÿœ]{2,40})"
                    onChange={onChange}
                  />
                </label>
                <label htmlFor="lastName">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    minLength={2}
                    maxLength={30}
                    pattern="^[^>\/<:;?'`&\|]([a-zA-ZÀ-ÿœ]{2,30})"
                    title="Numbers and symbols are not allowed"
                    placeholder={lastName}
                    onChange={onChange}
                  />
                </label>
              </div>
              <div className="button-info">
                <button type="submit" className="button-choice">
                  Save
                </button>
                <button className="button-choice" onClick={changeDOM}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <h2 className="sr-only">Accounts</h2>
          {datas.Data?.map((data) => (
            <Accounts
              key={data.accountId}
              title={data.title}
              titleCode={data.titleCode}
              amount={data.amount}
              amountDescription={data.amountDescription}
            />
          ))}
        </Layout>
      )}
    </>
  );
};

export default Profile;
