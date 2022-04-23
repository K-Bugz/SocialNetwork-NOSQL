const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true, // `email` must be unique
            match: /.+\@.+\..+/ // Does this satisfy the requirement?
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User' // The model is referencing itself... b/c a friend is a different User
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
    // return this.friends.reduce(
    //     (total, friend) => total + friend.replies.length + 1,
    //     0
    // );
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
