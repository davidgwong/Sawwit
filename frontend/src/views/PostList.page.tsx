import { Container, Title, Text, SegmentedControl } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import PostCard from "../components/PostCard";

axios.defaults.withCredentials = true;

function sortPostBy(posts: any[], sortBy: string) {
  sortBy = sortBy.toLowerCase();
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
  const postData = useLoaderData() as DecoratedPost[];
  const [sortBy, setSortBy] = useState("Date");

  return (
    <Container>
      <Title order={1} my="sm">
        Welcome to Sawwit, the face page of the internet.
      </Title>
      <Text>Sort by:</Text>
      <SegmentedControl
        mb="sm"
        radius="sm"
        size="sm"
        data={["Top", "Hot", "Controversial", "Date"]}
        onChange={(value) => setSortBy(value)}
        value={sortBy}
      />
      {sortPostBy(postData, sortBy).map((post: any) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Container>
  );
};

export const allPostsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/posts`);
  return res.data;
};

export const subgroupPostsLoader = async ({ params }: { params: any }) => {
  const res = await axios.get(`${DOMAIN}/subs/show/${params.subname}`);
  return res.data;
};

export default PostListPage;
