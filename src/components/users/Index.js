import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SearchBar from '../common/SearchBar';
import Sort from '../common/Sort';
import FilterBySearch from '../common/FilterBySearch';


class UsersIndex extends React.Component {

  state = {
    sortString: 'please select',
    sortOptions: [
      { value: 'type|model', label: 'model'},
      { value: 'type|photographer', label: 'photographer'}
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

  // filterUsers takes the filteredUsers (which in this case is set to all the users as the initial value)
  // It filters it
  filterUsers = (users) => {
    const { searchTerm } = this.state;
    return users.filter(user =>
      [user.firstName, user.lastName, user.type, user.username].some(field => {
        const re = new RegExp(searchTerm, 'i');
        return re.test(field);
      })
    );
  }

  // sort some users
sortUsers = (users) => {
  const [ fieldName, direction ] = this.state.sortString.split('|');
  console.log('fieldName and direction are', fieldName, direction);
  return _.orderBy(users, fieldName, direction);
}

  sortedFilteredUsers = () => {
    //sort first
    const sortedUsers = this.sortUsers(this.state.users);
    console.log('sortedUsers are', sortedUsers);
    //then filter
    return this.filterUsers(sortedUsers);
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
    const sortedUsers = this.sortUsers(allUsers);

    console.log('Filter options are:', this.state.filterOptions);
    console.log('searchterm is', this.state.searchTerm);


    console.log('users are', users);
    console.log('images are', images);
    return(

      <section className="usersIndexSection">
        {/* <section className="hero discover is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">DISCOVER</h1>
            </div>
          </div>
        </section> */}

        <section>
          <SearchBar handleChange={ this.handleSearchChange } searchTerm={ this.state.searchTerm } />
          <Sort
            defaultValue={this.state.sortString}
            options={this.state.sortOptions}
            handleChange={this.handleSortChange}
          />
          {this.state.searchTerm &&
              <FilterBySearch users={this.filterUsers(sortedUsers)}/>
          }
        </section>


        {/* { users && this.state.filteredUsers.map(user =>
          <Link key={user._id} to={`/users/${user._id}`} className="columns is-multiline is-mobile">
            <div className="card userIndex has-text-dark column">
              <img className="userIndexImage" src={user.profilePic} alt={user.firstName}/>
              <h6 className="title is-6 has-text-white has-text-centered">{user.firstName} {user.lastName}</h6>
              <p className="has-text-white">{user.type}</p>
              <p className="has-text-white">{user.postcode}</p>
              <p className="has-text-white">{user.description}</p>
              {/* <button className="userIndexBtn">See More</button> */}
        {/* </div> */}
        {/* // </Link> */}
        {/* )} */}
      </section>
    );
  }
}
export default UsersIndex;
