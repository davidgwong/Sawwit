import axios, { AxiosResponse } from "axios";
import DOMAIN from "../services/endpoint";
import {
  Title,
  Text,
  Container,
  Textarea,
  Button,
  Anchor,
  Group,
  Divider,
  Paper,
  Space,
  Center,
  Loader,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import NotFound from "./NotFound.page";
import { useForm } from "@mantine/form";
import { useUser } from "../store/store";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import { Suspense, useState } from "react";

const IndividualPost = () => {
  const res = useAsyncValue() as AxiosResponse<DecoratedPost>;
  const postId = res.data._id;
  if (!res.data) return <NotFound />;
  const { isAuthenticated } = useUser();

  const [postComments, setPostComments] = useState(
    res.data.comments as Comment[]
  );

  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  const [addingComment, setAddingComment] = useState(false);

  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setAddingComment(true);
      await axios.post(`${DOMAIN}/posts/comment-create/` + postId, {
        newComment: form.values.comment,
        postTitle: res.data.title,
      });

      const comments = await axios.get(`${DOMAIN}/comments/`, {
        params: {
          postId: postId,
        },
      });
      setPostComments(comments.data);
    } catch (err) {
    } finally {
      form.reset();
      setAddingComment(false);
    }
  };

  return (
    <>
      <PostCard post={res.data} />
      <Paper withBorder p="sm">
        <Text style={{ whiteSpace: "pre-line" }}>{res.data.content}</Text>
        <Space h="md" />
        <Group gap={5}>
          <Text fw={700}>Link:</Text>
          <Anchor href={res.data.link}>{res.data.link}</Anchor>
        </Group>
      </Paper>

      <Title order={3} mt="md">
        Comments
      </Title>

      <Divider my="sm" />

      {postComments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          setPostComments={setPostComments}
        />
      ))}

      {isAuthenticated ? (
        <Box pos="relative">
          <LoadingOverlay visible={addingComment} zIndex={1000} />
          <form onSubmit={handleNewComment}>
            <Textarea
              label="Add a comment"
              placeholder="Enter your comment here..."
              autosize
              disabled={addingComment}
              {...form.getInputProps("comment")}
            ></Textarea>
            <Button
              type="submit"
              mt="sm"
              variant="default"
              disabled={addingComment}
            >
              Add comment
            </Button>
          </form>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

const IndividualPostPage = () => {
  const postData = useLoaderData() as any;

  return (
    <Container>
      <Suspense
        fallback={
          <Center>
            <Loader />
          </Center>
        }
      >
        <Await resolve={postData.res} errorElement={<p>Error...</p>}>
          <IndividualPost />
        </Await>
      </Suspense>
    </Container>
  );
};

export const individualPostLoader = ({ params }: { params: {id: string} }) => {
  const resPromise: Promise<AxiosResponse<DecoratedPost>> = axios.get(
    `${DOMAIN}/posts/show/${params.id}`
  );
  return defer({ res: resPromise });
};

export default IndividualPostPage;
