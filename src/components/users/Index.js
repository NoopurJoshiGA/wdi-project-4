import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UsersIndex extends React.Component {

  state = {}

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
              <h1 className="title">
                DISCOVER
              </h1>
            </div>
          </div>
        </section>

        { users && users.map(user =>
          <Link key={user._id} to={`/users/${user._id}`}
            className="columns card is-multiline">
            <div className="column is-3">
              <img className="image" src={user.profilePic} alt={user.firstName}/>
              <h3 className="title is-3">{user.firstName} {user.lastName}</h3>
              <h4 className="title is-4">{user.type}</h4>
              <h4 className="title is-4">{user.postcode}</h4>
            </div>
          </Link>
        )}
      </section>
    );
  }
}
export default UsersIndex;
