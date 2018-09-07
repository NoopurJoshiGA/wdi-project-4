import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class ImagesShow extends React.Component {

  state = {
    showDeleteCommentButton: false
  }

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ image: res.data});
        console.log('this.state.image', this.state.image);
      });
  }

  createComment = (event) => {
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
    event.preventDefault();
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

  // handleMouseOver = (event) => {
  //   console.log('mouse is on the comment...');
  //   const showDeleteCommentButton = !this.state.showDeleteCommentButton;
  //   this.setState({ showDeleteCommentButton });
  //   console.log('showDeleteCommentButton', showDeleteCommentButton);
  // }
  //
  // handleMouseOut = (event) => {
  //   console.log('mouse is not on the comment');
  //   const showDeleteCommentButton = this.state.showDeleteCommentButton;
  //   this.setState({ showDeleteCommentButton });
  //   console.log('showDeleteCommentButton', showDeleteCommentButton);
  // }

  render() {

    const image = this.state.image;
    console.log('image is', image);

    return(

      <section className="section showImage">

        {image &&
          <div className="container columns is-multiline has-text-centered">

            <div className="section">
              <h3 className="title is-3 has-text-white">{image.uploadedBy.username}</h3>
              <img src={image.imageUrl} className="image" />
            </div>

            <div className="section has-text-white has-background-black">
              <p>Caption: {image.caption}</p>
            </div>

            <div className="section has-background-primary">
              <p>Likes: {image.likes}</p>
            </div>

            <div>
              { image.comments.map(comment =>

                <div key={comment._id} className="card comments has-background-white">
                  {/* onMouseOver={this.handleMouseOver}
                   onMouseOut={this.handleMouseOut} */}
                  {/* <div>
                    {this.state.showDeleteCommentButton &&
                    }
                  </div> */}

                  <figure className="image is-64x64">
                    <img className="is-rounded" src={image.uploadedBy.profilePic} />
                  </figure>

                  {comment.commentedBy.username}
                  {comment.content}
                  <button onClick={this.deleteComment(comment._id)} className="button is-small is-outlined is-primary">Delete</button>
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
          </div>
        }
      </section>
    );
  }
}

export default ImagesShow;
