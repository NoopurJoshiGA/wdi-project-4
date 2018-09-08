// import React from 'react';
//
// // Map
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
//
// class Map extends React.Component {
//
//   state = {
//     lat: 51.505,
//     lng: -0.09,
//     zoom: 13
//   }
//
//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return(
//       <section className="section">
//         <Map className="map" center={position} zoom={this.state.zoom}>
//           <TileLayer
//             attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={position}>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//         </Map>
//       </section>
//     );
//   }
// }
//
// export default Map;
