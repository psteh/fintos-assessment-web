import React, { FC, useEffect } from 'react';
import { Form, Input, DatePicker } from 'antd';
import type { GetProps, DatePickerProps, FormInstance } from 'antd';
import dayjs from 'dayjs';

import { IData } from '@/app/interfaces/Tasks';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface TaskForm {
  form: FormInstance;
  data?: IData;
}

const TaskForm: FC<TaskForm> = ({ form, data }) => {
  const checkDueDate = (_: any, value: string) => {
    if (value) {
      return Promise.resolve();
    }

    return Promise.reject('Due Date is required');
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  const handleOnDueDateChange = (value: DatePickerProps['value']) => {
    form.setFieldValue('dueDate', value);
  };

  useEffect(() => {
    form.setFieldValue('dueDate', dayjs(data?.dueDate));
  }, [form, data?.dueDate]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        initialValue={data?.name}
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        initialValue={data?.description}
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Due Date"
        name="dueDate"
        rules={[{ required: true, validator: checkDueDate }]}
      >
        <DatePicker
          format="DD MMM YYYY"
          value={dayjs(data?.dueDate)}
          disabledDate={disabledDate}
          onChange={handleOnDueDateChange}
        />
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
