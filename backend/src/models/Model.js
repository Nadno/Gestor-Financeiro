const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ModelSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        min: 0, max: 1000000,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

mongoose.plugin(mongoosePaginate);
mongoose.model('Model', ModelSchema);
