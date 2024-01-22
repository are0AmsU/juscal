import React from 'react'
import { useParams } from 'react-router-dom'
import Map from '../../modules/NadesMap'

const MapPage: React.FC = () => {

  const { name } = useParams()

  return (
    <Map />
  )
}

export default MapPage