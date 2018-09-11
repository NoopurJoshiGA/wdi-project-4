import React from 'react';
import { Link } from 'react-router-dom';

const FilterUsers = ({ users }) => {

  return(

    <div>
      {users && users.map(user =>
        <Link key={user.user._id} className="columns is-multiline is-mobile" to={`/users/${user.user._id}`}>
          <div className="card userIndex has-text-dark column">
            <img className="userIndexImage" src={user.user.profilePic} alt={user.user.firstName}/>
            <h6 className="title is-6 has-text-dark has-text-centered">{user.user.firstName} {user.user.lastName}</h6>
            <p className="has-text-dark">{user.user.type}</p>
            <p className="has-text-dark">{user.distance.toFixed(2)} away from you</p>
            <p className="has-text-dark">{user.user.description}</p>
            {/* <button className="userIndexBtn">See More</button> */}
          </div>
        </Link>
      )}
    </div>
  );
};

export default FilterUsers;
