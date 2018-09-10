import React from 'react';
import axios from 'axios';

import SearchBar from '../common/SearchBar';
import FilterByType from '../common/FilterByType';
import FilterUsers from '../common/FilterUsers';
import SortByLocation from '../common/SortByLocation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  render() {
    const users = this.state.users;

    return(

      <section className="usersIndexSection">
          <h3>Discover</h3>

          <SearchBar handleChange={ this.handleSearchChange } searchTerm={ this.state.searchTerm } />

          <SortByLocation
            handleChange={ this.handleSearchChange }
            options={ this.state.sortLocationOptions }
            defaultValue={ this.state.defaultValue }
          />

          <FilterByType
            defaultValue={this.state.sortString}
            options={this.state.filterTypeOptions}
            handleChange={this.handleFilterByTypeChange}
          />

          { !this.state.searchTerm && !this.state.filterType &&
            <FilterUsers users={this.state.filteredUsers}/>
          }

          { this.state.searchTerm && !this.state.filterType &&
            <FilterUsers users={this.filterUsers(users)} />
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
