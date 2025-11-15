import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/MainLayout.tsx", [
    index("routes/News.tsx"), 
    route("post/:id", "routes/EditPosts.tsx"),
    route("document", "routes/Documents.tsx"),
    route("document/:id", "routes/EditDocument.tsx"),
    route("files", "routes/Files.tsx"),
    route("file/:id", "routes/EditFile.tsx"),
    route("videos", "routes/Videos.tsx"),
    route("video/:id", "routes/EditVideo.tsx"),
  ]),
  route("login", "routes/login.tsx"), 
] satisfies RouteConfig;