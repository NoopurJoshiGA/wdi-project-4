import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UsersIndex extends React.Component {

  state = {

  }

  componentDidMount() { // Sets all users onto the state
    console.log('Index component mounted...');
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }));
  }

  render() {
    const users = this.state.users;
    const images = this.state.images;

    console.log('users are', users);
    console.log('images are', images);
    return(

      <section>
        <section className="hero discover is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">DISCOVER</h1>
            </div>
          </div>
        </section>


        { users && users.map(user =>
          <Link key={user._id} to={`/users/${user._id}`}
            className="columns card is-multiline">
            <div className="userIndex column is-3">
              <img className="userIndexImage image" src={user.profilePic} alt={user.firstName}/>
              <h6 className="title is-6 has-text-white has-text-centered">{user.firstName} {user.lastName}</h6>
              <p className="has-text-white">{user.type}</p>
              <p className="has-text-white">{user.postcode}</p>
              <p className="has-text-white">{user.description}</p>
            </div>
          </Link>
        )}
      </section>
    );
  }
}
export default UsersIndex;
