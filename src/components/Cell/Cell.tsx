import { ICell } from '@/types';

interface CellProps extends ICell {
  index: number;
  isSelected: boolean;
  selectCells: (index: number) => void;
}

export default function Cell({ id, name, vegetable, index, isSelected, selectCells }: CellProps) {
  const handleClick = () => {
    selectCells(index);
  };

  return (
    <div
      className={`cell cell-${id} icon-${vegetable} ${isSelected ? 'cell-selected' : ''}`}
      data-cell-name={name}
      data-vegetable={vegetable}
      role="gridcell"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
    ></div>
  );
}
