const mongoose = require('mongoose');
const uri = 'mongodb+srv://uthsava_db_user:i232HQEqVrkqU2Ud@uthsava.h7oiarr.mongodb.net/users?retryWrites=true&w=majority';

async function run() {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.collection('genres').createIndex({ name: 1, type: 1 }, { unique: true });
  } catch (err) {
    console.log('Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
