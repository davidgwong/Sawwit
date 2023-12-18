import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import LoginPage from "../views/Login.page";
import PostListPage, {
  allPostsLoader,
  subgroupPostsLoader,
} from "../views/PostList.page";
import Layout from "./Layout";
import NotFound from "../views/NotFound.page";
import RegisterPage from "../views/Register.page";
import SubgroupsPage, { subgroupsLoader } from "../views/Subgroups.page";
import IndividualPostPage, {
  individualPostLoader,
} from "../views/IndividualPost.page";
import LogoutPage from "../views/Logout.page";
import NewPostPage from "../views/NewPost.page";
import ProtectedRoute from "../services/ProtectedRoute";
import { useUser } from "../store/store";
import DeletePostPage, { deletePostLoader } from "../views/DeletePost.page";

const BrowserRouter = () => {
  const { isAuthenticated } = useUser();

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
        <Route path="/" element={<PostListPage />} loader={allPostsLoader} />
        <Route
          path="/newpost"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <NewPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/delete/:id"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <DeletePostPage />
            </ProtectedRoute>
          }
          loader={deletePostLoader}
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="logout"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/">
              <LogoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="subgroups"
          element={<SubgroupsPage />}
          loader={subgroupsLoader}
        />
        <Route
          path="/subgroups/:subname"
          element={<PostListPage />}
          loader={subgroupPostsLoader}
        />
        <Route
          path="/posts/show/:id"
          element={<IndividualPostPage />}
          loader={individualPostLoader}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default BrowserRouter;
