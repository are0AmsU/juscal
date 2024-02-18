import React from 'react'
import { CSSVariables, INade, ITarget, TargetNadeTypes, TargetTypes } from '../../../ui/types'
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
import createFormDataFromObjectFields from '../../../ui/helpers/createFormDataFromObjectFields'

const AdminMapForm: React.FC = () => {

  const { cssVariables } = useGlobalContext() as IGlobalContext
  const { targets, setTargets, currentTarget, setCurrentTarget, nadeTargets, setNadeTargets } = useAdminMapPageContext() as IAdminMapPageContext
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [nadePhotos, setNadePhotos] = React.useState<INadePhoto[]>([])
  const nadeNameInputRef = React.useRef<HTMLInputElement>(null)
  const nadeDescriptionInputRef = React.useRef<HTMLInputElement>(null)
  const nadePhotoInputRef = React.useRef<HTMLInputElement>(null)

  const handleCreateTargetClick = (): void => {
    const target: ITarget = {
      id: generateRandomNumber(10),
      type: TargetTypes.FROM,
      coordinates: [0, 0],
      isSelected: true,
      nadeType: null
    }
    const newTargets = [...targets]
    newTargets.forEach(trg => {
      trg.isSelected = false
    })
    newTargets.push(target)
    setTargets(newTargets)
    setCurrentTarget(target)
  }

  const handleTargetTypeSelect = (optionValue: string): void => {
    if (currentTarget) {
      const newTarget: ITarget = { ...currentTarget, type: optionValue as TargetTypes }
      if (newTarget.type === TargetTypes.FROM) {
        newTarget.nadeType = null
      } else {
        newTarget.nadeType = TargetNadeTypes.SMOKE
      }
      setCurrentTarget(newTarget)
      setTargets([...targets.filter(target => target.id !== currentTarget.id), newTarget])
    }
  }

  const setTargetNadeType = (nadeType: TargetNadeTypes) => {
    if (currentTarget) {
      const newTarget: ITarget = { ...currentTarget, nadeType: nadeType }
      setCurrentTarget(newTarget)
      setTargets([...targets.filter(target => target.id !== currentTarget.id), newTarget])
    }
  }

  const handleTargetNadeTypeSelect = (optionValue: string) => {
    setTargetNadeType(optionValue as TargetNadeTypes)
  }

  const handleAddTargetToFormClick = (): void => {
    if (nadeTargets.length < 2 && currentTarget) {
      setNadeTargets([...nadeTargets, currentTarget])
    }
  }

  const deleteCurrentTargetFromForm = () => {
    const newNadeTargets = nadeTargets.filter(nadeTarget => nadeTarget.id !== currentTarget?.id)
    setNadeTargets(newNadeTargets)
  }

  const handleDeleteTargetFromFormClick = (): void => {
    deleteCurrentTargetFromForm()
  }

  const handleDeleteTarget = (): void => {
    const newTargets = targets.filter(target => target.id !== currentTarget?.id)
    const newCurrentTarget: ITarget = getRandomElementFromArray(newTargets)
    newTargets.map(target => {
      if (target.id === newCurrentTarget.id) {
        target.isSelected = true
      }
      return target
    })
    setTargets(newTargets)
    deleteCurrentTargetFromForm()
    setCurrentTarget(newCurrentTarget)
  }

  const handleCreateNadeClick = async (): Promise<void> => {
    const name = nadeNameInputRef.current?.value
    const description = nadeDescriptionInputRef.current?.value
    const fromTarget = nadeTargets.find(nadeTarget => nadeTarget.type === TargetTypes.FROM)
    const toTarget = nadeTargets.find(nadeTarget => nadeTarget.type === TargetTypes.TO)
    const screenshots: File[] = []
    nadePhotos.forEach(nadePhoto => {
      screenshots.push(nadePhoto.file)
    })
    if (description === '' || name === '') {
      return
    }
    if (nadePhotos.length === 0) {
      return
    }
    if (fromTarget === undefined || toTarget === undefined) {
      return
    }
    const nade = { name: name!, description: description!, targets: [fromTarget, toTarget], screenshots }
    const formData = createFormDataFromObjectFields(nade)
    await createNade(formData)
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
                  alt="Your Photo"
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
                options={Object.values(TargetTypes).map(value => { return { value: value as TargetTypes, label: value as TargetTypes } })}
              />
              {currentTarget.type === TargetTypes.TO &&
                <>
                  <p>Select Nade Type</p>
                  <Select
                    selectedOption={{
                      value: currentTarget.nadeType ? currentTarget.nadeType as string : TargetNadeTypes.SMOKE,
                      label: currentTarget.nadeType ? currentTarget.nadeType as string : TargetNadeTypes.SMOKE
                    }}
                    onSelect={handleTargetNadeTypeSelect}
                    options={Object.values(TargetNadeTypes).map(value => { return { value: value as TargetNadeTypes, label: value as TargetNadeTypes } })}
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