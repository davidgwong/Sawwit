import axios from "axios";
import PostList from "../components/PostList";

axios.defaults.withCredentials = true;

const AllPostListPage = () => {
  return <PostList />;
};

export default AllPostListPage;
