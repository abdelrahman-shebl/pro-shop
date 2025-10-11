// This script runs inside the mongo container at first startup and inserts sample data
// It uses the 'proshop' database by default

db = db.getSiblingDB('proshop');

const bcryptHash = '$2a$10$E7VjWIKdiQgkXxmOquowS.GQ4rfNl/RWfw1G4xQ8sSW.sfIRJg8La';

const users = [
  {
    _id: ObjectId(),
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcryptHash,
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId(),
    name: 'John Doe',
    email: 'john@email.com',
    password: bcryptHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId(),
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcryptHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

db.users.drop();
db.users.insertMany(users);

const adminId = users[0]._id;

const products = [
  {
    user: adminId,
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    rating: 4.5,
    numReviews: 12,
    price: 89.99,
    countInStock: 10,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'iPhone 13 Pro 256GB Memory',
    image: '/images/phone.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    rating: 4,
    numReviews: 8,
    price: 599.99,
    countInStock: 7,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    brand: 'Cannon',
    category: 'Electronics',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    rating: 3,
    numReviews: 12,
    price: 929.99,
    countInStock: 5,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Sony Playstation 5',
    image: '/images/playstation.jpg',
    brand: 'Sony',
    category: 'Electronics',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    rating: 5,
    numReviews: 12,
    price: 399.99,
    countInStock: 11,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    brand: 'Logitech',
    category: 'Electronics',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    rating: 3.5,
    numReviews: 10,
    price: 49.99,
    countInStock: 7,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    brand: 'Amazon',
    category: 'Electronics',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    rating: 4,
    numReviews: 12,
    price: 29.99,
    countInStock: 0,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'MacBook Pro 14-inch',
    image: '/images/macbook.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'M1 Pro chip, brilliant Liquid Retina XDR display and pro-class performance for users who need the best.',
    rating: 4.8,
    numReviews: 34,
    price: 1999.99,
    countInStock: 5,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Samsung QLED 4K Smart TV 55"',
    image: '/images/tv.jpg',
    brand: 'Samsung',
    category: 'Electronics',
    description:
      'Experience lifelike colors and deep contrasts with Samsung QLED 4K. Smart features and multiple HDMI ports.',
    rating: 4.6,
    numReviews: 21,
    price: 699.99,
    countInStock: 8,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Nintendo Switch OLED',
    image: '/images/switch.jpg',
    brand: 'Nintendo',
    category: 'Electronics',
    description:
      'The Nintendo Switch OLED model features a vibrant 7-inch OLED screen, enhanced audio, and a wide adjustable stand for tabletop play.',
    rating: 4.7,
    numReviews: 45,
    price: 349.99,
    countInStock: 12,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Bose QuietComfort 45 Headphones',
    image: '/images/bose.jpg',
    brand: 'Bose',
    category: 'Electronics',
    description:
      'Engineered for comfort with acoustic noise cancelling, QuietComfort 45 headphones deliver excellent sound and long battery life.',
    rating: 4.5,
    numReviews: 18,
    price: 329.99,
    countInStock: 9,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Fitbit Charge 5',
    image: '/images/fitbit.jpg',
    brand: 'Fitbit',
    category: 'Wearables',
    description:
      'Advanced fitness tracker with built-in GPS, stress management tools, and a bright AMOLED display.',
    rating: 4.2,
    numReviews: 10,
    price: 149.99,
    countInStock: 15,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: adminId,
    name: 'Dell UltraSharp 27 Monitor',
    image: '/images/monitor.jpg',
    brand: 'Dell',
    category: 'Electronics',
    description:
      '27-inch QHD monitor with ultrathin bezels and factory-calibrated color for excellent clarity and color accuracy.',
    rating: 4.4,
    numReviews: 14,
    price: 379.99,
    countInStock: 6,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

db.products.drop();
db.products.insertMany(products);

print('mongo-init: inserted users and products');
