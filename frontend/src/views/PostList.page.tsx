import { Container, Title, Text, Paper, SegmentedControl } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

axios.defaults.withCredentials = true;

function sortPostBy(posts: any[], sortBy: string) {
  if (sortBy === "top") {
    return posts.sort((a, b) => b.score - a.score);
  }
  if (sortBy === "controversial") {
    return posts.sort((a, b) => b.votes.length - a.votes.length);
  }
  if (sortBy === "hot") {
    return posts.sort(
      (a, b) => b.score / b.votes.length - a.score / a.votes.length
    );
  }
  return posts.sort((a, b) => b.timestamp - a.timestamp);
}

const PostListPage = () => {
  const postData = useLoaderData() as any;
  const [sortBy, setSortBy] = useState("date");

  return (
    <Container size={1400}>
      <Title order={1} my="sm">
        Welcome to Sawwit, the face page of the internet.
      </Title>
      <Text>
        Sort by:
        <SegmentedControl
          radius="sm"
          size="sm"
          data={["Top", "Hot", "Controversial", "Date"]}
          onChange={(value) => setSortBy(value.toLowerCase())}
        />
      </Text>
      {sortPostBy(postData.posts, sortBy).map((post: any) => (
        <Paper key={post.id} withBorder p="md" my="sm">
          <Title order={2}>
            <Link to={"/posts/show/" + post.id}>{post.title}</Link>
          </Title>
          <Text>(subgroup.{post.subgroup})</Text>
          <Text>
            Posted by <strong>{post.creator.uname}</strong> on{" "}
            {new Date(post.timestamp).toString()}
          </Text>
          <Text>Score: {post.score}</Text>
        </Paper>
      ))}
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/posts`, {
    params: { sortBy: "date" },
  });
  return res.data;
};

export default PostListPage;
