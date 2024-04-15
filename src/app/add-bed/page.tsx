'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBeds, createBed, clearRecentBed } from '@/store/bedSlice';

export default function AddBed() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { recentBed, beds: bedData, fetching, error } = useAppSelector((state) => state.bed);

  const [name, setName] = useState('');
  const [cellsX, setCellsX] = useState(1);
  const [cellsY, setCellsY] = useState(1);

  useEffect(() => {
    if (recentBed) {
      const newBed = { ...recentBed };
      dispatch(clearRecentBed());
      router.push(`/bed/${newBed.id}`);
    } else if (!bedData) {
      dispatch(fetchBeds());
    }
  }, [bedData, recentBed, dispatch, router]);

  const createCells = (x: number, y: number) => {
    const cells = x * y;
    const emptyCells = [];
    for (let i = 1; i <= cells; i++) {
      let cell = {
        id: i,
        name: `Cell ${i}`,
      };
      emptyCells.push(cell);
    }
    return emptyCells;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bed = {
      name,
      cellsX,
      cellsY,
      cells: createCells(cellsX, cellsY),
    };

    dispatch(createBed(bed));

    // navigate to the new bed is handled by useEffect above
  };

  return (
    <>
      {error && <div>Error: {error}</div>}
      {fetching && <div>fetching...</div>}

      <h1>Add a new bed</h1>
      {bedData && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="grid">
            <label htmlFor="x">
              Squares across
              <input
                type="number"
                id="x"
                name="x"
                min="1"
                max="12"
                value={cellsX}
                onChange={(e) => setCellsX(parseInt(e.target.value))}
              />
            </label>
            <label htmlFor="y">
              Squares down
              <input
                type="number"
                id="y"
                name="y"
                min="1"
                max="12"
                value={cellsY}
                onChange={(e) => setCellsY(parseInt(e.target.value))}
              />
            </label>
          </div>
          <input
            type="submit"
            value={fetching ? 'Creating bed...' : 'Create bed'}
            disabled={name == '' ? true : false}
          />
        </form>
      )}
    </>
  );
}
