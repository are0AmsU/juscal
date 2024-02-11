import { CoordinatesType } from "../../../ui/types"

export default (event: React.MouseEvent, mapScale: number, mapImg: HTMLDivElement | null ): CoordinatesType => {
  const rect = mapImg?.getBoundingClientRect()
  const x = event.clientX - rect!.left
  const y = event.clientY - rect!.top
  const centerX = rect!.width / 2
  const centerY = rect!.height / 2
  const distanceX = centerX - x
  const distanceY = centerY - y
  return [distanceX / mapScale, distanceY / mapScale]
}