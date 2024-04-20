import React from "react";
import { IOption, ISelectProps } from "./types";

const Select: React.FC<ISelectProps> = ({
  selectedOption,
  options,
  onSelect,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleOpenClick = (): void => {
    if (onOpen) {
      const isReturn = onOpen();
      if (isReturn === true) {
        return;
      }
    }
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: IOption) => {
    onSelect(optionValue.value);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenClick}>{selectedOption.label}</button>
      {isOpen && (
        <ul>
          {options
            .filter((option) => option.label !== selectedOption.label)
            .map((option) => (
              <li key={option.label}>
                <button onClick={() => handleOptionClick(option)}>
                  {option.label}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
