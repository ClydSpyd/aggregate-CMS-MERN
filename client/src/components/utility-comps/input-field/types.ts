export interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  validityCheck?: (value: string) => boolean;
  additionalClass?: string;
  withDeleteBtn?: boolean;
  secure?: boolean;
  refProp?: React.RefObject<HTMLInputElement>;
  autofocus?: boolean;
}
