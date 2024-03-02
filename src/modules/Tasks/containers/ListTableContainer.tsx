'use client';

import React, { FC, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import type { PaginationProps, TableProps } from 'antd';
import { Pagination, Spin, Table } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { STATUS_MAP, DATE_TIME_FORMAT } from '@/app/constants';
import TaskFormModal from '@/modules/Tasks/components/TaskFormModal';

interface IData {
  _id: string;
  name: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface IListTableContainer {
  isLoading: boolean;
  data: {
    page: number;
    rows: Array<IData>;
    totalPages: number;
  };
}

const StyledPagination = styled(Pagination)`
  li,
  a,
  .ant-pagination-item,
  .ant-pagination-item-link,
  .ant-pagination-item-link {
    color: rgba(255, 255, 255, 0.75) !important;
  }

  .ant-pagination-item-active,
  .ant-pagination-item-active > a {
    border-color: rgb(0, 72, 172) !important;
    color: rgb(0, 72, 172) !important;
  }
`;

const ListTableContainer: FC<IListTableContainer> = ({ data, isLoading }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState('');
  const [movieTitle, setMovieTitle] = useState('');

  const { rows, totalPages } = data;
  const current = Number(searchParams.get('page'));
  const query = searchParams.get('query') || '';

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
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => STATUS_MAP?.[status] || status,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <TaskFormModal data={record} />,
    },
  ];

  const onChange: PaginationProps['onChange'] = (page) => {
    if (query && query.length > 0) {
      router.push(`${pathname}?page=${page}&query=${query}`);
    } else {
      router.push(`${pathname}?page=${page}`);
    }
  };

  const onClick = (id: string | number, title: string) => {
    setIsOpen(true);
    setMovieId(String(id));
    setMovieTitle(title);
  };

  const onCancel = () => setIsOpen(false);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center align-middle">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div>
            <Table
              className="w-full"
              dataSource={data?.rows || []}
              columns={columns}
            />
            {/* <StyledPagination
              current={current}
              onChange={onChange}
              total={totalPages}
              showSizeChanger={false}
            /> */}
          </div>

          {/* <MovieModal
            id={movieId}
            title={movieTitle}
            isOpen={isOpen}
            onCancel={onCancel}
          /> */}
        </>
      )}
    </div>
  );
};

export default ListTableContainer;
