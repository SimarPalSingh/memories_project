// insie here - we are going to use the possibilites of mongoose
import mongoose, { mongo } from "mongoose";

// what  is a schema:
// with mongodb you can create documents that looks absolutely diff. have msg and/  or title
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFiel: String,
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

//  now we need to turn this schema into a model
const PostMessgae = mongoose.model('PostMessgae', postSchema)

export default PostMessgae;
//  on this model we will be able to run command such as find, delete and update 
