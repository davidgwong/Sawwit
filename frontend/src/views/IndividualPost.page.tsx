import axios from "axios";
import DOMAIN from "../services/endpoint";
import { Title, Text, Paper } from "@mantine/core";
import { useLoaderData } from "react-router-dom";

const IndividualPostPage = () => {
  const postData = useLoaderData() as any;
  return (
    <>
      <Title order={2}>{postData.post.title}</Title>
      <Text>(subgroup.{postData.post.subgroup})</Text>
      <Text>
        Posted by <strong>{postData.post.creator.uname}</strong> on{" "}
        {new Date(postData.post.timestamp).toString()}
      </Text>
      <Text>{postData.post.description}</Text>
      <br />
      <Title order={3}>Comments</Title>

      {postData.post.comments.map((comment: any) => (
        <Paper key={comment.id}>
          <Text>{comment.description}</Text>
          <Text>
            Commented by <strong>{comment.creator.uname}</strong> on{" "}
            {new Date(comment.timestamp).toString()}
          </Text>
        </Paper>
      ))}
      
    </>
  );
};

export const individualPostLoader = async ({ params }: { params: any }) => {
  const res = await axios.get(`${DOMAIN}/posts/show/${params.id}`);
  return res.data;
};

export default IndividualPostPage;
