import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import LoginPage from "../views/Login.page";
import PostsPage, { postsLoader } from "../views/Posts.page";
import Layout from "./Layout";
import NotFound from "../views/NotFound.page";
import RegisterPage from "../views/Register.page";
import SubgroupsPage, { subgroupsLoader } from "../views/Subgroups.page";

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
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="subgroups" element={<SubgroupsPage />} loader={subgroupsLoader} />
        <Route path="/" element={<PostsPage />} loader={postsLoader} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default BrowserRouter;
