import React from 'react'
import { createMap } from '../../../http/mapApi'
import { IAddMapFormInfo } from '../../../ui/types'

const AdminAddMapModal: React.FC = () => {
  
  const [addFormInfo, setAddFormInfo] = React.useState<IAddMapFormInfo>({ name: '', img: null, preview: null })
  
  const handleAddMapClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    if (addFormInfo.name === '') {
      return
    }
    if (!addFormInfo.img || !addFormInfo.preview) {
      return
    }
    const formData = new FormData()
    formData.append('name', addFormInfo.name)
    formData.append('img', addFormInfo.img)
    formData.append('preview', addFormInfo.preview)
    await createMap(formData)
  }

  const handleAddFormImgInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setAddFormInfo({ ...addFormInfo, img: event.target.files[0] })
    }
  }

  const handleAddFormPreviewInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setAddFormInfo({ ...addFormInfo, preview: event.target.files[0] })
    }
  }

  return (
    <div>
      <label htmlFor="name">
        Name
        <input id='name' type="text" name='name' onChange={event => setAddFormInfo({ ...addFormInfo, name: event.target.value })} />
      </label>
      <label htmlFor="img">
        Img
        <input id='img' type="file" name='img' onChange={handleAddFormImgInputChange} />
      </label>
      <label htmlFor="preview">
        Preview
        <input id='preview' type="file" name='preview' onChange={handleAddFormPreviewInputChange} />
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