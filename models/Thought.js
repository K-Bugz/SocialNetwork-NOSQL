const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Reaction = require("./Reaction")

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);


ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// This is where we turn the schema into a model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
