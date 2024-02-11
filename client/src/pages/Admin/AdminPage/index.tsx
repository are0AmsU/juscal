import React from 'react'
import AdminEditMapModal from '../../../modules/Admin/AdminEditMapModal'
import { AdminPageContextProvider } from '../../../ui/contexts/AdminPageContext'
import AdminAddMapModal from '../../../modules/Admin/AdminAddMapModal'
import AdminMapList from '../../../modules/Admin/AdminMapList'

const AdminPage: React.FC = () => {

  return (
    <AdminPageContextProvider>
      <AdminMapList />
      <AdminAddMapModal />
      <AdminEditMapModal />
    </AdminPageContextProvider>
  )
}

export default AdminPage