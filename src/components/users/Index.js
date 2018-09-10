import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SearchBar from '../common/SearchBar';
import FilterByType from '../common/FilterByType';
import FilterUsers from '../common/FilterUsers';
import SortByLocation from '../common/SortByLocation';

class UsersIndex extends React.Component {

  state = {
    sortString: 'Please Select',
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
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data, filteredUsers: res.data }));
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
    console.log('search term is:', event.target.value);
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
  // console.log('users are', users);
  // users.filter(user => {
  //   console.log(user.type);
  // });
  // const type = this.state.sortString.split('|');
  // console.log('type is', type);
  // return users.filter(user => user.type === type);
  return users;
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

  render() {
    const users = this.state.users;
    const images = this.state.images;

    const allUsers = this.state.users;
    const sortedUsersByType = this.filterUsersByType(allUsers);
    console.log('sortedUsersByType are', sortedUsersByType);

    // console.log('users are', users);
    // console.log('images are', images);
    return(

      <section className="usersIndexSection">

        <section>
          <SearchBar handleChange={ this.handleSearchChange } searchTerm={ this.state.searchTerm } />

          <SortByLocation
            handleChange={ this.handleSearchChange }
            options={ this.state.sortLocationOptions }
            defaultValue={ this.state.defaultValue }
          />

          <FilterByType
            defaultValue={this.state.sortString}
            options={this.state.filterTypeOptions}
            handleChange={this.handleSortChange}
          />

          {this.state.searchTerm &&
              <FilterUsers users={this.filterUsers(sortedUsersByType)}/>
          }
        </section>

      </section>
    );
  }
}
export default UsersIndex;
