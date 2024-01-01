import axios from "axios";
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
} from "@mantine/core";
import { useLoaderData, useNavigate } from "react-router-dom";
import NotFound from "./NotFound.page";
import { useForm } from "@mantine/form";
import { useUser } from "../store/store";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";

const IndividualPostPage = () => {
  const postData = useLoaderData() as DecoratedPost;
  if (!postData) return <NotFound />;

  const { isAuthenticated } = useUser();

  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  const navigate = useNavigate();

  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${DOMAIN}/posts/comment-create/` + postData._id, {
        newComment: form.values.comment,
        postTitle: postData.title,
      });
    } catch (err) {}
    navigate(0);
  };

  return (
    <Container>
      <PostCard post={postData} />
      <Paper withBorder p="sm">
        <Text style={{ whiteSpace: "pre-line" }}>{postData.content}</Text>
        <Space h="md" />
        <Group gap={5}>
          <Text fw={700}>Link:</Text>
          <Anchor href={postData.link}>{postData.link}</Anchor>
        </Group>
      </Paper>

      <Title order={3} mt="md">
        Comments
      </Title>

      <Divider my="sm" />

      {postData.comments.map((comment: any) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}

      {isAuthenticated ? (
        <form onSubmit={handleNewComment}>
          <Textarea
            label="Add a comment"
            placeholder="Enter your comment here..."
            autosize
            {...form.getInputProps("comment")}
          ></Textarea>
          <Button type="submit" mt="sm" variant="default">
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
