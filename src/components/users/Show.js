import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UsersShow extends React.Component {

  state = {}

  componentDidMount() {

    let userData = {};

    axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        userData = res.data;
        console.log('userData is', userData);
      })
      .then(() => {
        axios.get('/api/images')
          .then(res => {
            this.setState({ images: res.data, user: userData });
            console.log('images are', res.data, 'user is', userData);
          });
      });
  }

  render() {
    const user = this.state.user;
    console.log('user is', user);

    return(
      <section className="section">
        {user &&
          <div className="container columns is-multiline has-text-centered">
            <h3 className="title is-3">{user.firstName} {user.lastName}</h3>
            <h4 className="subtitle is-4">{user.type}</h4>
            <img src={user.profilePic} alt={user.firstName}></img>
            <h4 className="subtitle is-4">{user.postcode}</h4>
            <p>Interested in: </p>{ user.interests.map(interest =>
              <div className="tag has-background-light">{interest}</div>
            )}
            <p>{user.description}</p>
            {user.reviews.map(review =>
              <div className="card has-background-info">"{review.reviewAddedBy}{review.content})"</div>)}
            {/* TODO: add the user who has commented */}
            {user.ratings.map(rating => <div className="card">Rating: {rating.number} {rating.ratingBy}</div>)}
            {/* TODO: add the user who has provided a rating */}

            <Link className="button is-primary is-rounded is-outlined" to={`/users/${user._id}/edit`}>Edit Profile</Link>
          </div>
        }
      </section>
    );
  }
}

export default UsersShow;
