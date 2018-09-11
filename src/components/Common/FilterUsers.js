import React from 'react';
import { Link } from 'react-router-dom';

const FilterUsers = ({ users }) => {

  return(

    <div>
      {users && users.map(user =>
        <Link key={user._id} className="columns is-multiline is-mobile" to={`/users/${user._id}`}>
          <div className="card userIndex has-text-dark column">
            <img className="userIndexImage" src={user.profilePic || 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png' } alt={user.firstName}/>


            <div className='carousel carousel-animated carousel-animate-slide'>
    <div className='carousel-container'>
      <div className='carousel-item has-background is-active'>
        <img className="is-background" src="https://wikiki.github.io/images/merry-christmas.jpg" alt="" width="640" height="310" />
        <div className="title">Merry Christmas</div>
      </div>
      <div className='carousel-item has-background'>
        <img className="is-background" src="https://wikiki.github.io/images/singer.jpg" alt="" width="640" height="310" />
        <div className="title">Original Gift: Offer a song with <a href="https://lasongbox.com" target="_blank">La Song Box</a></div>
      </div>
      <div className='carousel-item has-background'>
        <img className="is-background" src="https://wikiki.github.io/images/sushi.jpg" alt="" width="640" height="310" />
        <div className="title">Sushi time</div>
      </div>
      <div className='carousel-item has-background'>
        <img className="is-background" src="https://wikiki.github.io/images/life.jpg" alt="" width="640" height="310" />
        <div className="title">Life</div>
      </div>
    </div>
    <div className="carousel-navigation is-overlay">
      <div className="carousel-nav-left">
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </div>
      <div className="carousel-nav-right">
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </div>
    </div>
  </div>



            <h6 className="title is-6 has-text-dark has-text-centered">{user.firstName} {user.lastName}</h6>
            <p className="has-text-dark">{user.type}</p>
            <p className="has-text-dark">{user.distance.toFixed(2)} km away from you</p>
            <p className="has-text-dark">{user.description}</p>
            {/* <button className="userIndexBtn">See More</button> */}
          </div>
        </Link>
      )}
    </div>
  );
};

export default FilterUsers;
