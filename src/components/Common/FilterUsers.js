import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

const FilterUsers = ({ users }) => {

  return(

    <div className="columns container is-multiline">
      {users && users.map(user =>
        <div key={user._id} className="card userIndex has-text-dark column is-12-mobile is-5-tablet is-3-desktop">
          <Fade>
            <img className="userIndexImage" src={user.profilePic || 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png' } alt={user.firstName}/>
            <h5>{user.firstName} {user.lastName}</h5>
            <hr />
            <p className="userType has-text-dark has-text-centered">{user.type}</p>
            <p className="has-text-dark"><img className="location" src="/assets/location.svg" /> {user.distance.toFixed(2)} km away from you</p>
            <p className="has-text-dark">{user.description}</p>
            <Link to={`/users/${user._id}`}>
              <button className="userIndexBtn">See More</button>
            </Link>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default FilterUsers;
