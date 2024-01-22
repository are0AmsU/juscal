import React from 'react'
import { EditMapProvider } from '../../ui/contexts/EditMapContext'
import EditNadesMap from '../../modules/EditNadesMap'
import EditMapSideBar from '../../modules/EditNadeSideBar'

const EditMapPage: React.FC = () => {
  return (
    <EditMapProvider>
      <EditMapSideBar />
      <EditNadesMap />
    </EditMapProvider>
  )
}

export default EditMapPage