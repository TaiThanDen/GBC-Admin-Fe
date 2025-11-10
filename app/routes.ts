import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/MainLayout.tsx", [
    index("routes/home.tsx"),
    route("news", "routes/Blogs.tsx"),
    route("post/:id", "routes/EditPosts.tsx"),
    route("document", "routes/Documents.tsx"),
    route("document/:id", "routes/EditDocument.tsx"),
  ]),
  route("login", "routes/login.tsx"), 
] satisfies RouteConfig;