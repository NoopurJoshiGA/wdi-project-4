# Project Four - Boke
<img src="readme-images/boke.png" width="700px">

## Technical Requirements
- Build a full-stack application by making your own backend and your own front-end
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
- Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
- Be deployed online so it's publicly accessible.
- Have automated tests for at least one RESTful resource on the back-end, and at least one classical and one functional component on the front-end. Improve your employability by demonstrating a good understanding of testing principals.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Bulma CSS Framework
- React.js
- Node.js
- Express.js
- React-reveal
- FileStack.js
- Postcodes.io
- Leaflet
- MongoDB
- GitHub
- Git

## Overview

Photography has become my favourite hobby over the past year. One of the challenges I personally faced was finding models to shoot portraits with. During the research phase of this project, I found that apps such as Instagram has a vast number of users but had limited functionality to filter through interests and location easily and quickly.

'Boke' is a MERN full stack web-application which serves as a collaborative platform for aspiring photographers and models to connect through location filters, upload images, like and comment on each other's portfolios.

The application is mobile, tablet and desktop friendly.

## Approach Taken
As this was my final project for the General Assembly Web Development Immersive Programme, I wanted to utilise my experience from previous projects and run this project as smooth as possible. More focus was placed on planning and styling, as I did not want to leave styling till the last day. This approach proved to be the most efficient for this project.

I created a Trello board with thorough user stories and reviewed/updated them throughout the day -

<img src="readme-images/3.png" width="900px">

The MVP of the application was to add the following features:
- Allow users to register and login securely

<img src="readme-images/register.png" width="300px"><img src="readme-images/loginn.png" width="300px">

- Allow users to comment on images

<img src="readme-images/6.png" width="600px">

- Allow users to add and delete reviews on user profiles

<img src="readme-images/5.png" width="700px">

- Allow users to edit or delete their user profile

<img src="readme-images/7.png" width="700px">

- Allow users to search and see other users profile
<img src="readme-images/profile.png" width="300px">

- Allow user to upload an image

<img src="readme-images/upload.png" width="300px"><img src="readme-images/uploadimagefilestack.png" width="300px">

- Allow users to filter by type (model or photographer) and distance

<img src="readme-images/discover1.png" width="300px"><img src="readme-images/discover.png" width="300px">


## Wins
- A big win for me was to calculate the distance between the current logged in user's location and all the other users location, then sort the nearest users first when the page loads. I achieved this without using an external API such as MapQuest. This is shown in the code snippet below -

``` JavaScript
getAllUsersLocation = (users, pointA) => {
  let userLocations = [];
  const userPostcodes = users.map(user => user.postcode);
  axios
    .post('https://api.postcodes.io/postcodes/', { postcodes: userPostcodes })
    .then( res => {
      // res.data.result is the response from the bulk axios req
      res.data.result.forEach(result => {
        const position = { lat: result.result.latitude, lon: result.result.longitude, postcode: result.query };
        const usersInPostcode = users.filter(user => user.postcode === position.postcode);
        usersInPostcode.forEach(user => {
          user.lat = position.lat;
          user.lon = position.lon;
          const pointB = { lat: user.lat, lon: user.lon };
          user.distance = this.findDistanceBetweenUsers(pointA, pointB );
        });
        userLocations = userLocations.concat(usersInPostcode);

      });
      this.sortByDistance(userLocations);
      // set users on the state for the first time
      this.setState({ users: userLocations });
    });
}

// sort users by their distance
sortByDistance = (allUsersLocation) => {
  allUsersLocation.sort(function(a, b) {
    return a.distance - b.distance;
  });
}
```

I used the <a href="https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula">Haversine Formula</a> to calculate the distance between two longitude and latitude points
``` Javascript
findDistanceBetweenUsers = (pointA, pointB) =>  {
  const lat1 = pointA.lat;
  const lon1 = pointA.lon;

  const lat2 = pointB.lat;
  const lon2 = pointB.lon;

  const R = 6371; // Radius of the earth in km

  const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  const dLon = this.deg2rad(lon2-lon1);

  const a =
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
  Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km

  return distance;
}

deg2rad = (deg) => {
  return deg * (Math.PI/180);
}
```

- Another win was to be able to hit my daily targets on my Trello board. Overall this project was the least stressful out of the four projects and I was pleased with the outcome of the features, styling and responsiveness of the application.


## Challenges
- A challenge I faced was asynchronous nature of React when calculating the distance between user locations. I had to refactor my code to ensure user information was first retrieved from the database and then the calculations took place.

## Bonus Features
- Use react-reveal npm module for styling
- Integrate FileStack for image upload
- Use Leaflet map to display user location on the profile page
- Post project week, I was able to add a carousel on the home page using Slick package for React

## Future Features
- React gives the power to break down each component, I'd like to refactor my code to further break down my forms and other components which are used on multiple pages.
- Allow users to send and accept friend requests
- Allow users to message each other via a chatbot or some sort of inbox system
- Allow users to create meet ups with their friends
- Fix bugs - if the user decides not to share their location, the list of users on the 'Discover' page do not load properly
- Include secure routes to ensure the user cannot browse user profiles without being logged in
- Fix bug - The login page doesn't display an error if the email/password is incorrect
- Fix bug - The discover page shows the current logged in user
- Update the home page to include more information about the application
