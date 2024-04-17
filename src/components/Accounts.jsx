import { PropTypes } from "prop-types";
import "./Accounts.scss";

const Accounts = ({ title, titleCode, amount, amountDescription }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">
          {title} {titleCode}
        </h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{amountDescription}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

export default Accounts;

Accounts.propTypes = {
  amount: PropTypes.string,
  amountDescription: PropTypes.string,
  title: PropTypes.string,
  titleCode: PropTypes.string,
};
