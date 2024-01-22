import AdminPage from "./pages/AdminPage";
import CrosshairPage from "./pages/CrosshairPage";
import EditMapPage from "./pages/EditMapPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import { IRoute } from "./ui/types";

export const routes: IRoute[] = [
  { path: '/admin', page: AdminPage },
  { path: '/home', page: HomePage },
  { path: '/crosshair', page: CrosshairPage },
  { path: '/map/:name', page: MapPage },
  { path: '/edit-map/:name', page: EditMapPage },
  { path: '*', page: HomePage },
]