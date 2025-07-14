import mongoose, { trusted } from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    },
    reviews : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Review"
    }],
    likes : {
        type : Number
    }
},{timestamps: true})

export default mongoose.model('Book',bookSchema);