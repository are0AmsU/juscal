import React from 'react'
import { useNadesMap } from '../../ui/hooks/useNadesMap'
import Map from '../../components/Map'
import MapTarget from '../../components/MapTarget'
import { IEditMapContext, useEditMapContext } from '../../ui/contexts/EditMapContext'

const EditNadesMap: React.FC = () => {

  const { mapOnClick } = useEditMapContext() as IEditMapContext

  return (
    <>
    </>
  )
}

export default EditNadesMap