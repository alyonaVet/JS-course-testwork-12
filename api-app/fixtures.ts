import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
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

  await db.close();
};

run().catch(console.error);