import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ImagesShow extends React.Component {

  state = {}

  componentDidMount() {
    axios.get(`/api/images/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ image: res.data});
        console.log('this.state.image', this.state.image);
      });
  }

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
                <div key={image._id} className="card comments has-background-white">
                  <figure className="image is-64x64">
                    <img className="is-rounded" src={image.uploadedBy.profilePic} />
                  </figure>
                  {comment.commentedBy.username} {comment.content}
                </div>
              )}
            </div>

            {/* <Link className="button is-primary is-rounded is-outlined" to={`/users/${user._id}`}>Back to User</Link> */}
          </div>
        }
      </section>
    );
  }
}

export default ImagesShow;
