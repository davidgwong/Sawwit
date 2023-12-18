import { Button, Container, TextInput, Textarea } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const form = useForm({
    initialValues: {
      title: "",
      link: "",
      description: "",
      subgroup: "",
    },
  });

  const navigate = useNavigate();

  const handleCreateNewPost = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${DOMAIN}/posts/create`, form.values);
      navigate("/posts/show/" + res.data.postId);
    } catch (err) {}
  };

  return (
    <Container>
      <form onSubmit={handleCreateNewPost}>
        <TextInput
          label="Title"
          description="Title of new post"
          placeholder="Enter a title..."
          required
          {...form.getInputProps("title")}
        />
        <TextInput
          label="subgroup"
          description="subgroup of new post"
          placeholder="Enter the subgroup..."
          required
          {...form.getInputProps("subgroup")}
        />
        <TextInput
          label="Link"
          description="Link of new post"
          placeholder="Add a link..."
          required
          {...form.getInputProps("link")}
        />
        <Textarea
          label="Description"
          description="Description of new post"
          placeholder="Add a description..."
          required
          {...form.getInputProps("description")}
        />
        <Button type="submit" mt="xl">
          Create New Post
        </Button>
      </form>
    </Container>
  );
};

export default NewPostPage;
