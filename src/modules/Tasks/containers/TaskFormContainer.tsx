import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, notification } from 'antd';
import type { GetProps, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

import { IData } from '@/app/interfaces/Tasks';
import { updateTask } from '@/modules/Tasks/api';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface ITaskFormContainer {
  setIsShow: (isShow: boolean) => void;
  data: IData;
}

const TaskFormContainer: FC<ITaskFormContainer> = ({
  data,
  setIsShow = () => {},
}) => {
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { _id: id, name, description, dueDate, status } = data;

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

  const handleOnUpdate = async () => {
    setIsSubmitting(true);
    try {
      const values = await form.validateFields();
      const res = await updateTask(id, values);

      notification.success({ message: 'Successfully edit record' });
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Error occur when trying to update task' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    form.setFieldValue('dueDate', dayjs(dueDate));
  }, [form, dueDate]);

  return (
    <div className="w-full">
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          initialValue={name}
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          initialValue={description}
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
            className="w-full"
            format="DD MMM YYYY"
            value={dayjs(dueDate)}
            disabledDate={disabledDate}
            onChange={handleOnDueDateChange}
          />
        </Form.Item>
      </Form>
      <div className="flex justify-end align-middle">
        <Button type="primary" loading={isSubmitting} onClick={handleOnUpdate}>
          Update
        </Button>
        <Button type="default" onClick={() => setIsShow(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TaskFormContainer;
