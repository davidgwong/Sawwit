import {
  Box,
  Button,
  Container,
  LoadingOverlay,
  TextInput,
  Textarea,
} from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

const NewPostPage = () => {
  const form = useForm({
    initialValues: {
      title: "",
      link: "",
      content: "",
      subgroup: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${DOMAIN}/posts/create`, form.values);
      navigate("/posts/show/" + res.data.postId);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} />
        <form onSubmit={handleCreateNewPost}>
          <TextInput
            label="Title"
            description="Title of new post"
            placeholder="Enter a title..."
            disabled={loading}
            required
            {...form.getInputProps("title")}
          />
          <TextInput
            label="subgroup"
            description="subgroup of new post"
            placeholder="Enter the subgroup..."
            disabled={loading}
            required
            {...form.getInputProps("subgroup")}
          />
          <TextInput
            label="Link"
            description="Link of new post"
            placeholder="Add a link..."
            disabled={loading}
            required
            {...form.getInputProps("link")}
          />
          <Textarea
            label="Content"
            description="Content of new post"
            placeholder="Add content..."
            autosize
            disabled={loading}
            required
            {...form.getInputProps("content")}
          />
          <Button type="submit" mt="xl" disabled={loading}>
            Create New Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewPostPage;
