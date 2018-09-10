import React from 'react';
import { Link } from 'react-router-dom';

const FilterBySearch = ({ users }) => {

  // for test remove afterwards
  const parentStyle = {
    zIndex: '100',
    position: 'absolute',
    maxHeight: 500,
    overflow: 'scroll',
    width: '100%',
    height: 400,
    color: 'white',
    backgroundColor: 'aliceblue'
  };

  return(
    <div style={{ position: 'relative' }}>
      <div style={ parentStyle }>
        {users && users.map(user =>
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
    </div>
  );
};

export default FilterBySearch;
