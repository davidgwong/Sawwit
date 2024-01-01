import {
  Container,
  Title,
  Text,
  SegmentedControl,
  Group,
  Pagination,
  Center,
} from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

interface postResponse {
  posts: DecoratedPost[];
  pages: number;
}

const PostList = () => {
  const [posts, setPosts] = useState([] as DecoratedPost[]);
  const [pages, setPages] = useState(0);
  const [sortBy, setSortBy] = useState("Date");
  const [activePage, setActivePage] = useState(1);

  const currentPath = useLocation().pathname;
  const endpoint =
    currentPath == "/" ? `${DOMAIN}/posts` : `${DOMAIN}` + currentPath;

  const handlePageChange = async (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const handleSortChange = async (sortBy: string) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const requestData = {
          pageNumber: activePage.toString(),
          sortBy: sortBy,
        };
        const queryParams = new URLSearchParams(requestData).toString();
        const res = await axios.get<postResponse>(endpoint + `?${queryParams}`);
        setPosts(res.data.posts);
        setPages(Number(res.data.pages));
      } catch (err) {}
    };
    getPost();
  }, [activePage, sortBy]);

  return (
    <Container>
      <Title order={1} my="sm">
        Welcome to Sawwit, the face page of the internet.
      </Title>
      <Group gap="xs" mb="xs">
        <Text>Sort by:</Text>
        <SegmentedControl
          radius="sm"
          size="sm"
          data={["Top", "Hot", "Controversial", "Date"]}
          onChange={handleSortChange}
          value={sortBy}
        />
      </Group>
      {posts.map((post: any) => (
        <PostCard post={post} key={post._id} />
      ))}
      <Center>
        <Pagination
          value={activePage}
          total={pages}
          boundaries={2}
          siblings={2}
          onChange={handlePageChange}
        />
      </Center>
    </Container>
  );
};

export default PostList;
