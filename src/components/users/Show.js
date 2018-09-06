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
            console.log('res is', res);
            const images = res.data;
            console.log('imageData is', imageData);
            const imageData = images.filter(image => image.uploadedBy === userData._id);
            console.log('imageData is now', imageData);
            this.setState({ images: imageData, user: userData });
          });
      });
  }

  findImagesByUser = (user) => {
    this.state.images.map(image => {
      if(image.uploadedBy.username === user.username) {
        console.log('found a match...');
      }
    });
  }

  render() {
    const user = this.state.user;
    const images = this.state.images;

    console.log('user is', user);

    return(
      <section className="section">

        {user &&
          <div className="container columns is-multiline has-text-centered">
            <h3 className="title is-3">{user.firstName} {user.lastName}</h3>
            <h4 className="subtitle is-4">{user.type}</h4>
            <img src={user.profilePic} alt={user.firstName}></img>
            <h4 className="subtitle is-4">{user.postcode}</h4>
            <p>Interested in: </p>
            { user.interests.map(interest =>
              <div key={user._id} className="tag has-background-light">{interest}</div>
            )}

            {/* Description */}
            <p>{user.description}</p>

            {/* Reviews */}
            {user.reviews.map(review =>
              <div key={user._id}
                className="card has-background-info">
                {review.reviewAddedBy}{review.content})
              </div>
            )}

            {/* TODO: add the user who has commented */}

            {/* Ratings */}
            {user.ratings.map(rating => <div key={user._id} className="card">Rating: {rating.number} {rating.ratingBy}</div>)}
            {/* TODO: add the user who has provided a rating */}

            {/* Photos / Portfolio */}
            <h3 className="title is-3">Photos</h3>

            {images.map(image => <img key={image._id} src={image.imageUrl} />
            )}

            <Link className="button is-primary is-rounded is-outlined" to={`/users/${user._id}/edit`}>Edit Profile</Link>
          </div>
        }
      </section>
    );
  }
}

export default UsersShow;
