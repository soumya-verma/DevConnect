import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = (props) => {
  const {
    education: { school, degree, fieldofstudy, current, to, from, description },
  } = props;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="MMM/YYYY">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="MMM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
