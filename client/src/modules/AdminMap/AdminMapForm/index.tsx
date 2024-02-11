import React from 'react'
import { IAdminMapFormInfo } from './types'
import { ITarget, NadeTargetTypes } from '../../../ui/types'
import { IAdminMapPageContext, useAdminMapPageContext } from '../../../ui/contexts/AdminMapPageContext'
import * as uuid from 'uuid'
import generateRandomNumber from '../../../ui/helpers/generateRandomNumber'

const AdminMapForm: React.FC = () => {

  const { targets, setTargets } = useAdminMapPageContext() as IAdminMapPageContext
  const [info, setInfo] = React.useState<IAdminMapFormInfo>({ currentTarget: null })
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleCreateTargetClick = (): void => {
    const target: ITarget = {
      id: generateRandomNumber(10),
      type: NadeTargetTypes.FROM,
      coordinates: [0, 0],
      isSelected: true,
    }
    const newTargets = [...targets]
    newTargets.forEach(trg => {
      trg.isSelected = false
    })
    newTargets.push(target)
    setInfo({ ...info, currentTarget: target })
    setTargets(newTargets)
  }

  if (!isOpen) {
    return <button onClick={() => setIsOpen(true)}>Add Nade</button>
  }

  return (
    <div>
      <button
        onClick={handleCreateTargetClick}
      >
        Create target
      </button>
    </div>
  )
}

export default AdminMapForm