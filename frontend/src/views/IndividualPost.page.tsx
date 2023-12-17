import axios from "axios";
import DOMAIN from "../services/endpoint";
import { Title, Text, Paper, Container, Textarea, Button } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import NotFound from "./NotFound.page";
import { useForm } from "@mantine/form";
import { useUser } from "../store/store";

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
      <Title order={2}>{postData.title}</Title>
      <Text>(subgroup.{postData.subgroup})</Text>
      <Text>
        Posted by <strong>{postData.creator.uname}</strong> on{" "}
        {new Date(postData.timestamp).toString()}
      </Text>
      <Text>{postData.description}</Text>
      <br />
      <Title order={3}>Comments</Title>

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
