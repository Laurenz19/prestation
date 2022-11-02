const mongoose = require('mongoose');

/**************User */
const User = require('../models/user');

const connectDB = async() => {
    try {

        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        User.findOne().then(user => {
            console.log('hello, I am here')
            if (user == null) {
                const user = new User({
                    username: 'admin',
                    email: 'admin@test.com',
                    password: 'admin'
                });
                user.save();
            }
            console.log(user);
        });
        /* User.find()
             .then(users => console.log(users));*/

        console.log(`Mongodb connected on ${con.connection.host + '/' +con.connection.name}`);
    } catch (error) {
        console.error(error);
        process.exit(1);

    }
}

module.exports = connectDB;