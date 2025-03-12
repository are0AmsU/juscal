import AdminMapPage from "./pages/Admin/AdminMapPage";
import AdminPage from "./pages/Admin/AdminPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import { IRoute } from "./ui/types";

export const routes: IRoute[] = [
  { path: "/admin", page: AdminPage },
  { path: "/admin/map/:mapId", page: AdminMapPage },
  { path: "/home", page: HomePage },
  { path: "/map/:mapId", page: MapPage },
  { path: "*", page: HomePage },
];
