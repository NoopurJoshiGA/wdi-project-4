import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class ImagesShow extends React.Component {

  state = {
    showDeleteCommentButton: false,
    // clicks: 0
    isLiked: true,
    defaultProfilePic: 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png',
    active: false // modal form
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
    axios.put(`/api/images/${imageId}`, this.state, Auth.bearerHeader())
      .then(res => this.setState({image: res.data, isLiked: isLiked}))
      .catch(err => console.log('Error adding like', err));
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    console.log('the modal is open', this.currentState);
  }

  render() {

    const image = this.state.image;

    console.log('image is', image);

    return(

      <section className="section">

        {image &&
          <div className="container columns is-multiline has-text-centered">

            <div className="section">
              <Link className="button is-outlined has-background-light is-rounded" to={`/users/${image.uploadedBy._id}`}>Back to user</Link>
            </div>

            <img src={image.imageUrl} className="image" />

            <div className="columns is-mobile">
              <div className="column is-3">
                <img src={image.uploadedBy.profilePic} className="userProfilePic" />
              </div>
              <div className="column">
                <p className="has-text-left">{image.uploadedBy.username || this.state.defaultProfilePic }</p>
              </div>
            </div>

            <div className="section">
              <div onClick={ this.state.isLiked ? this.IncrementItem : this.DecrementItem }
                className={ this.state.isLiked ? 'isDisliked' : 'isLiked' }>LIKE</div>
              <p>Likes: {image.likes}</p>
            </div>

            <div className="section has-text-white has-background-black">
              <p>Caption: {image.caption}</p>
            </div>

            <div className="section">
              <h3>Tags</h3>
              { image.tags.toString().split(',').map(tag =>
                <div key={image._id} className="tag has-background-primary has-text-white">{tag}</div>
              )}
            </div>

            <div>
              { image.comments.map(comment =>

                <div key={comment._id}
                  className="userComments columns is-multiline is-mobile">
                  {/* onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut} */}
                  {/* <div>
                    {this.state.showDeleteCommentButton &&
                  }
                </div> */}
                  <div className="column is-4">
                    <figure className="image is-64x64">
                      <img className="is-rounded" src={comment.commentedBy.profilePic || this.state.defaultProfilePic} />
                    </figure>
                  </div>

                  <p>{comment.commentedBy && comment.commentedBy.username}</p>
                  <p>{comment.content}</p>

                  {Auth.currentUserId() === comment.commentedBy._id &&
                  <button onClick={this.deleteComment(comment._id)} className="button is-small is-outlined is-primary">Delete</button>
                  }
                  {/* <button onClick={this.showEditComment(comment._id)} className="button is-small is-outlined is-primary">Edit</button> */}
                </div>
              )}
            </div>

            <div>
              <form onSubmit={this.createComment}>
                <input onChange={this.handleChange} name="comment" className="input" value={this.state.comment || ''} />
                <button className="button is-primary is-fullwidth" type="submit">Add comment</button>
              </form>
            </div>

            {Auth.currentUserId() === image.uploadedBy._id &&
              <div>
                <Link className="button is-fullwidth is-primary is-rounded is-outlined" to={`/images/${image._id}/edit`}>Edit Image</Link>
                <button className="button is-fullwidth is-primary is-rounded is-outlined" onClick={this.toggleClass}>Delete Image</button>
              </div>
            }

            <div className={`${this.state.active ? 'is-active': null} modal `}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <section className="modal-card-body">
                  <h5 className="title is-5">Are you sure you want to delete this image?</h5>
                </section>
                <footer className="modal-card-foot">
                  <button onClick={this.deleteImage} className="button is-warning">Yes</button>
                  <button onClick={this.toggleClass} className="button">Cancel</button>
                </footer>
              </div>
            </div>

          </div>
        }
      </section>
    );
  }
}

export default ImagesShow;
