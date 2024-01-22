import React from 'react'
import styles from './style.module.css'
import { IMapProps, IOnMouseDownDataRef, MapCursors } from './types'
import { isArrayEqual } from '../../ui/helpers/isArrayEqual'
import { CoordinatesType } from '../../ui/types'

const Map: React.FC<IMapProps> = ({ children, onMapClick }) => {

  const [mapScale, setMapScale] = React.useState<number>(1)
  const [mapPosition, setMapPosition] = React.useState<CoordinatesType>([0, 0])
  const [mapCursor, setMapCursor] = React.useState<MapCursors>(MapCursors.GRAB)
  const onMouseDownDataRef = React.useRef<IOnMouseDownDataRef>({ onMouseDownCoordinates: [0, 0], lastMapPositionCoordinates: [0, 0] })
  const mapRef = React.useRef<HTMLDivElement | null>(null)
  const mapImgRef = React.useRef<HTMLDivElement | null>(null)

  const handleMapWheel = (event: React.WheelEvent<HTMLDivElement>): void => {
    if (event.deltaY < 0 && mapScale < 3) {
      setMapScale(mapScale + 0.1)
      return
    }
    if (event.deltaY > 0 && mapScale > 1) {
      setMapScale(mapScale - 0.1)
      return
    }
  }

  const handleMapMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.buttons === 1) {
      if (isArrayEqual(onMouseDownDataRef.current.onMouseDownCoordinates, [0, 0])) {
        onMouseDownDataRef.current.onMouseDownCoordinates = [event.clientX, event.clientY]
        onMouseDownDataRef.current.lastMapPositionCoordinates = [mapPosition[0], mapPosition[1]]
      }
      setMapCursor(MapCursors.GRABBING)
      const newCoordinates = {
        x: onMouseDownDataRef.current.lastMapPositionCoordinates[0] + (event.clientX - onMouseDownDataRef.current.onMouseDownCoordinates[0]),
        y: onMouseDownDataRef.current.lastMapPositionCoordinates[1] + (event.clientY - onMouseDownDataRef.current.onMouseDownCoordinates[1])
      }
      if (mapImgRef.current) {
        if (Math.abs(newCoordinates.y) > mapImgRef.current.offsetHeight || Math.abs(newCoordinates.x) > mapImgRef.current.offsetWidth / 1.5) {
          return
        }
      }
      setMapPosition([newCoordinates.x, newCoordinates.y])
      return
    }
    onMouseDownDataRef.current = { onMouseDownCoordinates: [0, 0], lastMapPositionCoordinates: [0, 0] }
    setMapCursor(MapCursors.GRAB)
  }

  const handleMapImgClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapImgRef.current) {
      return
    }
    const rect = mapImgRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const distanceX = centerX - x
    const distanceY = centerY - y
    if (onMapClick) {
      onMapClick([distanceX, distanceY])
    }
    console.log(`clicked position = ${distanceX}x ${distanceY}y`)
  }

  return (
    <>
      {/* {info ?
        <div className={styles.wrapper}>
          <div
            ref={mapRef}
            className={styles.mapContainer}
            onMouseMove={handleMapMouseMove}
            onWheel={handleMapWheel}
          >
            <div
              onClick={handleMapImgClick}
              ref={mapImgRef}
              className={styles.mapImg}
              style={{
                cursor: mapCursor,
                transform: `scale(${mapScale}) translate(${mapPosition[0] / mapScale}px, ${mapPosition[1] / mapScale}px)`,
                backgroundImage: `url("${info.img}")`
              }}
            >
              {children}
            </div>
          </div>
        </div>
        :
        <h1>Loading</h1>} */}
    </>
  )
}

export default Map