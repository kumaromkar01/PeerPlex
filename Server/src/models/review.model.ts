import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user : {type : mongoose.SchemaTypes.ObjectId, ref : "User"},
    book : {type : mongoose.SchemaTypes.ObjectId, ref : "Book"},
    comment : {type : String,required:true}
},{timestamps : true});

export default mongoose.model("Review",reviewSchema);