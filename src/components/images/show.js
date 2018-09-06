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

      <section className="section">

        {image &&
          <div className="container columns is-multiline has-text-centered">

            <h3 className="title is-3 has-text-white">Image</h3>

            <div className="section">
              <img src={image.imageUrl} className="image" />
              <h3 className="title is-3 has-text-white">{image.uploadedBy.username}</h3>
            </div>

            <div className="section">
              { image.comments.map(comment =>
                <div key={image._id} className="card has-background-white">
                  {comment.commentedBy.username} {comment.content}
                </div>
              )}
            </div>
          </div>
        }
      </section>
    );
  }
}

export default ImagesShow;
