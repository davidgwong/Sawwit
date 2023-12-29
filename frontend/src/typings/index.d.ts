declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}

declare global {
  namespace Express {
    interface User {
      _id: Schema.Types.ObjectId;
      username: string;
      password: string;
    }
  }

  interface Comment {
    _id: Schema.Types.ObjectId;
    post_id: Schema.Types.ObjectId;
    post_title: string;
    creator_id: Schema.Types.ObjectId;
    creator_username: string;
    content: string;
    timestamp: number;
  }

  interface Reply {
    id: number;
    comment_id: number;
    creator: number;
    content: string;
    timestamp: number;
  }

  interface Post {
    title: string;
    link: string;
    content: string;
    creator_id: Schema.Types.ObjectId;
    creator_username: string;
    subgroup: string;
    timestamp: number;
    _id: Schema.Types.ObjectId;
  }

  interface DecoratedPost extends Post {
    votes: Vote[];
    comments: Comment[];
    score: number;
    voteStatus: number;
  }

  interface Vote {
    user_id: Schema.Types.ObjectId;
    username: string;
    post_id: Schema.Types.ObjectId;
    post_title: string;
    value: number;
  }
}

export { User, Comment, DecoratedComment, Post, DecoratedPost, Vote, SessionData, Reply, DecoratedReply };
