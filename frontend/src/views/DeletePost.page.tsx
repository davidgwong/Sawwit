import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useLoaderData } from "react-router-dom";
import { Center } from "@mantine/core";

const DeletePostPage = () => {
  const response = useLoaderData() as any;
  console.log(response.message);
  return <Center>{response.message}</Center>;
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
