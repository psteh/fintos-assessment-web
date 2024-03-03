import React, { FC, useState } from 'react';
import { Form, Button, notification } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { IData } from '@/app/interfaces/Tasks';
import { updateTask } from '@/modules/Tasks/api';
import TaskForm from '@/modules/Tasks/components/TaskForm';
import useFetchList from '@/app/hooks/useFetchList';

interface IUpdateTaskFormContainer {
  setIsShow: (isShow: boolean) => void;
  data: IData;
}

const StyledButtomWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const UpdateTaskFormContainer: FC<IUpdateTaskFormContainer> = ({
  data,
  setIsShow = () => {},
}) => {
  const { getData } = useFetchList();
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { _id: id } = data;

  const handleOnUpdate = async () => {
    setIsSubmitting(true);
    try {
      const values = await form.validateFields();
      const body = {
        ...values,
        dueDate: dayjs(values.dueDate).endOf('day').toISOString(),
      };
      await updateTask(id, body);
      await getData();

      notification.success({ message: 'Successfully edit task' });
      setIsShow(false);
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Error occur when trying to update task' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <TaskForm form={form} data={data} />
      <StyledButtomWrapper>
        <Button
          className="mr-4"
          type="primary"
          loading={isSubmitting}
          onClick={handleOnUpdate}
        >
          Update
        </Button>
        <Button type="default" onClick={() => setIsShow(false)}>
          Cancel
        </Button>
      </StyledButtomWrapper>
    </div>
  );
};

export default UpdateTaskFormContainer;
