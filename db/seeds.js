const mongoose = require('mongoose');

// Require models
const User = require('../models/user');
const Image = require('../models/image');

const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const userData = [
  {
    firstName: 'Noopur',
    lastName: 'Joshi',
    username: 'noopurjoshi',
    email: 'noopurjoshi@gmail.com',
    password: 'pass',
    type: 'photographer',
    imageUrl: 'https://scontent.fbhx3-1.fna.fbcdn.net/v/t1.0-9/38420482_10214919775139309_4204673764744495104_o.jpg?_nc_cat=0&oh=8b7cf075b828d416e97db4dc6eb73f90&oe=5C0075E6',
    postcode: 'E17PT',
    reviews: [
      {
        content: 'It was wonderful working with Noopur, she had some fantastic ideas for the shoot. The post edit time was quite short as well.'
      }
    ],
    ratings: [
      {
        ratingNumber: 5
      },
      {
        ratingNumber: 4.5
      }
    ]
  }
];

const imageData = [
  {
    imageUrl: 'https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?cs=srgb&dl=beautiful-female-girl-247322.jpg&fm=jpg',
    caption: 'The beautiful Andrea',
    tags: ['urban', 'portrait', 'moody'],
    comments: [
      {
        content: 'Great shot!'
      },
      {
        content: 'Absolutely perfect. Loving the tones on this one.'
      }
    ],
    likes: 450,
    addedByUser: 'Noopur Joshi'
  }
];

User.collection.drop();
Image.collection.drop();

User.create(userData)
  .then(users => {
    console.log(`Created ${users.length} users`);
    return Image.create(imageData);
  })
  .then(images => console.log(`Created ${images.length} images`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
