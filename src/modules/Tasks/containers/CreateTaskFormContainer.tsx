import React, { FC, useState } from 'react';
import { Form, Button, notification } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { createTask } from '@/modules/Tasks/api';
import TaskForm from '@/modules/Tasks/components/TaskForm';
import useFetchList from '@/app/hooks/useFetchList';

interface ICreateTaskFormContainer {
  setIsShow: (isShow: boolean) => void;
}

const StyledButtomWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const CreateTaskFormContainer: FC<ICreateTaskFormContainer> = ({
  setIsShow = () => {},
}) => {
  const { getData } = useFetchList();
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnCreate = async () => {
    setIsSubmitting(true);
    try {
      const values = await form.validateFields();
      const body = {
        ...values,
        dueDate: dayjs(values.dueDate).endOf('day').toISOString(),
      };
      await createTask(body);
      await getData();

      notification.success({ message: 'Successfully create new task' });
      setIsShow(false);
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Error occur when trying to create task' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <TaskForm form={form} />
      <StyledButtomWrapper>
        <Button
          className="mr-4"
          type="primary"
          loading={isSubmitting}
          onClick={handleOnCreate}
        >
          Create
        </Button>
        <Button type="default" onClick={() => setIsShow(false)}>
          Cancel
        </Button>
      </StyledButtomWrapper>
    </div>
  );
};

export default CreateTaskFormContainer;
