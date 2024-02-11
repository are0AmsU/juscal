import React from 'react'
import AdminMap from '../../../modules/AdminMap/AdminMap'
import { AdminMapPageContextProvider } from '../../../ui/contexts/AdminMapPageContext'
import AdminMapAddNadeForm from '../../../modules/AdminMap/AdminMapForm'

const AdminMapPage: React.FC = () => {

  return (
    <AdminMapPageContextProvider>
      <AdminMapAddNadeForm />
      <AdminMap />
    </AdminMapPageContextProvider>
  )
}

export default AdminMapPage