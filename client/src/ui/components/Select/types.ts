export interface IOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  selectedOption: IOption;
  options: IOption[];
  onSelect: (optionValue: string) => void;
}