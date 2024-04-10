export interface IOption {
  value: any;
  label: string;
}

export interface ISelectProps {
  selectedOption: IOption;
  options: IOption[];
  onSelect: (optionValue: any) => void;
  onOpen?: () => void | boolean;
}
