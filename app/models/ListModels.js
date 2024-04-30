import mongoose, { Schema, model } from 'mongoose';

const listSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    activity: {
        type: String,
        required: true,
    },
});

const ListModel = mongoose.models.List || model('List', listSchema);

export default ListModel;
