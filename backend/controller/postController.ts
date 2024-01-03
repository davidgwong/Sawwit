import { Post } from "../models/posts";
import { Vote } from "../models/votes";
import { Comment } from "../models/comments";
import { Request, Response } from "express";

const PAGE_SIZE = 5;

async function decoratePost(
  post: Post,
  user: Express.User | undefined
): Promise<DecoratedPost> {
  const postComments = await Comment.find({ post_id: post._id });
  const voteStatus = await Vote.findOne({
    post_id: post._id,
    user_id: user?._id,
  });
  const decoratedPost: DecoratedPost = {
    _id: post._id,
    title: post.title,
    link: post.link,
    creator_id: post.creator_id,
    creator_username: post.creator_username,
    subgroup: post.subgroup,
    timestamp: post.timestamp,
    content: post.content,
    votes: post.votes,
    score: post.score,
    comments: postComments,
    voteStatus: voteStatus?.value || 0,
    hotness: post.hotness,
  };
  return decoratedPost;
}

async function getDecoratedPosts(
  user: Express.User | undefined,
  sortBy = "Date",
  pageNumber = 1,
  subgroup?: string
) {
  const skip = (pageNumber - 1) * PAGE_SIZE;
  let sortOptions = {};
  switch (sortBy) {
    case "Top":
      sortOptions = { score: -1 };
      break;
    case "Controversial":
      sortOptions = { votes: -1 };
      break;
    case "Hot":
      sortOptions = { hotness: -1 };
      break;
    default:
      sortOptions = { timestamp: -1 };
      break;
  }
  const query = subgroup ? { subgroup: subgroup } : {};
  try {
    const posts = await Post.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(PAGE_SIZE);
    const decoratedPosts: DecoratedPost[] = await Promise.all(
      posts.map((post) => decoratePost(post, user))
    );
    return decoratedPosts;
  } catch (error: any) {
    return error;
  }
}

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const user = await req.user;
    const reqQuery = await req.query;
    const pageNumber = Number(reqQuery.pageNumber);
    const sortBy = reqQuery.sortBy as string;
    const decoratedPosts: DecoratedPost[] = await getDecoratedPosts(
      user,
      sortBy,
      pageNumber
    );
    const totalPosts = await Post.countDocuments({});
    const pages = Math.ceil(totalPosts / PAGE_SIZE);
    res.json({ posts: decoratedPosts, pages: pages });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getPostsInSubgroup = async (req: Request, res: Response) => {
  try {
    const subName = await req.params.subname;
    const user = await req.user;
    const reqQuery = await req.query;
    const pageNumber = Number(reqQuery.pageNumber);
    const sortBy = reqQuery.sortBy as string;
    const decoratedPosts: DecoratedPost[] = await getDecoratedPosts(
      user,
      sortBy,
      pageNumber,
      subName
    );
    const totalPosts = await Post.countDocuments({ subgroup: subName });
    const pages = Math.ceil(totalPosts / PAGE_SIZE);
    res.json({ posts: decoratedPosts, pages: pages });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const editPost = async (req: Request, res: Response) => {
  const incomingEdits = await req.body;
  const user = await req.user;
  const postId = req.params.postid;
  const updateData = {
    content: incomingEdits.content,
    link: incomingEdits.link,
    subgroup: incomingEdits.subgroup,
    title: incomingEdits.title,
  };

  try {
    const post = await Post.findById(postId);
    if (post?.creator_id.toString() === user?._id.toString()) {
      const editPostResult = await Post.findByIdAndUpdate(postId, updateData, {
        new: true,
      });
      res.status(200).json({ message: "Post was successfully edited." });
    } else {
      res
        .status(403)
        .json({ message: "Post cannot be edited (not original poster)." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req: Request, res: Response) => {
  const newPost = await req.body;
  const user = await req.user;
  const title = newPost.title;
  const link = newPost.link;
  const content = newPost.content;
  const subgroup = newPost.subgroup;
  try {
    const newPost = new Post({
      creator_id: user!._id,
      creator_username: user!.username,
      content: content,
      link: link,
      subgroup: subgroup,
      timestamp: Date.now(),
      title: title,
      score: 0,
      votes: 0,
    });

    const savedPost = await newPost.save();
    res.status(201).json({ postId: savedPost._id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getPost = async (req: Request, res: Response) => {
  const postId = req.params.postid;
  const user = await req.user;

  try {
    const post = await Post.findById(postId);
    const decoratedPost = await decoratePost(post!, user);
    res.json(decoratedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postid;
  const user = await req.user;
  try {
    const post = await Post.findById(postId);
    if (post?.creator_id.toString() === user?._id.toString()) {
      const deletePostResult = await Post.findByIdAndDelete(postId);
      const deletePostCommentsResult = await Comment.deleteMany({
        post_id: postId,
      });
      const deletePostVotesResult = await Vote.deleteMany({
        post_id: postId,
      });
      res.status(200).json({ message: "Post was successfully deleted." });
    } else {
      res
        .status(403)
        .json({ message: "Post cannot be deleted (not original poster)." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getSubs = async (req: Request, res: Response) => {
  try {
    const subgroups: GetSubsData[] = await Post.aggregate([
      {
        $group: {
          _id: "$subgroup",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ subgroups });
  } catch (err) {}
};

const addComment = async (req: Request, res: Response) => {
  const incomingComment = await req.body.newComment;
  const postTitle = await req.body.postTitle;
  const user = await req.user;
  const postId = req.params.postid;
  try {
    const newComment = new Comment({
      creator_id: user?._id,
      creator_username: user?.username,
      content: incomingComment,
      post_id: postId,
      post_title: postTitle,
      timestamp: Date.now(),
    });

    const savedComment = await newComment.save();
    res.status(201).json({ message: "Comment added." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addVote = async (req: Request, res: Response) => {
  const user = await req.user;
  const post_id = await req.body.postId;
  const value = await req.body.voteValue;
  const post_title = await req.body.postTitle;

  const query = {
    user_id: user!._id,
    post_id: post_id,
  };

  try {
    const findVote = await Vote.findOne(query);
    let result;
    if (findVote) {
      if (findVote.value === value) {
        findVote.value = 0;
        await findVote.save();
      } else {
        findVote.value = value;
        await findVote.save();
      }
      result = findVote.value;
    } else {
      const newVote = new Vote({
        user_id: user!._id,
        username: user!.username,
        post_id: post_id,
        post_title: post_title,
        value: value,
      });

      const savedVote = await newVote.save();
      result = value;
    }
    const postVotes = await Vote.find({ post_id: post_id });
    const score = postVotes.reduce(
      (accumulated, curr) => accumulated + curr.value,
      0
    );
    const votes = postVotes.length;
    const hotness = votes / score;
    const updatedPost = await Post.findByIdAndUpdate(post_id, {
      votes: votes,
      score: score,
      hotness: hotness,
    });
    res.status(200).json({ score: score, userVote: result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllPosts,
  getPostsInSubgroup,
  createPost,
  getPost,
  editPost,
  deletePost,
  getSubs,
  addComment,
  addVote,
};
