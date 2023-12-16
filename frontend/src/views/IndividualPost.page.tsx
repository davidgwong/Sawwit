import axios from "axios";
import DOMAIN from "../services/endpoint";
import { Title, Text, Paper, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import NotFound from "./NotFound.page";

const IndividualPostPage = () => {
  const postData = useLoaderData() as any;
  if (!postData) return <NotFound />;
  return (
    <Container>
      <Title order={2}>{postData.post.title}</Title>
      <Text>(subgroup.{postData.post.subgroup})</Text>
      <Text>
        Posted by <strong>{postData.post.creator.uname}</strong> on{" "}
        {new Date(postData.post.timestamp).toString()}
      </Text>
      <Text>{postData.post.description}</Text>
      <br />
      <Title order={3}>Comments</Title>

      {postData.post.comments.map((comment: any) => (
        <Paper key={comment.id}>
          <Text>{comment.description}</Text>
          <Text>
            Commented by <strong>{comment.creator.uname}</strong> on{" "}
            {new Date(comment.timestamp).toString()}
          </Text>
        </Paper>
      ))}
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
