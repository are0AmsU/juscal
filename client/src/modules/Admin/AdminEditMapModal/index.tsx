import React from 'react'
import Modal from '../../../components/Modal'
import { IMap } from '../../../ui/types'
import { IAdminPageContext, useAdminPageContext } from '../../../ui/contexts/AdminPageContext'

const AdminEditMapModal: React.FC = () => {

  const { isAddMapFormOpened, setIsAddMapFormOpened, editedMap, setEditedMap } = useAdminPageContext() as IAdminPageContext
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const newValuesRef = React.useRef<IMap | null>(null)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    newValuesRef.current!.name = event.target.value
  }

  const handleUpdateClick = (): void => {
    const updatedFields = []
    Object.keys(editedMap!).forEach(key => {
      const correctKey = key as keyof typeof editedMap
      if (editedMap![correctKey] === newValuesRef.current![correctKey]) {
        return
      }

    })
  }

  const handleModalClose = () => {
    setEditedMap(null)
  }

  React.useEffect(() => {
    if (editedMap) {
      newValuesRef.current = { ...editedMap }
      setIsOpen(true)
    } else {
      newValuesRef.current = null
      setIsOpen(false)
    }
  }, [editedMap])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={handleModalClose}>
      <div>
        <input
          type="text"
          defaultValue={newValuesRef.current?.name}
          onChange={handleNameChange}
        />
        <button
          onClick={handleUpdateClick}
        >
          Update
        </button>
      </div>
    </Modal>
  )
}

export default AdminEditMapModal