import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import LoginPage from "../views/Login.page";
import PostListPage from "../views/AllPostList.page";
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
import SubgroupPostListPage from "../views/SubgroupPostList.page";
import EditPostPage, { editPostLoader } from "../views/EditPost.page";

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
        <Route path="/" element={<PostListPage />} />
        <Route path="/newpost" element={ <ProtectedRoute isAllowed={isAuthenticated}> <NewPostPage /> </ProtectedRoute> } />
        <Route path="login" element={ <ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/"> <LoginPage /> </ProtectedRoute> } />
        <Route path="logout" element={<LogoutPage /> } />
        <Route path="register" element={ <ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/"> <RegisterPage /> </ProtectedRoute> } />
        <Route path="subgroups" element={<SubgroupsPage />} loader={subgroupsLoader} />
        <Route path="/subgroups/:subname" element={<SubgroupPostListPage />} />
        <Route path="/posts/show/:id" element={<IndividualPostPage />} loader={individualPostLoader} />
        <Route path="/posts/edit/:id" element={<ProtectedRoute isAllowed={isAuthenticated}> <EditPostPage /> </ProtectedRoute>} loader={editPostLoader} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default BrowserRouter;
