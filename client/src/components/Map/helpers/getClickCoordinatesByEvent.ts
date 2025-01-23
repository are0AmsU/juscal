import { CoordinatesType } from "../../../ui/types";

export const getClickCoordinatesByEvent = (
  event: React.MouseEvent,
  mapScale: number,
  mapImg: HTMLDivElement | null
): CoordinatesType => {
  const rect = mapImg?.getBoundingClientRect();
  const clickX = event.clientX - rect!.left;
  const clickY = event.clientY - rect!.top;
  const distanceX = (clickX * 100) / mapImg!.offsetWidth / mapScale;
  const distanceY = (clickY * 100) / mapImg!.offsetHeight / mapScale;
  return [distanceX, distanceY];
};
