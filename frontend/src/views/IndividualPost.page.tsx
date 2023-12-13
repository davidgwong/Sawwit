import axios from "axios";
import DOMAIN from "../services/endpoint";

const IndividualPostPage = () => {
  return <></>;
};

export const individualPostLoader = async ({ params }: { params: any }) => {
  const res = await axios.get(`${DOMAIN}/show/${params.id}`);
  return res.data;
};

export default IndividualPostPage;
