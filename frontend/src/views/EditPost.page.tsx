import axios from "axios";
import DOMAIN from "../services/endpoint";

const EditPostPage = () => {
  return <></>;
};

export const editPostLoader = async ({ params }: { params: any }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default EditPostPage;
