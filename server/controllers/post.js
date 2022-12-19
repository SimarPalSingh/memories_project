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
