import React from 'react'
import { CSSVariables, ITarget, TargetNadeTypes, TargetTypes } from '../../../ui/types'
import { IAdminMapPageContext, useAdminMapPageContext } from '../../../ui/contexts/AdminMapPageContext'
import generateRandomNumber from '../../../ui/helpers/generateRandomNumber'
import Select from '../../../ui/components/Select/idnex'
import styles from './style.module.css'
import getCSSVariableByName from '../../../ui/helpers/getCSSVariableByName'
import { IGlobalContext, useGlobalContext } from '../../../ui/contexts/GlobalContext'

const AdminMapForm: React.FC = () => {

  const { cssVariables } = useGlobalContext() as IGlobalContext
  const { targets, setTargets, currentTarget, setCurrentTarget, nadeTargets, setNadeTargets } = useAdminMapPageContext() as IAdminMapPageContext
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  console.log(currentTarget)

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
      }
      setCurrentTarget(newTarget)
      setTargets([...targets.filter(target => target.id !== currentTarget.id), newTarget])
    }
  }

  const handleTargetNadeTypeSelect = (optionValue: string) => {
    if (currentTarget) {
      const newTarget: ITarget = { ...currentTarget, nadeType: optionValue as TargetNadeTypes }
      setCurrentTarget(newTarget)
      setTargets([...targets.filter(target => target.id !== currentTarget.id), newTarget])
    }
  }

  const handleAddTargetToFormClick = (): void => {
    if (nadeTargets.length < 2 && currentTarget) {
      setNadeTargets([...nadeTargets, currentTarget])
    }
  }

  const handleDeleteTargetFromFormClick = (): void => {
    const newNadeTargets = nadeTargets.filter(nadeTarget => nadeTarget.id !== currentTarget?.id)
    setNadeTargets(newNadeTargets)
  }

  const handleCreateNadeClick = (): void => {

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
          <button
            onClick={handleCreateTargetClick}
          >
            Create target
          </button>
          {currentTarget &&
            <div>
              <p>Select Target Type</p>
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
              <Select
                selectedOption={{ value: currentTarget.type, label: currentTarget.type }}
                onSelect={handleTargetTypeSelect}
                options={Object.values(TargetTypes).map(value => { return { value: value as TargetTypes, label: value as TargetTypes } })}
              />
              {currentTarget.type === TargetTypes.TO &&
                <>
                  <p>Select</p>
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