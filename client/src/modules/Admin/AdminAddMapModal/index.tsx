import React from 'react'
import { createMap } from '../../../http/mapApi'
import { IMap } from '../../../ui/types'
import { IAdminPageContext, useAdminPageContext } from '../../../ui/contexts/AdminPageContext'

const AdminAddMapModal: React.FC = () => {

  const { maps, setMaps, setIsAddMapFormOpened } = useAdminPageContext() as IAdminPageContext
  const nameInputRef = React.useRef<HTMLInputElement>(null)
  const imgInputRef = React.useRef<HTMLInputElement>(null)
  const previewInputRef = React.useRef<HTMLInputElement>(null)

  const handleAddMapClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const name = nameInputRef.current?.value
    const img = imgInputRef.current?.files![0]
    const preview = previewInputRef.current?.files![0]
    if (name === '') {
      return
    }
    if (!img || !preview) {
      return
    }
    const formData = new FormData()
    formData.append('name', name as string)
    formData.append('img', img as File)
    formData.append('preview', preview as File)
    const newMap: IMap = await createMap(formData)
    setMaps([...maps, newMap])
    nameInputRef.current!.value = ''
    imgInputRef.current.value = ''
    previewInputRef.current.value = ''
    setIsAddMapFormOpened(false)
  }

  return (
    <div>
      <label htmlFor="name">
        Name
        <input ref={nameInputRef} id='name' type="text" name='name' />
      </label>
      <label htmlFor="img">
        Img
        <input ref={imgInputRef} id='img' type="file" name='img' />
      </label>
      <label htmlFor="preview">
        Preview
        <input ref={previewInputRef} id='preview' type="file" name='preview' />
      </label>
      <button
        onClick={handleAddMapClick}
      >
        Add Map
      </button>
    </div>
  )
}

export default AdminAddMapModal