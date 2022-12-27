import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
// create all the handlers for our routes inside here
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); //as it take time to find data in the model we need to make it an async function
    // console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body; // we need to be able to post something therefore we move to creating the form on the front end

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body; // this is being sent from the front end.

  // check if the id specified is actually a mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')


  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true }); // {new: true } to receive the updated version of the post

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body; // this is being sent from the front end.

  // check if the id specified is actually a mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  // find the post we looking for 
  const post = await PostMessage.findById(id)
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true }) //passing updates to it as the second parameter

  res.json(updatedPost)
}