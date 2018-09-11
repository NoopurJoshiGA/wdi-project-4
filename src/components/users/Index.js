import React from 'react';
import axios from 'axios';

import SearchBar from '../common/SearchBar';
import FilterByType from '../common/FilterByType';
import FilterUsers from '../common/FilterUsers';

class UsersIndex extends React.Component {

  state = {
    sortString: 'Please Select',
    defaultValue: 'Please select...',
    filterTypeOptions: [
      { value: 'type|model', label: 'model'},
      { value: 'type|photographer', label: 'photographer'}
    ],
    sortLocationOptions: [
      { value: 'location|closest', label: 'Shortest distance'},
      { value: 'location|furthest', label: 'Longest distance'}
    ]
  }

  componentDidMount() { // Sets all users onto the state
    console.log('Index component mounted...');
    this.getUserLocation();
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data, filteredUsers: res.data }));
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
    console.log('search term is:', event.target.value);
  }

  handleFilterByTypeChange = (event) => {
    this.setState({ filterType: event.target.value }, () => {
      console.log('filterType is', this.state.filterType);
    });
  }

  filterUsers = (users) => {
    const { searchTerm } = this.state;
    return users.filter(user =>
      [user.firstName, user.lastName, user.type, user.username].some(field => {
        const re = new RegExp(searchTerm, 'i');
        return re.test(field);
      })
    );
  }

  // filter the users by model or photographer
  filterUsersByType = (users) => {
    const type = this.state.filterType.split('|');
    return users.filter(user => user.type === type[1]);
  }

  filterSearchUsers = (users) => {
    const filteredSearchUsers = this.filterUsers(users);
    return this.filterUsersByType(filteredSearchUsers);
  }

  sortedFilteredUsers = () => {
    //sort first
    const sortedUsersByType = this.sortUsersByType(this.state.users);
    console.log('sortedUsersByType are', sortedUsersByType);
    //then filter
    return this.filterUsers(sortedUsersByType);
  }

  handleSortChange = (event) => {
    // Options.set('sortString', event.target.value);
    this.setState({ sortString: event.target.value });
    console.log('sortString is', this.state.sortString);
  }

  // get location of each user
  getAllUsersLocation = (pointA) => {
    // const pointA = this.getUserLocation();
    // console.log('point A is', pointA);
    const allUsersLocation = [];
    console.log('into the getUsersLocation');
    this.state.users.map(user => {
      axios
        .get(`http://api.postcodes.io/postcodes/${user.postcode}`)
        .then(res => {

          const pointB = { lat: res.data.result.latitude, lon: res.data.result.longitude };
          const distance = this.findDistanceBetweenUsers(pointA, pointB);
          console.log('distance is', distance);
          allUsersLocation.push({ user: user, distance: distance });
          this.sortByDistance(allUsersLocation);
          this.setState({ usersByDistance: allUsersLocation});
          console.log('allUsersLocation', allUsersLocation);

        });
    });
  }

  // sort users by their distance
  sortByDistance = (allUsersLocation) => {
    allUsersLocation.sort(function(a, b) {
      return a.distance - b.distance;
    });
  }

  // TODO:
  // make axios request in the backend to get lat and lon for each user when created/edited

  // get users current position
  getUserLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(userPosition => {

        const lat1 = userPosition.coords.latitude;
        const lon1 = userPosition.coords.longitude;

        const pointA = { lat: lat1, lon: lon1};
        console.log('users location / pointA is', pointA);

        this.getAllUsersLocation(pointA);

      });
    }
  }

  findDistanceBetweenUsers = (pointA, pointB) =>  {

    const lat1 = pointA.lat;
    const lon1 = pointA.lon;

    const lat2 = pointB.lat;
    const lon2 = pointB.lon;

    // const user = pointB.user;

    const R = 6371; // Radius of the earth in km

    const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2-lon1);

    const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    // const allDistances = allDistances.push(distance);
    console.log('the distance is', distance);

    return distance;
  }

  deg2rad = (deg) => {
    return deg * (Math.PI/180);
  }

  render() {
    const users = this.state.users;

    return(

      <section className="usersIndexSection">
        <h3>Discover</h3>

        <SearchBar handleChange={ this.handleSearchChange } searchTerm={ this.state.searchTerm } />

        <FilterByType
          defaultValue={this.state.sortString}
          options={this.state.filterTypeOptions}
          handleChange={this.handleFilterByTypeChange}
        />

        { !this.state.searchTerm && !this.state.filterType &&
          <FilterUsers users={this.state.usersByDistance}/>
        }

        { this.state.searchTerm && !this.state.filterType &&
          <FilterUsers users={this.filterUsers(this.state.usersByDistance)} />
        }

        { !this.state.searchTerm && this.state.filterType &&
          <FilterUsers users={this.filterUsersByType(users)} />
        }
        {
          this.state.searchTerm && this.state.filterType &&
          <FilterUsers users={this.filterSearchUsers(users)} />
        }

      </section>
    );
  }
}
export default UsersIndex;
