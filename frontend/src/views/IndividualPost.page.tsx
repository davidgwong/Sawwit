import axios from "axios";
import DOMAIN from "../services/endpoint";
import {
  Title,
  Text,
  Paper,
  Container,
  Textarea,
  Button,
  Anchor,
  Group,
} from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import NotFound from "./NotFound.page";
import { useForm } from "@mantine/form";
import { useUser } from "../store/store";
import PostCard from "../components/PostCard";

const IndividualPostPage = () => {
  const postData = useLoaderData() as DecoratedPost;
  if (!postData) return <NotFound />;

  const { isAuthenticated } = useUser();

  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  const handleNewComment = async () => {
    try {
      const res = await axios.post(
        `${DOMAIN}/posts/comment-create/` + postData.id,
        { newComment: form.values.comment }
      );
      console.log(res);
    } catch (err) {}
  };

  return (
    <Container>
      <PostCard post={postData} />

      <Text>{postData.description}</Text>
      <Group gap={5}>
        <Text fw={700}>Link: </Text>
        <Anchor href={postData.link}>{postData.link}</Anchor>{" "}
      </Group>

      <Title order={3} mt="md">
        Comments
      </Title>

      {postData.comments.map((comment: any) => (
        <Paper key={comment.id}>
          <Text>{comment.description}</Text>
          <Text>
            Commented by <strong>{comment.creator.uname}</strong> on{" "}
            {new Date(comment.timestamp).toString()}
          </Text>
        </Paper>
      ))}

      {isAuthenticated ? (
        <form onSubmit={handleNewComment}>
          <Text mt="sm">Add a comment</Text>
          <Textarea {...form.getInputProps("comment")}></Textarea>
          <Button type="submit" mt="sm">
            Add comment
          </Button>
        </form>
      ) : (
        <></>
      )}
    </Container>
  );
};

export const individualPostLoader = async ({ params }: { params: any }) => {
  try {
    const res = await axios.get(`${DOMAIN}/posts/show/${params.id}`);
    return res.data;
  } catch (err) {
    return null;
  }
};

export default IndividualPostPage;
