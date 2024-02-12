import React from 'react'
import { IOption, ISelectProps } from './types'

const Select: React.FC<ISelectProps> = ({ selectedOption, options, onSelect }) => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [currentOption, setCurrentOption] = React.useState<IOption>(selectedOption)

  const handleOptionClick = (optionValue: IOption) => {
    onSelect(optionValue.value)
    setCurrentOption(optionValue)
    setIsOpen(false)
  }

  React.useEffect(() => {
    setCurrentOption(selectedOption)
  }, [selectedOption])

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentOption.value}
      </button>
      {isOpen &&
        <ul>
          {options.map(option =>
            <li key={option.value}>
              <button
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            </li>
          )}
        </ul>
      }
    </div>
  )
}

export default Select