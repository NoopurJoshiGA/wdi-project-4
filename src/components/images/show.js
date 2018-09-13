import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Fade from 'react-reveal/Fade';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ImagesShow extends React.Component {

  state = {
    showDeleteCommentButton: false,
    // clicks: 0
    isLiked: true,
    defaultProfilePic: 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png',
    active: false, // modal form
    imageModalActive: false // image modal form
  }

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ image: res.data});
        console.log('this.state.image', this.state.image.tags.toString().split(','));
      });
  }

  createComment = (event) => {
    console.log('event is', event);
    event.preventDefault();
    const imageId = this.props.match.params.id;
    // Building the data to send to the db
    const commentData = {
      commentedBy: Auth.currentUserId(),
      content: this.state.comment
    };
    axios
      .post(`/api/images/${imageId}/comments`, commentData)
      .then(res => this.setState({ image: res.data }))
      .catch(err => console.log('Error =>', err));
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  deleteComment = (commentId) => {
    console.log();
    return() => {
      console.log(`Delete comment ${commentId}`);
      const imageId = this.props.match.params.id;
      // we want to delete it from the db
      axios
        .delete(`/api/images/${imageId}/comments/${commentId}`)
        .then(res => this.setState({image: res.data}))
        .catch(err => console.log('Error deleting', err));
    };
  }

  deleteImage = () => {
    console.log('deleting image...');
    axios.delete(`/api/images/${this.props.match.params.id}`, Auth.bearerHeader())
      .then(() => this.props.history.push(`/users/${Auth.currentUserId()}`));
  }

  IncrementItem = (event) => {
    event.preventDefault();
    const imageId = this.props.match.params.id;
    const image = this.state.image;
    image.likes++;
    const isLiked = !this.state.isLiked;
    console.log('likes', image.likes, isLiked);
    axios.put(`/api/images/${imageId}`, image, Auth.bearerHeader())
      .then(res => this.setState({image: res.data, isLiked: isLiked}))
      .catch(err => console.log('Error adding like', err));
  }

  DecrementItem = (event) => {
    event.preventDefault();
    const imageId = this.props.match.params.id;
    const image = this.state.image;
    image.likes--;
    const isLiked = !this.state.isLiked;
    console.log('likes', image.likes, isLiked);
    axios.put(`/api/images/${imageId}`, image, Auth.bearerHeader())
      .then(res => this.setState({image: res.data, isLiked: isLiked}))
      .catch(err => console.log('Error adding like', err));
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    console.log('the modal is open', this.currentState);
  }

  toggleImageClass = () => {
    const currentState = this.state.imageModalActive;
    this.setState({ imageModalActive: !currentState });
    console.log('the modal is open', this.currentState);
  }

  render() {

    const image = this.state.image;

    // console.log('image is', image);

    return(

      <section className="showImageSection">

        {image &&
          <div className="container">

            <Link className="button" to={`/users/${image.uploadedBy._id}`}>Back to user</Link>


            <div className="columns is-multiline has-text-centered">
              <Fade>
                <div className="column has-text-left has-background-warning is-6-desktop is-6-tablet">
                  <img onClick={this.toggleImageClass} src={image.imageUrl} className="image" />
                  <div className="columns userImageUpload is-multiline">
                    <div className="column is-3 has-text-centered">
                      <img src={image.uploadedBy.profilePic || this.state.defaultProfilePic} className="userProfilePic" />
                    </div>
                    <div className="column is-9">
                      <h6 className="has-text-left">{image.uploadedBy.username ||'' }</h6>
                      <p>{image.caption}</p>
                      { image.tags && image.tags.toString().split(',').map(tag =>
                        <div key={image._id} className="tag">{tag}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="column has-text-centered has-background-info is-6-desktop is-6-tablet">

                  <FontAwesomeIcon onClick={ this.state.isLiked ? this.IncrementItem : this.DecrementItem }
                    className={ this.state.isLiked ? 'isDisliked' : 'isLiked' } icon="heart" />
                  <p className="has-text-centered">({image.likes})</p>

                  <h3>Comments</h3>
                  { image.comments.map(comment =>
                    <div key={comment._id}
                      className="userComments columns is-multiline is-mobile">
                      <div className="column is-3">
                        <img className="profilePicCommentReview" src={comment.commentedBy.profilePic || this.state.defaultProfilePic} />
                      </div>
                      <div className="column is-7">
                        <h6 className="has-text-left">{comment.commentedBy.username}</h6>
                        <p>{comment.content}</p>
                      </div>
                      <div className="column is-2 has-text-centered">
                        {Auth.currentUserId() === comment.commentedBy._id &&
                            <div onClick={this.deleteComment(comment._id)} className="deleteCommentReview"></div>
                        }
                      </div>
                    </div>
                  )}

                  <form className="commentForm" onSubmit={this.createComment}>
                    <input onChange={this.handleChange} placeholder="Write a comment..." type="textarea" name="comment" className="input has-text-white" value={this.state.comment || ''} />
                    <button className="button" type="submit">Add comment</button>
                  </form>

                  {Auth.currentUserId() === image.uploadedBy._id &&
                      <div>
                        <Link className="button" to={`/images/${image._id}/edit`}>Edit Image</Link>
                        <button className="deleteImageButton" onClick={this.toggleClass}>Delete Image</button>
                      </div>
                  }
                </div>
              </Fade>

              <div className="modals">
                <div className={`${this.state.active ? 'is-active': null} modal `}>
                  <div className="modal-background"></div>
                  <div className="modal-card">
                    <section className="modal-card-body">
                      <h5 className="title is-5">Are you sure you want to delete this image?</h5>
                    </section>
                    <footer className="modal-card-foot">
                      <button onClick={this.deleteImage} className="modalButton">Yes</button>
                      <button onClick={this.toggleClass} className="modalButton">Cancel</button>
                    </footer>
                  </div>
                </div>


                <div className={`${this.state.imageModalActive ? 'is-active': null} modal is-hidden-mobile `}>
                  <div className="modal-background"></div>
                  <div className="modal-content">
                    {/* <p class="image is-4by3"> */}
                    <img src={this.state.image.imageUrl} alt="" />
                    {/* </p> */}
                  </div>
                  <button onClick={this.toggleImageClass} className="modal-close is-large" aria-label="close"></button>
                </div>
              </div>

            </div>
          </div>
        }
      </section>
    );
  }
}

export default ImagesShow;
