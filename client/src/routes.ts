import AdminMapPage from "./pages/Admin/AdminMapPage";
import AdminPage from "./pages/Admin/AdminPage";
import CrosshairPage from "./pages/CrosshairPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import { IRoute } from "./ui/types";

export const routes: IRoute[] = [
  { path: '/admin', page: AdminPage },
  { path: '/admin/map/:name', page: AdminMapPage },
  { path: '/home', page: HomePage },
  { path: '/crosshair', page: CrosshairPage },
  { path: '/map/:name', page: MapPage },
  { path: '*', page: HomePage },
]