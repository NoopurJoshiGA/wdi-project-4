import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class ImagesShow extends React.Component {

  state = {
    showDeleteCommentButton: false,
    // clicks: 0
    isLiked: true
  }

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ image: res.data});
        console.log('this.state.image', this.state.image);
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
    this.setState({ likes: this.state.image.likes + 1 });
    const isLiked = !this.state.isLiked;
    this.setState({ isLiked: isLiked });
    console.log('likes are', this.state.likes, this.state.isLiked);
    axios.put(`/api/images/${imageId}`, this.state, Auth.bearerHeader())
      .then(res => this.setState({image: res.data}))
      .catch(err => console.log('Error adding like', err));
  }

  DecrementItem = (event) => {
    event.preventDefault();
    const imageId = this.props.match.params.id;
    this.setState({ likes: this.state.image.likes - 1 });
    const isLiked = !this.state.isLiked;
    this.setState({ isLiked: isLiked });
    console.log('likes are', this.state.image.likes, this.state.isLiked);
    axios.put(`/api/images/${imageId}`, this.state, Auth.bearerHeader())
      .then(res => this.setState({image: res.data}))
      .catch(err => console.log('Error adding like', err));
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

            <div className="section">
              <h3 className="title is-3 has-text-white">{image.uploadedBy.username}</h3>
              <img src={image.imageUrl} className="image" />
            </div>

            <div className="section">
              <div onClick={ this.state.isLiked ? this.IncrementItem : this.DecrementItem }
                className={ this.state.isLiked ? 'isDisliked' : 'isLiked' }>LIKE</div>
              <p>Likes: {image.likes}</p>
            </div>

            <div className="section has-text-white has-background-black">
              <p>Caption: {image.caption}</p>
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
                      <img className="is-rounded" src={comment.commentedBy.profilePic} />
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

            {/* <Link className="button is-primary is-rounded is-outlined" to={`/users/${user._id}`}>Back to User</Link> */}
            {Auth.currentUserId() === image.uploadedBy._id &&
            <button className="button is-fullwidth is-primary is-rounded is-outlined" onClick={this.deleteImage}>Delete Image</button>
            }
          </div>
        }
      </section>
    );
  }
}

export default ImagesShow;
