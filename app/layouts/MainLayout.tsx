import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../layouts/sidebar";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    // Gọi lại các hàm khởi tạo của Preline mỗi khi route thay đổi
    import("preline").then(() => {
      // @ts-ignore
      window.HSStaticMethods?.autoInit?.();
      // @ts-ignore
      window.HSOverlay?.autoInit?.();
      // @ts-ignore
      window.HSOverlayMinifier?.autoInit?.();
    });
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
