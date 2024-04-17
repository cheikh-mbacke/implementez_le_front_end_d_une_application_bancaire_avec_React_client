import "./Features.scss";
import { PropTypes } from "prop-types";

const Features = ({ imageUrl, title, text }) => {
  return (
    <>
      <div className="feature-item">
        <img src={imageUrl} alt="Chat Icon" className="feature-icon" />
        <h3 className="feature-item-title">{title}</h3>
        <p>{text}</p>
      </div>
    </>
  );
};

export default Features;

Features.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};
