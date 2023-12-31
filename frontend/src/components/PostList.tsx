import {
  Container,
  Title,
  Text,
  SegmentedControl,
  Group,
  Pagination,
  Center,
  Loader,
} from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";
import { useGetPostTrigger } from "../store/store";

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
  const [loading, setLoading] = useState(true);
  const { getPostTrigger} = useGetPostTrigger();

  const currentPath = useLocation().pathname;
  const endpoint =
    currentPath == "/" ? `${DOMAIN}/posts` : `${DOMAIN}` + currentPath;

  const pathnameParts = useLocation().pathname.split("/");
  const pathId = pathnameParts[pathnameParts.length - 1];

  const handlePageChange = async (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const handleSortChange = async (sortBy: string) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const requestData = {
          pageNumber: activePage.toString(),
          sortBy: sortBy,
        };
        const queryParams = new URLSearchParams(requestData).toString();
        const res = await axios.get<postResponse>(endpoint + `?${queryParams}`);
        setPosts(res.data.posts);
        setPages(Number(res.data.pages));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [activePage, sortBy, getPostTrigger]);

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

      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Text my="sm">
            {currentPath == "/"
              ? "Showing posts from all subgroups"
              : `Showing posts from ${pathId} subgroup`}
          </Text>
          {posts.map((post) => (
            <PostCard
              post={post}
              key={post._id}
            />
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
        </>
      )}
    </Container>
  );
};

export default PostList;
