import {
  Button,
  Center,
  Container,
  Loader,
  TextInput,
  Textarea,
} from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useForm } from "@mantine/form";
import {
  useLoaderData,
  useNavigate,
  defer,
  Await,
  useLocation,
  useAsyncValue,
} from "react-router-dom";
import { Suspense } from "react";

const EditForm = () => {
  const res = useAsyncValue() as any;

  const form = useForm({
    initialValues: {
      title: res.data.title,
      link: res.data.link,
      content: res.data.content,
      subgroup: res.data.subgroup,
    },
  });

  const navigate = useNavigate();

  const location = useLocation();
  const pathnameParts = location.pathname.split("/");
  const postId = pathnameParts[pathnameParts.length - 1];

  const handleEditPost = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${DOMAIN}/posts/edit/` + postId, form.values);
      navigate("/posts/show/" + postId);
    } catch (err) {}
  };
  return (
    <form onSubmit={handleEditPost}>
      <TextInput
        label="Title"
        description="Title of post"
        placeholder="Enter a title..."
        required
        {...form.getInputProps("title")}
      />
      <TextInput
        label="subgroup"
        description="subgroup of post"
        placeholder="Enter the subgroup..."
        required
        {...form.getInputProps("subgroup")}
      />
      <TextInput
        label="Link"
        description="Link of post"
        placeholder="Add a link..."
        required
        {...form.getInputProps("link")}
      />
      <Textarea
        label="Content"
        description="Content of post"
        placeholder="Add content..."
        autosize
        required
        {...form.getInputProps("content")}
      />
      <Button type="submit" mt="xl">
        Edit Post
      </Button>
    </form>
  );
};

const EditPostPage = () => {
  const loaderData = useLoaderData() as any;

  return (
    <Container>
      <Suspense
        fallback={
          <Center>
            <Loader />
          </Center>
        }
      >
        <Await resolve={loaderData.res} errorElement={<p>Error...</p>}>
          <EditForm />
        </Await>
      </Suspense>
    </Container>
  );
};

export const editPostLoader = ({ params }: { params: any }) => {
  const resPromise = axios.get(`${DOMAIN}/posts/show/${params.id}`);
  return defer({ res: resPromise });
};

export default EditPostPage;
