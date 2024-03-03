'use client';

import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import type { TableProps } from 'antd';
import { Pagination, Spin, Table } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import {
  STATUS_MAP,
  DATE_TIME_FORMAT,
  FORM_TYPE,
  DUE_SOON_DAYS,
} from '@/app/constants';
import TaskFormModal from '@/modules/Tasks/components/TaskFormModal';
import useParamRouter from '@/app/hooks/useParamRouter';
import { IData } from '@/app/interfaces/Tasks';

interface IListTableContainer {
  isLoading: boolean;
  data: {
    page: number;
    rows: Array<IData>;
    totalPages: number;
    totalDocuments: number;
  };
}

const StyledListTableContainer = styled.div`
  width: 100%;
`;

const StyledPagination = styled(Pagination)``;

const ListTableContainer: FC<IListTableContainer> = ({ data, isLoading }) => {
  const searchParams = useSearchParams();
  const { set } = useParamRouter();

  const { totalDocuments } = data;
  const current = Number(searchParams.get('page'));

  const columns: TableProps<IData>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => dayjs(date).format(DATE_TIME_FORMAT),
      sorter: true,
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      render: (status, record) => {
        if (dayjs().isAfter(record.dueDate)) {
          return STATUS_MAP.OVERDUE;
        } else if (dayjs(record.dueDate).diff(dayjs(), 'd') < DUE_SOON_DAYS) {
          return STATUS_MAP.DUE_SOON;
        } else {
          return STATUS_MAP.NOT_URGENT;
        }
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format(DATE_TIME_FORMAT),
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <TaskFormModal formMode={FORM_TYPE.EDIT} data={record} />
      ),
    },
  ];

  const handleTableChange: TableProps['onChange'] = (
    pagination,
    filter,
    sorter,
  ) => {
    // no idea why SorterResult have any
    // @ts-ignore
    const { field, order } = sorter;
    let sort = 'createdAt';

    if (order === 'descend') {
      sort = `-${field}`;
    } else {
      sort = field;
    }

    set({ sort });
  };

  return (
    <StyledListTableContainer>
      {isLoading ? (
        <div className="flex justify-center align-middle">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            className="w-full"
            dataSource={data?.rows || []}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
            onChange={handleTableChange}
          />
          <StyledPagination
            current={current}
            total={totalDocuments}
            showSizeChanger={false}
            onChange={(page) => set({ page })}
          />
        </>
      )}
    </StyledListTableContainer>
  );
};

export default ListTableContainer;
