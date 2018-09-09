import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class ImagesNew extends React.Component {

  state = {}

  handleSubmit = (event) => {
    event.preventDefault(); // don't refresh the page
    console.log('Image uploaded!', this.state);
    const imageData = {
      uploadedBy: Auth.currentUserId(),
      caption: this.state.caption,
      imageUrl: this.state.imageUrl
    };
    axios.post('/api/images', imageData, this.state, Auth.bearerHeader())
      .then(() => this.props.history.push(`/users/${Auth.currentUserId()}`)); // redirect to the users page
  }

  handleChange = ({ target: {name, value} }) => {
    console.log('Handle change is called...', name, value);
    this.setState({ [name]: value });
  }

  render() {
    console.log('into the images new component...');
    return (
      <section className="section uploadImageSection">
        <h3 className="title is-3 has-text-white">Upload an Image</h3>

        <form onSubmit={this.handleSubmit} className="form">

          {/* Image Url */}
          <input
            onChange={this.handleChange}
            className="input"
            name="imageUrl"
            type="text"
            placeholder="Image URL"
            value={this.state.imageUrl || ''}>
          </input>

          {/* Caption */}
          <input
            onChange={this.handleChange}
            className="input"
            name="caption"
            type="text"
            placeholder="Caption"
            value={this.state.caption || ''}>
          </input>

          <button className="button is-fullwidth is-primary">Upload Image</button>
        </form>

      </section>
    );
  }
}

export default ImagesNew;
