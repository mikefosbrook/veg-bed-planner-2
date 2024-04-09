'use client';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '@/store/hooks';
import { fetchBeds } from '@/store/bedSlice';

export default function HomePage() {
  const store = useAppStore();
  const bedData = useAppSelector((state) => state.bed.beds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Use Effect fired');
    dispatch(fetchBeds());
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page content</p>
      <pre>{JSON.stringify(bedData, null, 2)}</pre>
    </div>
  );
}
