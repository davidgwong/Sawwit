import {
  Box,
  Button,
  Center,
  Container,
  Loader,
  LoadingOverlay,
  TextInput,
  Textarea,
} from "@mantine/core";
import axios, { AxiosResponse } from "axios";
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
import { FormEvent, Suspense, useState } from "react";

const EditForm = () => {
  const res = useAsyncValue() as AxiosResponse<DecoratedPost>;

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

  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await axios.post(`${DOMAIN}/posts/edit/` + postId, form.values);
      setIsUpdating(false);
      navigate("/posts/show/" + postId);
    } catch (err) {}
  };
  return (
    <Box pos="relative">
      <LoadingOverlay visible={isUpdating} zIndex={1000} />
      <form onSubmit={handleEditPost}>
        <TextInput
          label="Title"
          description="Title of post"
          placeholder="Enter a title..."
          disabled={isUpdating}
          required
          {...form.getInputProps("title")}
        />
        <TextInput
          label="subgroup"
          description="subgroup of post"
          placeholder="Enter the subgroup..."
          disabled={isUpdating}
          required
          {...form.getInputProps("subgroup")}
        />
        <TextInput
          label="Link"
          description="Link of post"
          placeholder="Add a link..."
          disabled={isUpdating}
          required
          {...form.getInputProps("link")}
        />
        <Textarea
          label="Content"
          description="Content of post"
          placeholder="Add content..."
          disabled={isUpdating}
          autosize
          required
          {...form.getInputProps("content")}
        />
        <Button type="submit" mt="xl" disabled={isUpdating}>
          Edit Post
        </Button>
      </form>
    </Box>
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
  const resPromise: Promise<AxiosResponse<DecoratedPost>> = axios.get(
    `${DOMAIN}/posts/show/${params.id}`
  );
  return defer({ res: resPromise });
};

export default EditPostPage;
