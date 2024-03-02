'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ConfigProvider } from 'antd';

import useParamRouter from '@/app/hooks/useParamRouter';
import { getAllTasks } from '@/modules/Tasks/api';
import SearchContainer from '@/modules/Tasks/containers/SearchContainer';
import ListTableContainer from '@/modules/Tasks/containers/ListTableContainer';

export default function Home() {
  const { page, sort, search } = useParamRouter();
  const pathname = usePathname();
  const router = useRouter();

  const [data, setData] = useState({
    page: 0,
    rows: [],
    totalPages: 0,
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
      setData(res?.data || []);
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
    <ConfigProvider theme={{ hashed: false }}>
      <main className="flex min-h-screen flex-col items-center px-48 pt-36 pb-16">
        <SearchContainer />
        <ListTableContainer isLoading={isLoading} data={data} />
      </main>
    </ConfigProvider>
  );
}
