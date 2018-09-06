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

  render() {
    const user = this.state.user;
    const images = this.state.images;
    let averageRating;

    console.log('user is', user);

    return(
      <section className="section">

        {user &&
          <div className="container columns is-multiline has-text-centered">

            <h3 className="title is-3">{user.firstName} {user.lastName}</h3>

            <h4 className="subtitle is-4">{user.type}</h4>

            <img src={user.profilePic} alt={user.firstName}></img>

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
            <p className="section has-background-black has-text-white">{user.description}</p>

            {/* Reviews */}
            <div className="section columns">
              {user.reviews.map(review =>

                <div key={user._id}
                  className="has-background-white">

                  <div className="column is-2">
                    <figure className="image is-64x64">
                      <img className="is-rounded" src={review.addedBy.profilePic} />
                    </figure>
                  </div>

                  <div className="column is-3">{review.addedBy.username}</div>
                  <div className="column is-3">{review.content}</div>
                </div>
              )}
            </div>

            {/* Ratings */}
            {/* // TODO: Get the average rating... use reduce? */}
            <div className="section columns has-background-black has-text-white">
              {user.ratings.map(rating =>
                <p key={rating._id}>{rating.number}</p>
              )}
            </div>

            {/* Photos / Portfolio */}
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
          </div>
        }
      </section>
    );
  }
}

export default UsersShow;
