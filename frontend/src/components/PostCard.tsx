import { Paper, Title, ActionIcon, Text, Grid, Anchor, Divider } from "@mantine/core";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./PostCard.module.css";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useUser } from "../store/store";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "./ConfirmDelete";

const PostCard = ({ post }: { post: any }) => {
  const { isAuthenticated, userId } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const canModifyPost = userId === post.creator.id;

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
    <Paper key={post.id}>
      <Grid align="Center">
        <Grid.Col span="content">
          <ActionIcon
            className={classes.button}
            color={upState ? "green" : "grey"}
            onClick={() => handleVote("up", post.id)}
            disabled={!isAuthenticated}
            id={"up" + post.id}
          >
            <FaChevronUp />
          </ActionIcon>

          <Text id={"score" + post.id} ta="center">
            {score}
          </Text>

          <ActionIcon
            className={classes.button}
            color={downState ? "red" : "grey"}
            onClick={() => handleVote("down", post.id)}
            disabled={!isAuthenticated}
            id={"down" + post.id}
          >
            <FaChevronDown />
          </ActionIcon>
        </Grid.Col>

        <Grid.Col span="auto">
          <Title order={2}>
            <Link to={"/posts/show/" + post.id}>{post.title}</Link>
          </Title>
          <Link to={"/subgroups/" + post.subgroup}>
            (subgroup.{post.subgroup})
          </Link>
          <Text>
            Posted by <strong>{post.creator.uname}</strong> on{" "}
            {new Date(post.timestamp).toString()}
            {canModifyPost ? (
              <>
                {" "}
                {" | "}
                <Link to={""}>Edit Post</Link> |{" "}
                <Anchor onClick={open}>Delete Post</Anchor>
              </>
            ) : (
              <></>
            )}
          </Text>
        </Grid.Col>
      </Grid>
      <ConfirmDelete
        typeId={post.id}
        opened={opened}
        openClose={{ open, close }}
        type="post"
      />
      <Divider my="sm"/>
    </Paper>
  );
};

export default PostCard;
