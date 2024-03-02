import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd';

import TaskFormContainer from '@/modules/Tasks/containers/TaskFormContainer';

interface IData {
  data: {
    _id: string;
    name: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
}

interface ITaskFormModal extends IData {}

const TaskFormModal: FC<ITaskFormModal> = ({ data }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsShow(true)}>
        Edit
      </Button>
      <Modal
        open={isShow}
        title="Task"
        destroyOnClose
        footer={null}
        onCancel={() => setIsShow(false)}
      >
        <TaskFormContainer data={data} setIsShow={setIsShow} />
      </Modal>
    </>
  );
};

export default TaskFormModal;
