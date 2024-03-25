import React from 'react'
import { CSSVariables, ITarget, NadeTypes, TargetTypes } from '../../../ui/types'
import { IAdminMapPageContext, useAdminMapPageContext } from '../../../ui/contexts/AdminMapPageContext'
import generateRandomNumber from '../../../ui/helpers/generateRandomNumber'
import Select from '../../../ui/components/Select/idnex'
import styles from './style.module.css'
import getCSSVariableByName from '../../../ui/helpers/getCSSVariableByName'
import { IGlobalContext, useGlobalContext } from '../../../ui/contexts/GlobalContext'
import getRandomElementFromArray from '../../../ui/helpers/getRandomElementFromArray'
import { INadePhoto } from './types'
import getImgUrlByFile from '../../../ui/helpers/getImgUrlByFile'
import { createNade } from '../../../http/nadeApi'
import { useParams } from 'react-router-dom'
import { targetIcons } from '../../../consts'

const AdminMapForm: React.FC = () => {

  const { mapId } = useParams()
  const { cssVariables } = useGlobalContext() as IGlobalContext
  const { targets, setTargets, nades, setNades } = useAdminMapPageContext() as IAdminMapPageContext
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [nadePhotos, setNadePhotos] = React.useState<INadePhoto[]>([])
  const nadeNameInputRef = React.useRef<HTMLInputElement>(null)
  const nadeDescriptionInputRef = React.useRef<HTMLInputElement>(null)
  const nadePhotoInputRef = React.useRef<HTMLInputElement>(null)
  const currentTarget = targets.find(target => target.isSelected)
  const nadeTargets = targets.filter(target => target.isNadeTarget)

  const handleCreateTargetClick = (): void => {
    const target: ITarget = {
      id: generateRandomNumber(10),
      type: TargetTypes.FROM,
      coordinates: [0, 0],
      isNadeTarget: false,
      isSelected: true,
      nadeType: null,
      icon: null,
      nadeIds: []
    }
    const newTargets = [...targets]
    newTargets.forEach(trg => {
      trg.isSelected = false
    })
    newTargets.push(target)
    setTargets(newTargets)
  }

  const handleTargetTypeSelect = (targetType: string): void => {
    if (currentTarget === undefined) {
      return
    }
    currentTarget.type = targetType as TargetTypes
    if (currentTarget.type === TargetTypes.FROM) {
      currentTarget.nadeType = null
      currentTarget.icon = null
    } else {
      currentTarget.nadeType = NadeTypes.SMOKE
      currentTarget.icon = targetIcons.smoke
    }
    setTargets([...targets.filter(target => target.id !== currentTarget.id), currentTarget])
  }

  const setTargetNadeType = (nadeType: NadeTypes) => {
    if (currentTarget === undefined) {
      return
    }
    currentTarget.nadeType = nadeType
    currentTarget.icon = targetIcons[nadeType]
    setTargets([...targets.filter(target => target.id !== currentTarget.id), currentTarget])
  }

  const handleTargetNadeTypeSelect = (targetNadeType: string) => {
    setTargetNadeType(targetNadeType as NadeTypes)
  }

  const handleAddTargetToFormClick = (): void => {
    if (nadeTargets.length >= 2 || currentTarget === undefined) {
      return
    }
    currentTarget.isNadeTarget = true
    setTargets([...targets.filter(target => target.id !== currentTarget.id), currentTarget])
  }

  const handleDeleteTargetFromFormClick = (): void => {
    if (currentTarget === undefined) {
      return
    }
    currentTarget.isNadeTarget = false
    setTargets([...targets.filter(target => target.id !== currentTarget.id), currentTarget])
  }

  const handleDeleteTarget = (): void => {
    if (currentTarget === undefined) {
      return
    }
    const newTargets = targets.filter(target => target.id !== currentTarget.id)
    const newCurrentTarget: ITarget = getRandomElementFromArray(newTargets)
    newTargets.map(target => {
      if (target.id === newCurrentTarget.id) {
        target.isSelected = true
      }
      return target
    })
    setTargets(newTargets)
  }

  const handleCreateNadeClick = async (): Promise<void> => {
    try {
      const name = nadeNameInputRef.current?.value
      const description = nadeDescriptionInputRef.current?.value
      const screenshots: File[] = []
      nadePhotos.forEach(nadePhoto => {
        screenshots.push(nadePhoto.file)
      })
      if (description === '' || name === '') {
        throw new Error('Не заполнены описание или имя')
      }
      if (nadePhotos.length === 0) {
        throw new Error('Нет фото')
      }
      if (nadeTargets.length !== 2) {
        throw new Error('Таргетов не 2')
      }
      const formData = new FormData()
      formData.append('nade', JSON.stringify({ name, description }))
      formData.append('targets', JSON.stringify(nadeTargets))
      screenshots.forEach(screenshot => {
        formData.append('screenshots', screenshot)
      })
      const nade = await createNade(String(mapId), formData)
      setNades([...nades, nade])
    } catch (error) {
      console.log((error as { message: string }).message)
    }
  }

  const handleNadePhotoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const setNewPhotoToNadePhotos = async () => {
      const file = (event.target as HTMLInputElement).files![0]
      const url = await getImgUrlByFile(file)
      setNadePhotos([...nadePhotos, { url, file }]);
      (event.target as HTMLInputElement).value = ''
    }
    setNewPhotoToNadePhotos()
  }

  return (
    <div
      className={styles.form}
      style={{ top: getCSSVariableByName(cssVariables, CSSVariables.HEADER_HIGHT) }}
    >
      {isOpen
        ?
        <>
          <button
            onClick={handleCreateNadeClick}
          >
            Create Nade
          </button>
          <p>Nade Name</p>
          <input
            ref={nadeNameInputRef}
            type="text"
          />
          <p>Nade Description</p>
          <input
            ref={nadeDescriptionInputRef}
            type="text"
          />
          <p>Nade Photos</p>
          <input
            ref={nadePhotoInputRef}
            type="file"
            onChange={handleNadePhotoChange}
          />
          {nadePhotos &&
            <div className={styles.nadeFormImgs}>
              {nadePhotos.map(nadePhoto =>
                <img
                  className={styles.nadeFormImg}
                  key={nadePhoto.url}
                  src={nadePhoto.url}
                  alt={nadePhoto.url + "Img"}
                />
              )}
            </div>
          }
          <button
            onClick={handleCreateTargetClick}
          >
            Create target
          </button>
          {currentTarget &&
            <div className={styles.targetForm}>
              <button
                onClick={handleDeleteTarget}
              >
                Delete Target
              </button>
              <button
                onClick={handleAddTargetToFormClick}
              >
                Add Target To Form
              </button>
              {nadeTargets.find(nadeTarget => nadeTarget.id === currentTarget.id) &&
                <button
                  onClick={handleDeleteTargetFromFormClick}
                >
                  Delete Target From Form
                </button>
              }
              <p>Select Target Type</p>
              <Select
                selectedOption={{ value: currentTarget.type, label: currentTarget.type }}
                onSelect={handleTargetTypeSelect}
                options={Object.values(TargetTypes).map(targetType => { return { value: targetType, label: targetType } })}
              />
              {currentTarget.type === TargetTypes.TO &&
                <>
                  <p>Select Nade Type</p>
                  <Select
                    selectedOption={{
                      value: currentTarget.nadeType ? currentTarget.nadeType as string : NadeTypes.SMOKE,
                      label: currentTarget.nadeType ? currentTarget.nadeType as string : NadeTypes.SMOKE
                    }}
                    onSelect={handleTargetNadeTypeSelect}
                    options={Object.values(NadeTypes).map(nadeType => { return { value: nadeType, label: nadeType } })}
                  />
                </>
              }
            </div>
          }
        </>
        :
        <button onClick={() => setIsOpen(true)}>Open Form</button>
      }
    </div>
  )
}

export default AdminMapForm