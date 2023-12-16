import { Paper, Title, ActionIcon, Text } from "@mantine/core";
import { BiLike, BiDislike } from "react-icons/bi";
import { Link } from "react-router-dom";
import classes from "./PostCard.module.css";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useUser } from "../store/store";
import { useState } from "react";

const PostCard = ({ post }: { post: any }) => {
  const { isAuthenticated } = useUser();

  const [upState, setUpState] = useState(post.voteStatus === 1);
  const [downState, setDownState] = useState(post.voteStatus === -1);
  const [score, setScore] = useState(post.score);

  const handleVote = async (val: "up" | "down", postId: number) => {
    try {
      const voteValue = val === "up" ? 1 : -1;
      const response: any = await axios.post(`${DOMAIN}/posts/vote/`, {
        voteValue: voteValue,
        postId: postId,
      });
      setScore(response.data.score);
      setUpState(response.data.userVote == 1);
      setDownState(response.data.userVote == -1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper key={post.id} withBorder p="md" my="sm">
      <Title order={2}>
        <Link to={"/posts/show/" + post.id}>{post.title}</Link>
      </Title>
      <Link to={"/subgroups/" + post.subgroup}>(subgroup.{post.subgroup})</Link>
      <Text>
        Posted by <strong>{post.creator.uname}</strong> on{" "}
        {new Date(post.timestamp).toString()}
      </Text>
      <Text id={"score" + post.id}>Score: {score}</Text>
      <ActionIcon
        className={classes.button}
        color={upState ? "green" : "grey"}
        onClick={() => handleVote("up", post.id)}
        disabled={!isAuthenticated}
        id={"up" + post.id}
      >
        <BiLike />
      </ActionIcon>{" "}
      <ActionIcon
        className={classes.button}
        color={downState ? "red" : "grey"}
        onClick={() => handleVote("down", post.id)}
        disabled={!isAuthenticated}
        id={"down" + post.id}
      >
        <BiDislike />
      </ActionIcon>
    </Paper>
  );
};

export default PostCard;
