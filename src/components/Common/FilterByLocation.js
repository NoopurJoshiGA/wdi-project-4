
import React from 'react';
import { Link } from 'react-router-dom';

const FilterByLocation = ({ users }) => {

  return(
    <div style={{ position: 'relative' }}>
      {users && users.filteredUsers.map(user =>
        <Link key={user._id} className="media" to={`/users/${user._id}`}>
          <div className="media-left">
            <img style={{ height: 80 }} src={user.profilePic} />
          </div>
          <div className="media-content">
            <p>{user.username}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default FilterByLocation;
