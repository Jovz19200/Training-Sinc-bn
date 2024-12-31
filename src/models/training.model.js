const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false}
});
const Category = mongoose.model('category', categorySchema);

const TrainingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['ongoing', 'attended', 'upcoming', 'completed', 'assigned', 'reported'],
        required: true,
    },
    start_date: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    training_type: {
        type: String,
        enum: ['Institutional', 'Individual', 'co-institutional'],
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

module.exports = {
    TrainingSchema,
    Category
}