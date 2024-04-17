import axios from "axios";
import {
  addFirstName,
  addLastName,
  addMessage,
  addToken,
  clearStore,
} from "../redux";

//obtention du token
function login(credentials, dispatch, navigate) {
  axios
    .post(`https://implementez-le-front-end-d-une.onrender.com/api/v1/user/login`, credentials)
    .then(function (res) {
      dispatch(addToken(res.data.body.token));
      navigate("/user");
      localStorage.token = res.data.body.token;
    })
    .catch((error) => {
      console.log(error);
      dispatch(addMessage(error.response.data.message));
    });
}

// obtention des infos de l'utilisateur
function getUser(token, dispatch, navigate) {
  axios
    .post(`https://implementez-le-front-end-d-une.onrender.com/api/v1/user/profile`, "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      dispatch(addFirstName(res.data.body.firstName));
      dispatch(addLastName(res.data.body.lastName));
      localStorage.firstName = res.data.body.firstName;
    })
    .catch((error) => {
      console.log(error);
      navigate("/");
      dispatch(clearStore());
    });
}
// obtention des infos de l'utilisateur
let putUser = (token, dispatch, credentials) => {
  axios
    .put(`https://implementez-le-front-end-d-une.onrender.com/api/v1/user/profile`, credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      console.log(res.data);
      dispatch(addFirstName(res.data.body.firstName));
      dispatch(addLastName(res.data.body.lastName));
    })
    .catch((error) => console.log(error));
};

//déconnection de l'utilisateur localStorage vidé et store vidé
let logout = (dispatch) => {
  localStorage.removeItem("firstName");
  localStorage.token = "null";
  dispatch(clearStore());
};

export { login, logout, getUser, putUser };
