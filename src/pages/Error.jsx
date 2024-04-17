/* eslint-disable react/no-unescaped-entities */
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";

import "./Error.scss";

const Error = () => {
  return (
    <Layout>
      <>
        <h1 className="error">
          <span> Ooops....!</span>
          <span> Erreur 404</span>
          <span>la page est introuvable</span>
        </h1>
        <NavLink to="/" className="errorLink">
          Retour à la page d'accueil
        </NavLink>
      </>
    </Layout>
  );
};

export default Error;
