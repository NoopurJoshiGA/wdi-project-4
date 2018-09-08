import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

// import Map from '../common/Map';

class UsersShow extends React.Component {

  state = {

  }

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

    console.log('user is', user);

    return(
      <section className="section">

        {user &&
          <div className="container columns is-multiline has-text-centered">

            <h3 className="title is-3">{user.firstName} {user.lastName}</h3>

            <h4 className="subtitle is-4">{user.type}</h4>

            <img className="profilePic" src={user.profilePic} alt={user.firstName}></img>

            {/* Postcode */}
            <h4 className="subtitle is-4">{user.postcode}</h4>

            {/* Interests */}
            <div className="section has-background-light">
              <p>Interested in: </p>
              { user.interests.map(interest =>
                <div key={user._id} className="tag has-background-info has-text-white">{interest}</div>
              )}
            </div>

            {/* Description */}
            <p>Description</p>
            <p className="section has-background-black has-text-white">{user.description}</p>

            {/* Reviews */}
            <p>Reviews</p>
            <div className="section columns">
              {user.reviews.map(review =>

                <div key={review._id}
                  className="has-background-white">

                  <div className="column is-2">
                    <figure className="image is-64x64">
                      <img className="is-rounded" src={review.addedBy.profilePic} />
                    </figure>
                  </div>

                  <div className="column is-3">{review.addedBy.username}</div>
                  <div className="column is-3">{review.content}</div>
                  {Auth.currentUserId() === review.addedBy._id &&
                  <button onClick={this.deleteReview(review._id)} className="button is-small is-outlined is-primary">Delete</button>
                  }
                </div>
              )}

              <div>
                <form onSubmit={this.createReview}>
                  <input onChange={this.handleChange} name="review" className="input has-text-dark" value={this.state.review || ''} />
                  <button className="button is-primary is-fullwidth" type="submit">Add Review</button>
                </form>
              </div>


            </div>

            {/* Ratings */}
            {/* // TODO: Get the average rating... use reduce? */}
            <p>Ratings</p>
            <div className="section columns has-background-black has-text-white">
              {user.ratings.map(rating =>
                <p key={rating._id}>{rating.number}</p>
              )}
            </div>

            {/* Photos / Portfolio */}
            <p>Portfolio</p>
            <h3 className="title is-3">Portfolio</h3>

            <div className="columns has-background-black">
              { images.map(image =>
                <Link key={image._id} to={`/images/${image._id}`}>
                  <div className="column is-6-mobile">
                    <img key={image._id} src={image.imageUrl} />
                  </div>
                </Link>
              )}
            </div>

            <Link className="button is-primary is-rounded is-outlined" to={`/users/${user._id}/edit`}>Edit Profile</Link>

            {/* <Map /> */}
          </div>
        }
      </section>
    );
  }
}

export default UsersShow;
