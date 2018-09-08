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

  // showEditComment = (commentId) => {
  //   event.preventDefault();
  //   console.log('show edit comment...');
  // }
  //
  // editComment = (commentId) => {
  //   event.preventDefault();
  //   console.log('edit comment...');
  //   return() => {
  //     console.log(`Edit comment ${commentId}`);
  //     const imageId = this.props.match.params.id;
  //     // we want to update the record in the db
  //     axios
  //       .put(`api/images/${imageId}/comments/${commentId}`)
  //       .then(res => this.setState({image: res.data}))
  //       .catch(err => console.log('Error editing', err));
  //   };
  // }

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

  // addLike = (event, likes) => {
  //   event.preventDefault();
  //   console.log('adding like');
  //   const toggleLike =
  //   this.setState({ toggleLike = true'
  //   likes++;
    //
    // const imageId = this.props.match.params.id;
    // this.setState({ likes: likes++ });
    // console.log('this.state.likes', this.state.likes);
    // // Building the data to send to the db
    // const likesData = {
    //    this.setState({ likes: res.data }))
    // };
    // axios
    //   .post(`/api/images/${imageId}/comments`, commentData)
    //   .then(res => this.setState({ image: res.data }))
    //   .catch(err => console.log('Error =>', err));
  // }

  render() {

    const image = this.state.image;
    // const likes = this.state.image.likes;

    console.log('image is', image);
    console.log('authentication', Auth.currentUserId());

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
              {/* if the like button has been clicked already, then make it have a background color or the 'is-selected' bulma class, fire the removeLike function */}
              {/* otherwise, fire the addLike button and make it transparent. Remove the 'is-selected' bulma class */}
              {/* { toggleLike &&

              }} */}
              {/* <button className="button is-outlined is-rounded is-info" onClick={this.addLike(likes)}>Like</button> */}
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
                    <img className="is-rounded" src={comment.commentedBy.profilePic} />
                  </figure>

                  {comment.commentedBy && comment.commentedBy.username}
                  {comment.content}

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
          </div>
        }
      </section>
    );
  }
}

export default ImagesShow;
