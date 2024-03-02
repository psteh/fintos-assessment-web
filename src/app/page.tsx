import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import useParamRouter from './hooks/useParamRouter';
import { getAllTasks } from './api';

export default function Home() {
  const { page, sort, search } = useParamRouter();
  const pathname = usePathname();
  const router = useRouter();

  const [data, setData] = useState({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // redirect to first page if there is no page at query param
  if (!page) {
    router.push(`${pathname}?page=1`);
  }

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllTasks(page, sort, search);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, sort, search]);

  useEffect(() => {
    getData();
  }, [page, getData]);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between`}>
      {/* <MovieContainer data={data} isLoading={isLoading} genresList={genreList} /> */}
    </main>
  );
}
