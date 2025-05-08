import { Home, Profile, SignIn, SignUp } from "@/pages";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { element } from "prop-types";
import ProtectedRoute from "./pages/ProtectedRoute";
import PostDetails from "./pages/newsFeed/PostDetails";
import PostFeed from "./pages/newsFeed";

export const routes = [
  // {
  //   name: "home",
  //   path: "/home",
  //   element: <Home />,
  // },
  {
    name: "dashboard",
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    name: "dashboard",
    path: "/dashboard",
    element: (
        <AdminDashboard />
    ),
  },
  {
    name: "feed",
    path: "/feed",
    element: (
        <PostFeed />
    ),
  },

  {
    name: "post/:id",
    path: "/post/:id",
    element: (
      <PostDetails />
    ),
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
];

export default routes;
