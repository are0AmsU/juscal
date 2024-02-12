import React from 'react'
import Map from '../../../components/Map'
import { useParams } from 'react-router-dom'
import { IAdminMapPageParams } from '../../../pages/Admin/AdminMapPage/types'
import { CoordinatesType, IMap, INade, ITarget } from '../../../ui/types'
import { getMapAndNadesByMapName } from '../../../http/adminMapApi'
import { IAdminMapPageContext, useAdminMapPageContext } from '../../../ui/contexts/AdminMapPageContext'
import Target from '../../../ui/components/Target/idnex'

const AdminMap: React.FC = () => {

  const { name } = useParams() as IAdminMapPageParams
  const { targets, setTargets, currentTarget, setCurrentTarget, nadeTargets, setNadeTargets } = useAdminMapPageContext() as IAdminMapPageContext
  const [nades, setNades] = React.useState<INade[]>([])
  const [map, setMap] = React.useState<IMap | null>(null)
  const isTargetMovingRef = React.useRef<boolean>(false)
  const isSpacePressedRef = React.useRef<boolean>(false)

  const handleTargetMouseUp = (event: React.MouseEvent<HTMLButtonElement>, target: ITarget) => {
  }

  const handleTargetMouseDown = (event: React.MouseEvent<HTMLButtonElement>, target: ITarget) => {
    if (isSpacePressedRef.current) {
      return
    }
    isTargetMovingRef.current = true
    const newTargets = [...targets]
    newTargets.forEach(trg => {
      if (trg.id === target.id) {
        trg.isSelected = true
        return
      }
      trg.isSelected = false
    })
    setCurrentTarget(target)
    setTargets(newTargets)
  }

  const handleMapMouseMove = (curretCoordinates: CoordinatesType): void => {
    if (isTargetMovingRef.current) {
      const newTargets = [...targets]
      newTargets.forEach(trg => {
        if (trg.isSelected) {
          trg.coordinates = curretCoordinates
        }
      })
      setTargets(newTargets)
    }
  }

  const handleMapMouseDown = (coordinates: CoordinatesType, event: React.MouseEvent, isSpacePressed: boolean): void => {
    isSpacePressedRef.current = isSpacePressed
    if ((event.target as HTMLElement).tagName !== 'BUTTON') {
      isTargetMovingRef.current = false
    }
  }

  const handleMapMouseUp = (): void => {
    isTargetMovingRef.current = false
  }

  React.useEffect(() => {
    const setMapAndNades = async () => {
      const { map, nades } = await getMapAndNadesByMapName(name!)
      setMap(map)
    }
    setMapAndNades()
  }, [name])

  if (!map) {
    return <h2>Loading</h2>
  }

  return (
    <Map
      info={map}
      onMouseMove={handleMapMouseMove}
      onMouseDown={handleMapMouseDown}
      onMouseUp={handleMapMouseUp}
    >
      {targets.map(target =>
        <Target
          key={target.id}
          info={target}
          isNadeTarget={nadeTargets.find(nadeTarget => nadeTarget.id === target.id) ? true : false}
          onMouseUp={(event) => handleTargetMouseUp(event, target)}
          onMouseDown={(event) => handleTargetMouseDown(event, target)}
        />)}
    </Map>
  )
}

export default AdminMap