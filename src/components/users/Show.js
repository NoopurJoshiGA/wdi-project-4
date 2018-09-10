import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

import UserLocationMap from '../common/UserLocationMap';

class UsersShow extends React.Component {

  state = {
    defaultProfilePic: 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png'
  }

  componentDidMount() {

    let userData = {};
    let imageData = {};
    let userLocationData = {};

    axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        userData = res.data;
        console.log('userData is', userData);
      })
      .then(() => {
        axios
          .get('/api/images')
          .then(res => {
            console.log('res is', res);
            const images = res.data;
            console.log('imageData is', imageData);
            imageData = images.filter(image => image.uploadedBy === userData._id);
            console.log('imageData is now', imageData);
            // this.setState({ images: imageData, user: userData });
          })
          .then(() => {
            axios
              .get(`http://api.postcodes.io/postcodes/${userData.postcode}`)
              .then(res => {
                userLocationData = res.data;
                // console.log('this.state.user.password', this.state.user.postcode);
                this.setState({ user: userData, images: imageData, userLocationData: userLocationData, lat: userLocationData.result.latitude, lng: userLocationData.result.longitude });
                console.log('lat and long are', userLocationData.result.latitude, userLocationData.result.longitude);
              });
          });
      });
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  createReview = (event) => {
    console.log('event is', event);
    event.preventDefault();
    const userId = this.props.match.params.id;
    // Building the data to send to the db
    const reviewData = {
      addedBy: Auth.currentUserId(),
      content: this.state.review
    };
    axios
      .post(`/api/users/${userId}/reviews`, reviewData)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log('Error =>', err));
  }

  deleteReview = (reviewId) => {
    console.log();
    return() => {
      console.log(`Delete comment ${reviewId}`);
      const userId = this.props.match.params.id;
      // we want to delete it from the db
      axios
        .delete(`/api/users/${userId}/reviews/${reviewId}`)
        .then(res => this.setState({user: res.data}))
        .catch(err => console.log('Error deleting', err));
    };
  }

  render() {
    const user = this.state.user;
    const images = this.state.images;
    const lat = this.state.lat;
    const lng = this.state.lng;

    console.log('user is', user);

    return(
      <section className="section">

        {user &&
          <div className="container columns is-multiline has-text-centered">

            <img className="profilePic" src={user.profilePic || this.state.defaultProfilePic } alt={user.firstName}></img>

            <h2>{user.firstName} {user.lastName}</h2>
            <h3>{user.type}</h3>

            {/* Postcode */}
            <h3>{user.postcode}</h3>

            {/* Interests */}
            <div className="section">
              <h3>Interests</h3>
              { user.interests.map(interest =>
                <div key={user._id} className="tag has-background-primary has-text-white">{interest || ''}</div>
              )}
            </div>

            {/* Description */}
            <h3>Description</h3>
            <p className="">{user.description}</p>


            {/* Ratings */}
            {/* // TODO: Get the average rating... use reduce? */}
            {/* <div className="section">
              <h3>Ratings</h3>
              <div className="section columns has-text-white">
                {user.ratings.map(rating =>
                  <p key={rating._id}>{rating.number}</p>
                )}
              </div>
            </div> */}

            {/* Portfolio */}
            <section className="portfolioSection">
              <h3 className="is-fullwidth has-text-dark">Portfolio</h3>

              <div className="columns is-multiline is-mobile has-background-white">
                { images.map(image =>
                  <div key={image._id} className="column is-6">
                    <Link to={`/images/${image._id}`}>
                      <img className="portfolioImage" src={image.imageUrl || ''} />
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Reviews */}
            <div className="section">
              <h3>Reviews</h3>
              {user.reviews.map(review =>

                <div key={review._id}
                  className="userReviews columns is-multiline is-mobile">
                  <div className="column is-4">
                    <figure className="image is-64x64">
                      <img className="is-rounded" src={review.addedBy.profilePic || this.state.defaultProfilePic} />
                    </figure>
                  </div>

                  <div><p>{review.addedBy.username}</p></div>
                  <p>{review.content}</p>
                  {Auth.currentUserId() === review.addedBy._id &&
                    <button onClick={this.deleteReview(review._id)} className="button is-small is-outlined is-primary">Delete</button>
                  }
                </div>
              )}

              <div>
                <form onSubmit={this.createReview}>
                  <input onChange={this.handleChange} name="review" className="input has-text-white" value={this.state.review || ''} />
                  <button className="button is-primary is-fullwidth" type="submit">Add Review</button>
                </form>
              </div>
            </div>

            {Auth.currentUserId() === this.props.match.params.id  &&
            <Link className="button is-primary is-rounded is-outlined" to={`/users/${user._id}/edit`}>Edit Profile</Link>
            }

            <UserLocationMap user={user} userLat={lat} userLng={lng}
            />

          </div>
        }
      </section>
    );
  }
}

export default UsersShow;
