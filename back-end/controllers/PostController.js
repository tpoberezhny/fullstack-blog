import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed while loading posts",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed while loading posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true, // This option returns the updated document
      }
    )
      .populate("user")
      .exec();

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed while trying to load post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedDoc = await PostModel.findOneAndDelete({
      _id: postId,
    }).exec();

    if (!deletedDoc) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed while trying to delete post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed creating new post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        tags: req.body.tags.split(","),
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Failed while trying to update post",
    });
  }
};
