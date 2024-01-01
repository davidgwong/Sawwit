import { Button, Container, TextInput, Textarea } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useForm } from "@mantine/form";
import { useLoaderData, useNavigate } from "react-router-dom";

const EditPostPage = () => {
  const loaderData = useLoaderData() as DecoratedPost;
  const form = useForm({
    initialValues: {
      title: loaderData.title,
      link: loaderData.link,
      content: loaderData.content,
      subgroup: loaderData.subgroup,
    },
  });

  const navigate = useNavigate();

  const handleCreateNewPost = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${DOMAIN}/posts/edit/`+loaderData._id, form.values);
      navigate("/posts/show/" + loaderData._id);
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
          label="Content"
          description="Content of new post"
          placeholder="Add content..."
          autosize
          required
          {...form.getInputProps("content")}
        />
        <Button type="submit" mt="xl">
          Edit Post
        </Button>
      </form>
    </Container>
  );
};

export const editPostLoader = async ({ params }: { params: any }) => {
  const res = await axios.get(`${DOMAIN}/posts/show/${params.id}`);
  return res.data;
};

export default EditPostPage;
