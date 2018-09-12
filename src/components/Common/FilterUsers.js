import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

const FilterUsers = ({ users }) => {

  return(

    <div>
      {users && users.map(user =>
        <Fade key={user._id}>
          <Link key={user._id} className="columns is-multiline is-mobile" to={`/users/${user._id}`}>
            <div className="card userIndex has-text-dark column">
              <img className="userIndexImage" src={user.profilePic || 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png' } alt={user.firstName}/>
              <h6 className="title is-6 has-text-dark has-text-centered">{user.firstName} {user.lastName}</h6>
              <p className="has-text-dark">{user.type}</p>
              <p className="has-text-dark">{user.distance.toFixed(2)} km away from you</p>
              <p className="has-text-dark">{user.description}</p>
              {/* <button className="userIndexBtn">See More</button> */}
            </div>
          </Link>
        </Fade>
      )}
    </div>
  );
};

export default FilterUsers;
