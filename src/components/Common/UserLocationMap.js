import React from 'react';
import axios from 'axios';

// Map
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class UserLocationMap extends React.Component {

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  }

  componentDidMount() {

    axios
      .get('http://api.postcodes.io/postcodes/wd171bn')
      .then(res => {
        const userLocationData = res.data;
        this.setState({ userLocationData: userLocationData });
        console.log('userLocationData is', userLocationData);
        console.log('lat and long are', userLocationData.result.latitude, userLocationData.result.longitude);
      });
  }

  render() {

    const latitude = this.state.userLocationData.result.latitude;
    const longitude = this.state.userLocationData.result.longitude;

    console.log('latitude and longitude is', latitude, longitude);

    const position = [this.state.lat, this.state.lng];
    return(
      <section className="">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </section>
    );
  }
}

export default UserLocationMap;
