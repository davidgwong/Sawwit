import {
  Paper,
  Title,
  ActionIcon,
  Text,
  Grid,
  Anchor,
  Divider,
  Group,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./PostCard.module.css";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useUser } from "../store/store";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "./ConfirmDelete";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const PostCard = ({ post }: { post: any }) => {
  const { isAuthenticated, userId } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const canModifyPost = userId === post.creator.id;

  const [upState, setUpState] = useState(post.voteStatus === 1);
  const [downState, setDownState] = useState(post.voteStatus === -1);
  const [score, setScore] = useState(post.score);

  const navigate = useNavigate();

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
          <Stack gap={0}>
            <ActionIcon
              size="sm"
              variant="default"
              className={classes.button}
              onClick={() => handleVote("up", post.id)}
              disabled={!isAuthenticated}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              id={"down" + post.id}
            >
              <IconChevronUp
                stroke={4}
                id={"up" + post.id}
                color={upState ? "orange" : "lightgrey"}
              />
            </ActionIcon>

            <Text id={"score" + post.id} ta="center">
              {score}
            </Text>

            <ActionIcon
              size="sm"
              variant="default"
              className={classes.button}
              onClick={() => handleVote("down", post.id)}
              disabled={!isAuthenticated}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              id={"down" + post.id}
            >
              <IconChevronDown
                stroke={4}
                color={downState ? "deepskyblue" : "lightgrey"}
              />
            </ActionIcon>
          </Stack>
        </Grid.Col>

        <Grid.Col span="auto">
          <Group gap="xs">
            <Anchor onClick={() => navigate("/posts/show/" + post.id)}>
              <Title order={4}>{post.title}</Title>
            </Anchor>
            <Anchor onClick={() => navigate("/subgroups/" + post.subgroup)}>
              (subgroup.{post.subgroup})
            </Anchor>
          </Group>
          <Group gap={5}>
            <Text c="dimmed" size="sm">
              Posted by <strong>{post.creator.uname}</strong> on{" "}
              {new Date(post.timestamp).toString()}
            </Text>
            {canModifyPost ? (
              <>
                <Text c="dimmed" size="sm">
                  |
                </Text>
                <Anchor size="sm" onClick={() => navigate("/")}>
                  Edit Post
                </Anchor>
                <Text c="dimmed" size="sm">
                  |
                </Text>
                <Anchor size="sm" onClick={open}>
                  Delete Post
                </Anchor>
              </>
            ) : (
              <></>
            )}
          </Group>
        </Grid.Col>
      </Grid>
      <ConfirmDelete
        typeId={post.id}
        opened={opened}
        openClose={{ open, close }}
        type="post"
      />
      <Divider my="sm" />
    </Paper>
  );
};

export default PostCard;
