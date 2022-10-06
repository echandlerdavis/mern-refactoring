const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async() => {
            return User.find({});
        },
        singleUser: async (parent, args, context) => {
            if(context.user){
            return await User.findOne({ _id: context.user._id });}

            // throw new AuthenticationError('You need to be logged in!');
        },

    },
    
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            console.log(user);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, args, context ) => {
    
                return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { savedBooks: args.bookId },
                },
                {
                    new: true,
                }
            );
        },
        
        deleteBook: async (parent, { bookId }, context ) => {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;