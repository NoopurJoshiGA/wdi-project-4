import React from 'react';

// Map
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const UserLocationMap = ({ user, userLat, userLng }) => {

  console.log('user IN THE MAP COMPONENTS is', user, userLat, userLng);
  const position = [userLat, userLng];

  // This is the code to get the marker popup working
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  return(
    <section className="section">
      { position }
      <Map className="map" center={position} zoom="13">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            {user.firstName} {user.lastName} {user}
          </Popup>
        </Marker>

      </Map>
    </section>
  );
};

export default UserLocationMap;
