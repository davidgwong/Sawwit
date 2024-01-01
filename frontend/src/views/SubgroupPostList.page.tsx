import axios from "axios";
import PostList from "../components/PostList";

axios.defaults.withCredentials = true;


const SubgroupPostListPage = () => {

  return <PostList  />;
};


export default SubgroupPostListPage;
