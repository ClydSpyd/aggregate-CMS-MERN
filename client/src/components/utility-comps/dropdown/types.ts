export interface DropwdownProps {
  options: { label: React.ReactNode; value: string | null }[];
  selected: string | null;
  onChange: (value: string | null) => void;
  additionalClass?: string;
}