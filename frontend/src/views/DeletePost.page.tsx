import axios from "axios";
import DOMAIN from "../services/endpoint";
import { Link, useLoaderData } from "react-router-dom";
import { Center, Title, Text, Space, Container } from "@mantine/core";

const DeletePostPage = () => {
  const response = useLoaderData() as any;
  return (
    <Container>
      <Center><Title>Deleting post...</Title></Center>
      <Space h="xl" />
      <Center><Text>{response.message}</Text></Center>
      <Center><Link to="/">Click here to go back to home.</Link></Center>
    </Container>
  );
};

export const deletePostLoader = async ({ params }: { params: any }) => {
  try {
    const res = await axios.post(`${DOMAIN}/posts/delete/${params.id}`);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export default DeletePostPage;
