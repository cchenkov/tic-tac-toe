type SquareProps = { value: string | undefined, onClick: () => void };

function Square({ value, onClick } : SquareProps) {
  return (
    <button data-testid="square" className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
