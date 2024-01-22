import React from 'react'
import AdminEditMapModal from '../../modules/Admin/AdminEditMapModal'
import { AdminPageContextProvider, IAdminPageContext, useAdminPageContext } from '../../ui/contexts/AdminPageContext'
import providerObserve from '../../ui/helpers/providerObserve'
import AdminAddMapModal from '../../modules/Admin/AdminAddMapModal'
import AdminMapList from '../../modules/Admin/AdminMapList'

const AdminPage: React.FC = providerObserve(AdminPageContextProvider, () => {

  const { editedMap, isAddMapFormOpened } = useAdminPageContext() as IAdminPageContext

  return (
    <>
      <AdminMapList />
      {isAddMapFormOpened && <AdminAddMapModal />}
      {editedMap && <AdminEditMapModal />}
    </>
  )
})

export default AdminPage