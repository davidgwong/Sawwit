import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import LoginPage, { loginLoader } from "../views/Login.page";
import PostListPage, { postsLoader } from "../views/PostList.page";
import Layout from "./Layout";
import NotFound from "../views/NotFound.page";
import RegisterPage from "../views/Register.page";
import SubgroupsPage, { subgroupsLoader } from "../views/Subgroups.page";
import IndividualPostPage, { individualPostLoader } from "../views/IndividualPost.page";
import LogoutPage from "../views/Logout.page";

const BrowserRouter = () => {
  /*
   * "/" - Root. Redirects to "/posts"
   * "/posts?sortBy"
   * "/posts/create"
   * "/posts/show/:id"
   * "/posts/edit/:id"
   * "/posts/deleteconfirm/:id"
   * "/subs/list"
   * "/subs/show/:id?sortBy"
   * "/auth/login"
   * "/auth/logout"
   * "/register"
   */

  const router = createHashRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/posts" element={<PostListPage />} loader={postsLoader} />
        <Route path="login" element={<LoginPage />} loader={loginLoader} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="subgroups" element={<SubgroupsPage />} loader={subgroupsLoader} />
        <Route path="/posts/show/:id" element={<IndividualPostPage />} loader={individualPostLoader} />
        <Route path="/" element={<PostListPage />} loader={postsLoader} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default BrowserRouter;
