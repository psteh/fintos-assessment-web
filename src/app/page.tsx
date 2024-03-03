'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ConfigProvider } from 'antd';
import styled from 'styled-components';

import useParamRouter from '@/app/hooks/useParamRouter';
import useFetchList from '@/app/hooks/useFetchList';
import SearchContainer from '@/modules/Tasks/containers/SearchContainer';
import ListTableContainer from '@/modules/Tasks/containers/ListTableContainer';
import TaskFormModal from '@/modules/Tasks/components/TaskFormModal';
import { FORM_TYPE } from '@/app/constants';

const StyledCreateTask = styled.div`
  width: 100%;
  display: flex;
  justfify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
`;

export default function Home() {
  const { page } = useParamRouter();
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, data } = useFetchList();

  // redirect to first page if there is no page at query param
  if (!page) {
    router.push(`${pathname}?page=1`);
  }

  // TODO: refresh list on create/update task

  return (
    <ConfigProvider theme={{ hashed: false }}>
      <main className="flex min-h-screen flex-col items-center px-48 pt-36 pb-16">
        <SearchContainer />
        <StyledCreateTask>
          <TaskFormModal formMode={FORM_TYPE.CREATE} />
        </StyledCreateTask>
        <ListTableContainer isLoading={isLoading} data={data} />
      </main>
    </ConfigProvider>
  );
}
