import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

import UserLocationMap from '../common/UserLocationMap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

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
          })
          .then(() => {
            axios
              .get(`https://api.postcodes.io/postcodes/${userData.postcode}`)
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

  // TODO: test this!
  editReview = (reviewId) => {
    console.log('into the edit review function...');
    return() => {
      console.log(`edit comment ${reviewId}`);
      const userId = this.props.match.params.id;
      // we want to update it from the db
      axios
        .put(`/api/users/${userId}/reviews/${reviewId}`)
        .then(res => this.setState({user: res.data}))
        .catch(err => console.log('Error updating', err));
    };
  }

  render() {
    const user = this.state.user;
    const images = this.state.images;
    const lat = this.state.lat;
    const lng = this.state.lng;

    console.log('user is', user);

    return(

      <section className="userShowSection">
        {user &&
          <div className="container">
            <div className="columns is-multiline is-mobile">
              <div className="column is-12-mobile is-4-tablet is-3-desktop has-text-centered">
                <Zoom>
                  <img className="profilePic" src={user.profilePic || this.state.defaultProfilePic } alt={user.firstName}></img>
                </Zoom>
              </div>
              <div className="column is-12-mobile is-4-tablet is-6-desktop has-text-left-desktop has-text-centered-mobile">
                <Zoom>
                  <h2 className="has-text-left-desktop has-text-left-tablet">{user.firstName} {user.lastName}</h2>
                  <hr />
                </Zoom>
                <Zoom>
                  <h3>{user.type}</h3>
                </Zoom>
                {/* Description */}
                { user.description &&
              <div className="userDescription">
                <div>
                  <Zoom>
                    <p className="has-text-left-desktop has-text-left-tablet">{user.description}</p>
                  </Zoom>
                  {/* Interests */}
                  { user.interests &&
                    <Zoom>
                      <div className="interests">

                        { user.interests.map(interest =>
                          <div key={user._id} className="tag">{interest || ''}</div>
                        )}
                      </div>
                    </Zoom>
                  }
                </div>
              </div>
                }
              </div>
              <div className="column is-12-mobile is-4-tablet is-3-desktop has-text-left-desktop has-text-centered">
                <Zoom>
                  <div className="socialMediaLinks">
                    { user.socialMediaLinks.map(link =>
                      <p key={link._id}>
                        <a href={link.url}>
                          <div className={link.type}></div>
                        </a>
                      </p>
                    )}
                  </div>
                </Zoom>
                <div className="envelope">
                  <a href={`mailto:${user.email}`}><FontAwesomeIcon className="envelopeIcon" icon="envelope" /></a>
                </div>
              </div>
            </div>




            {/* Portfolio */}
            { images &&
              <section className="portfolioSection">
                <h3 className="is-fullwidth has-text-dark">Portfolio</h3>
                <div className="columns is-multiline is-mobile">
                  { images.map(image =>
                    <div key={image._id} className="column is-6-mobile is-3-desktop is-4-tablet">
                      <Link to={`/images/${image._id}`}>
                        <Fade>
                          <img className="portfolioImage" src={image.imageUrl || ''} />
                        </Fade>
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            }

            <div className="columns is-multiline is-mobile">
              {/* Reviews */}
              <div className="column is-12-mobile is-half-tablet is-half-desktop reviewsSection">
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
                    <div>
                      <button onClick={this.deleteReview(review._id)} className="button is-small is-outlined is-primary">Delete</button>
                      <button onClick={this.editReview(review._id)} className="button is-small is-outlined is-primary">Edit</button>
                    </div>
                    }
                  </div>
                )}

                <div>
                  <form onSubmit={this.createReview}>
                    <input onChange={this.handleChange} name="review" className="input has-text-white" value={this.state.review || ''} />
                    <button className="button" type="submit">Add Review</button>
                  </form>
                </div>
              </div>

              <div className="column is-12-mobile is-half-tablet is-half-desktop">
                <UserLocationMap user={user} userLat={lat} userLng={lng} />
              </div>
            </div>

            {Auth.currentUserId() === this.props.match.params.id  &&
            <Link className="button" to={`/users/${user._id}/edit`}>Edit Profile</Link>
            }


          </div>
        }
      </section>
    );
  }
}

export default UsersShow;
