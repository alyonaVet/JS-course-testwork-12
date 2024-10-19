import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Photo from './models/Photo';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [admin, user1] = await User.create({
      email: 'admin@gmail.com',
      password: '1234#',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'ADMIN',
      avatar: 'fixtures/admin.png',
    }, {
      email: 'user1@gmail.com',
      password: '1234@',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'John Doe',
      avatar: 'fixtures/person.png',
    }
  );

  await Photo.create({
      user: admin,
      title: 'Beautiful nature',
      image: 'fixtures/nature-1.jpeg'
    },
    {
      user: admin,
      title: 'Lake',
      image: 'fixtures/nature-4.png'
    },
    {
      user: user1,
      title: 'Sun shining',
      image: 'fixtures/nature-2.jpeg'
    },
    {
      user: user1,
      title: 'Summer forest',
      image: 'fixtures/nature-3.webp'
    },
  );

  await db.close();
};

run().catch(console.error);