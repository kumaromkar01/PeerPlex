import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    uploads : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Book"
    }],
    likes : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Book"
    }],
    reviews : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Review"
    }]

});

export default mongoose.model("User",userSchema);