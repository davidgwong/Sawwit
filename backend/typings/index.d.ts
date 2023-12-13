declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}

declare global {
  namespace Express {
    interface User {
      id: number;
      uname: string;
      password: string;
    }
  }

  interface Comment {
    id: number;
    post_id: number;
    creator: number;
    description: string;
    timestamp: number;
  }

  interface DecoratedComment extends Comment {
    creator: Express.User;
  }

  interface Reply {
    id: number;
    comment_id: number;
    creator: number;
    description: string;
    timestamp: number;
  }

  interface DecoratedReply extends Reply {
    creator: Express.User;
  }

  interface Post {
    id: number;
    title: string;
    link: string;
    description: string;
    creator: number;
    subgroup: string;
    timestamp: number;
  }

  interface DecoratedPost extends Post {
    creator: Express.user;
    votes: Vote[];
    comments: DecoratedComment[];
    score: number;
  }

  interface Vote {
    user_id: number;
    post_id: number;
    value: number;
    vote_id: number;
  }
}

export { User, Comment, DecoratedComment, Post, DecoratedPost, Vote, SessionData, Reply, DecoratedReply };
