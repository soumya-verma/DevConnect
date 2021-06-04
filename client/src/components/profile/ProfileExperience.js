import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = (props) => {
  const {
    experience: { company, title, location, current, to, from, description },
  } = props;
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="MMM/YYYY">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="MMM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
