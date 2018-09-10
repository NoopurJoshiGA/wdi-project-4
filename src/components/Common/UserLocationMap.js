import React from 'react';
import axios from 'axios';


// Map
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

class UserLocationMap extends React.Component {

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  }

  componentDidMount() {

    axios
      .get('http://api.postcodes.io/postcodes/${}')
      .then(res => {
        const userLocationData = res.data;
        this.setState({ userLocationData: userLocationData, lat: userLocationData.result.latitude, lng: userLocationData.result.longitude });
        console.log('lat and long are', userLocationData.result.latitude, userLocationData.result.longitude);
      });
  }


  render() {


    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

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
