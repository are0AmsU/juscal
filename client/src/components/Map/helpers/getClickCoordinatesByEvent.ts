import { CoordinatesType } from "../../../ui/types";

export const getClickCoordinatesByEvent = (
  event: React.MouseEvent,
  mapScale: number,
  mapImg: HTMLDivElement | null
): CoordinatesType | null => {
  const rect = mapImg?.getBoundingClientRect();
  if (!rect) return null;
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  const distanceX = (clickX * 100) / mapImg!.offsetWidth / mapScale;
  const distanceY = (clickY * 100) / mapImg!.offsetHeight / mapScale;
  return [distanceX, distanceY];
};
