const mongoose = require('mongoose');

// Require models
const User = require('../models/user');
const Image = require('../models/image');

const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const userIds =[
  '5b9101d67c0224d96e11ed58', '5b9101e27c0224d96e11ed59', '5b9101ed7c0224d96e11ed5a'
];

const userData = [
  // user 1 - Melody (fashion model)
  {
    _id: userIds[0],
    firstName: 'Melody',
    lastName: 'Jacob',
    username: 'melodyjacob',
    email: 'melodyjacob@email.com',
    password: 'pass',
    type: 'model',
    profilePic: 'https://images.pexels.com/photos/1229177/pexels-photo-1229177.jpeg?cs=srgb&dl=blurred-background-close-up-colorful-1229177.jpg&fm=jpg',
    postcode: 'NW61RZ',
    interests: ['fashion', 'portraits'],
    description: 'Friendly, lively, fashion enthusiast. I hail from North-West London and have a keen interest in sustainable fashion. Looking to colloborate with talented and fun photographers who share a similar vision.',
    reviews: [
      { addedBy: userIds[1], content: 'Melody is really easy going and is super talented! Enjoyed collaborating for a fashion shoot.' },
      { addedBy: userIds[2], content: 'Melody is very easy to get in touch with and has flexible working hours.' }
    ],
    ratings: [
      { ratedBy: userIds[1], number: 5 },
      { ratedBy: userIds[2], number: 5 }
    ],
    socialMedia: [
      { linkType: 'facebook' },
      { url: 'facebook.com' }
    ]
  },
  // user 2 - Natasha (fashion model)
  {
    _id: userIds[1],
    firstName: 'Natasha',
    lastName: 'Brown',
    username: 'natashabrown',
    email: 'natashabrown@email.com',
    password: 'pass',
    type: 'model',
    profilePic: 'https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?cs=srgb&dl=adult-beautiful-big-city-1381558.jpg&fm=jpg',
    postcode: 'SE10NS',
    interests: 'fashion',
    description: 'I love fashion and keeping up with trends. I\'m a shopoholic. Looking for photographers to work with to build my fashion blog.',
    reviews: [
      { addedBy: userIds[0], content: 'Natasha is very professional and talented, will definitely be working with her more regularly.' }
    ],
    ratings: [
      { ratedBy: userIds[0], number: 4 },
      { ratedBy: userIds[2],  number: 5 }
    ]
  },
  // user 3 - Noopur (photographer)
  {
    _id: userIds[2],
    firstName: 'Noopur',
    lastName: 'Joshi',
    username: 'noopurjoshi',
    email: 'noopurjoshi@email.com',
    password: 'pass',
    type: 'photographer',
    profilePic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/20120712_Mila_Kunis_%40_Comic-con_cropped.jpg/1280px-20120712_Mila_Kunis_%40_Comic-con_cropped.jpg',
    postcode: 'E17PT',
    interests: ['travel', 'portraits', 'urban', 'fashion'],
    description: 'Aspiring photographer specialising in Urban street photography. I\'m easy going, fun, have flexible working times and can commute around London.',
    reviews: [
      { addedBy: userIds[0], content: 'Noopur has a great work ethic and is very professional, yet fun! I did a shoot with her in Shoreditch which was a perfect location to capture an urban vibe.' },
      { addedBy: userIds[1], content: 'Easy to work with. Noopur was fast at post editing and delivering the images.' }
    ],
    ratings: [
      { ratedBy: userIds[0], number: 4 },
      { ratedBy: userIds[1], number: 5 }
    ]
  }
];

const imageData = [
  // fashion model 1
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1377450/pexels-photo-1377450.jpeg?cs=srgb&dl=bag-beautiful-city-1377450.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1002,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1377452/pexels-photo-1377452.jpeg?cs=srgb&dl=daytime-dress-fashion-1377452.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 2194,
    comments: [
      { commentedBy: userIds[2], content: 'I would love to colloborate with you, check out my profile :)' }
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1374915/pexels-photo-1374915.jpeg?cs=srgb&dl=bag-blurred-background-daylight-1374915.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 850,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1346185/pexels-photo-1346185.jpeg?cs=srgb&dl=dress-fashion-girl-1346185.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 749,
    comments: [
      { commentedBy: userIds[2], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[1], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1276576/pexels-photo-1276576.jpeg?cs=srgb&dl=bag-daytime-dress-1276576.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 749,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1270014/pexels-photo-1270014.jpeg?cs=srgb&dl=back-back-view-bag-1270014.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 2134,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1253410/pexels-photo-1253410.jpeg?cs=srgb&dl=3d-model-adobe-photoshop-advert-1253410.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 2645,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1248134/pexels-photo-1248134.jpeg?cs=srgb&dl=adult-beautiful-beauty-1248134.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 3640,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1229181/pexels-photo-1229181.jpeg?cs=srgb&dl=bag-colorful-colors-1229181.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1203,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1200372/pexels-photo-1200372.jpeg?cs=srgb&dl=automobile-automotive-beautiful-1200372.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 2000,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1200374/pexels-photo-1200374.jpeg?cs=srgb&dl=bag-car-girl-1200374.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1020,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1161748/pexels-photo-1161748.jpeg?cs=srgb&dl=action-action-energy-adult-1161748.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 2777,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    imageUrl: 'https://images.pexels.com/photos/1154764/pexels-photo-1154764.jpeg?cs=srgb&dl=adult-attractive-beautiful-1154764.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 2224,
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[0],
    comments: [
      { commentedBy: userIds[1], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ],
    imageUrl: 'https://images.pexels.com/photos/1075773/pexels-photo-1075773.jpeg?cs=srgb&dl=african-bag-building-1075773.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110
  },
  // fashion model 2
  {
    uploadedBy: userIds[1],
    imageUrl: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?cs=srgb&dl=bag-beautiful-clothes-1040173.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[1],
    imageUrl: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?cs=srgb&dl=adult-autumn-colors-beautiful-1055691.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[1],
    imageUrl: 'https://images.pexels.com/photos/1158741/pexels-photo-1158741.jpeg?cs=srgb&dl=adult-beautiful-blue-background-1158741.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[1],
    imageUrl: 'https://images.pexels.com/photos/1187950/pexels-photo-1187950.jpeg?cs=srgb&dl=adult-beautiful-coat-1187950.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[1],
    imageUrl: 'https://images.pexels.com/photos/1187954/pexels-photo-1187954.jpeg?cs=srgb&dl=child-colorful-sunglasses-dress-1187954.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[2], content: 'Your style is great'}
    ]
  },
  // photographer 1
  {
    uploadedBy: userIds[2],
    imageUrl: 'https://images.pexels.com/photos/307847/pexels-photo-307847.jpeg?cs=srgb&dl=architecture-boy-buildings-307847.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[1], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[2],
    imageUrl: 'https://images.pexels.com/photos/307911/pexels-photo-307911.jpeg?cs=srgb&dl=adult-blur-casual-307911.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[1], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[2],
    imageUrl: 'https://images.pexels.com/photos/307912/pexels-photo-307912.jpeg?cs=srgb&dl=pexels-307912.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[1], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[2],
    imageUrl: 'https://images.pexels.com/photos/307902/pexels-photo-307902.jpeg?cs=srgb&dl=blur-chalk-chalkboard-307902.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[1], content: 'Your style is great'}
    ]
  },
  {
    uploadedBy: userIds[2],
    imageUrl: 'https://images.pexels.com/photos/37839/pexels-photo-37839.jpeg?cs=srgb&dl=bridge-city-downtown-37839.jpg&fm=jpg',
    caption: '',
    tags: ['fashion'],
    likes: 1110,
    comments: [
      { commentedBy: userIds[0], content: 'This picture is amazing! Love the red dress.' },
      { commentedBy: userIds[1], content: 'Your style is great'}
    ]
  }
];

User.collection.drop();
Image.collection.drop();

User.create(userData)
  .then(users => {
    console.log(`Created ${users.length} users`);
    // model 1
    imageData[0].uploadedBy = users[0]._id;
    imageData[1].uploadedBy = users[0]._id;
    imageData[2].uploadedBy = users[0]._id;
    imageData[3].uploadedBy = users[0]._id;
    imageData[4].uploadedBy = users[0]._id;
    imageData[5].uploadedBy = users[0]._id;
    imageData[6].uploadedBy = users[0]._id;
    imageData[7].uploadedBy = users[0]._id;
    imageData[8].uploadedBy = users[0]._id;
    imageData[9].uploadedBy = users[0]._id;
    imageData[10].uploadedBy = users[0]._id;
    imageData[11].uploadedBy = users[0]._id;
    imageData[12].uploadedBy = users[0]._id;
    imageData[13].uploadedBy = users[0]._id;
    // model 2
    imageData[14].uploadedBy = users[1]._id;
    imageData[15].uploadedBy = users[1]._id;
    imageData[16].uploadedBy = users[1]._id;
    imageData[17].uploadedBy = users[1]._id;
    imageData[18].uploadedBy = users[1]._id;
    // photographer 1
    imageData[19].uploadedBy = users[2]._id;
    imageData[20].uploadedBy = users[2]._id;
    imageData[21].uploadedBy = users[2]._id;
    imageData[22].uploadedBy = users[2]._id;
    imageData[23].uploadedBy = users[2]._id;
    return Image.create(imageData);
  })
  .then(images => console.log(`Created ${images.length} images`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
