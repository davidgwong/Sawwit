import { Container, Title, Text, Paper } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useLoaderData } from "react-router-dom";
import SortByControl from "../components/SortByControl";

const PostsPage = () => {
  const postData = useLoaderData() as any;
  return (
    <Container size={1400}>
      <Title order={1}>Welcome to Sawwit, the face page of the internet.</Title>
      <SortByControl />
      {postData.posts.map((post: any) => (
        <Paper key={post.id} withBorder p="md" m="sm">
          <Title order={2}>{post.title}</Title>
          <Text>(subgroup.{post.subgroup})</Text>
          <Text>
            Posted by <strong>{post.creator.uname}</strong> on{" "}
            {new Date(post.timestamp).toString()}
          </Text>
          <Text>{post.description}</Text>
        </Paper>
      ))}
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/posts/`);
  return res.data;
};

export default PostsPage;
