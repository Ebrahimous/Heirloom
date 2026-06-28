interface DecisionCardProps {
  choice: string;
  onSelect: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export default function DecisionCard({ choice, onSelect, disabled, selected }: DecisionCardProps) {
  return (
    <button
      className={`decision-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onSelect}
      disabled={disabled}
      type="button"
    >
      <span>{choice}</span>
      {!disabled && !selected && <span className="card-arrow">→</span>}
    </button>
  );
}
