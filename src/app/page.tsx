'use client';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { deleteBed, fetchBeds } from '@/store/bedSlice';
import Spinner from '@/components/Spinner/Spinner';
import BedList from '@/components/BedList/BedList';
import Link from 'next/link';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { beds: bedData, fetching, error } = useAppSelector((state) => state.bed);

  useEffect(() => {
    // TO DO fetchBeds occurs before Mock Service Worker intercepts the request
    if (!bedData) {
      dispatch(fetchBeds());
    }
  }, []);

  const handleDeleteBed = (bedId: number) => {
    dispatch(deleteBed(bedId));
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {fetching && <Spinner />}
      {bedData && (
        <>
          <Link href="/add-bed" role="button">
            Add a new bed
          </Link>
          {bedData.length ? (
            <BedList deleteBed={handleDeleteBed} beds={bedData} />
          ) : (
            <p className="prompt">No beds yet. Add one above.</p>
          )}
        </>
      )}
    </div>
  );
}
