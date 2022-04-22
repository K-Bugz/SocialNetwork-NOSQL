const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        thoughtText: {
            type: String,
            required: true,
            minlength: 1, // Does this need to be 0? Like does it include 1?
            maxlength: 280 // Similar question...
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: { // Who created this thought?
            type: String,
            required: true,
        },
        reactions: [
            { // Array of nested documents crreated with teh reactionSchema
                type: Schema.Types.ObjectId,
                ref: 'reactions'
            }
        ]
    },
    {
        toJSON: { // Ask Dpug to clarify this code
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);


// Have Doug take a look at this. DEf not correct. 
/*  
Schema Settings
Create a virtual called reactionCount that retrieves the 
length of the thought's reactions array field on query.
*/
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
