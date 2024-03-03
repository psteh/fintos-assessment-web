'use client';

import { useState, useEffect, useCallback } from 'react';

import { IData } from '@/app/interfaces/Tasks';
import useParamRouter from '@/app/hooks/useParamRouter';
import { getAllTasks } from '@/modules/Tasks/api';

interface IUseFetchList {
  isLoading: boolean;
  data: {
    page: number;
    rows: Array<IData>;
    totalPages: number;
  };
  getData: () => void;
}

const useFetchList = (): IUseFetchList => {
  const { page, sort, search } = useParamRouter();

  const [data, setData] = useState({
    page: 0,
    rows: [],
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

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

  return {
    isLoading,
    data,
    getData,
  };
};

export default useFetchList;
