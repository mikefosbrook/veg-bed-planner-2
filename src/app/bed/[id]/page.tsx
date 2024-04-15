'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBeds, deleteBed, updateBed } from '@/store/bedSlice';
import Cell from '@/components/Cell/Cell';
import VegSelect from '@/components/VegSelect/VegSelect';
import Spinner from '@/components/Spinner/Spinner';

import { vegList } from '@/data/vegetableData';
import { IBed } from '@/types';

export default function Bed({ params }: { params: { id: string } }) {
  const bedId = params.id;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { beds: bedData, fetching, error } = useAppSelector((state) => state.bed);
  const [currentBed, setCurrentBed] = useState<IBed | undefined>(undefined);
  const [currentVeg, setCurrentVeg] = useState<string>('');
  const [isSaved, setIsSaved] = useState(true);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);

  useEffect(() => {
    // only run if we don't already have bedData (if you land on this page directly)
    if (!bedData) {
      dispatch(fetchBeds());
    } else {
      const getBed = (bedId: string) => {
        return bedData.find((bed) => bed.id === bedId);
      };
      const currentBedData = getBed(bedId);

      if (currentBedData) {
        setCurrentBed(currentBedData);
      } else {
        router.push('/notfound');
      }
    }
  }, [bedData]);

  const selectCells = (index: number) => {
    let newSelectedCells = [...selectedCells];
    if (newSelectedCells.includes(index)) {
      newSelectedCells = newSelectedCells.filter((i) => i !== index);
    } else {
      newSelectedCells.push(index);
    }
    setSelectedCells(newSelectedCells);
  };

  const addVeg = (veg: string) => {
    if (veg === '') {
      alert('Please select a vegetable');
      return;
    }
    updateCells(veg);
  };

  const removeVeg = () => {
    updateCells('');
  };

  const updateCells = (value: string) => {
    if (!currentBed) {
      return;
    }

    // make a shallow copy of the currentBed with copies of the nested objects too, to avoid mutating state
    const newBedData = { ...currentBed, cells: currentBed.cells.map((cell) => ({ ...cell })) };
    selectedCells.forEach((i) => {
      newBedData.cells[i].vegetable = value;
    });

    // update the local state only
    setCurrentBed(newBedData);

    setSelectedCells([]);
    setIsSaved(false);
  };

  const removeBed = async () => {
    await dispatch(deleteBed(bedId));
    router.push('/');
  };

  const saveBed = async () => {
    if (!currentBed) {
      return;
    }
    await dispatch(updateBed(currentBed));
    setIsSaved(true);
  };

  return (
    <>
      {error && <div>Error: {error}</div>}

      {fetching && <Spinner />}

      <button onClick={() => saveBed()} disabled={isSaved}>
        Save
      </button>

      <VegSelect items={vegList} veg={currentVeg} setCurrentVeg={setCurrentVeg} />

      <div className="grid">
        <button
          onClick={() => {
            addVeg(currentVeg);
          }}
          disabled={!selectedCells.length || !currentVeg}
        >
          Apply selection
        </button>

        <button onClick={removeVeg} disabled={!selectedCells.length}>
          Clear selection
        </button>
      </div>

      {currentBed && (
        <>
          <h1 className="collapse-margin">{currentBed.name}</h1>

          <p>
            {currentBed.cellsX} x {currentBed.cellsY}
          </p>

          <div className="bed-container">
            <div className="bed" role="grid" style={{ gridTemplateColumns: 'auto '.repeat(currentBed.cellsX) }}>
              {currentBed.cells.map((cell, i) => {
                return (
                  <Cell
                    name={cell.name}
                    id={cell.id}
                    key={cell.id}
                    index={i}
                    vegetable={cell.vegetable}
                    selectCells={selectCells}
                    isSelected={selectedCells.includes(i)}
                  ></Cell>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              removeBed();
            }}
          >
            {fetching ? 'Deleting...' : 'Delete'}
          </button>
        </>
      )}
    </>
  );
}

// To Do - If the selected cells don't have a vegetable, don't allow the user to clear the selection
// To Do - UI - the delete button is too long, and prominent
// To Do - UI - the save button is too long
// To Do - the current bed could be a component
// To Do - the bed title could be editable
