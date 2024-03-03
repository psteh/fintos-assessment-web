import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd';

import { IData } from '@/app/interfaces/Tasks';
import CreateTaskFormContainer from '@/modules/Tasks/containers/CreateTaskFormContainer';
import UpdateTaskFormContainer from '@/modules/Tasks/containers/UpdateTaskFormContainer';
import { FORM_TYPE } from '@/app/constants';

interface ITaskFormModal {
  formMode: string;
  data?: IData;
}

const TaskFormModal: FC<ITaskFormModal> = ({
  formMode = FORM_TYPE.CREATE,
  data,
}) => {
  const [isShow, setIsShow] = useState(false);

  const isEditMode = formMode === FORM_TYPE.EDIT && data;

  return (
    <>
      <Button type="primary" onClick={() => setIsShow(true)}>
        {isEditMode ? 'Edit' : 'Create'}
      </Button>
      <Modal
        open={isShow}
        title="Task"
        destroyOnClose
        footer={null}
        onCancel={() => setIsShow(false)}
      >
        {isEditMode ? (
          <UpdateTaskFormContainer data={data} setIsShow={setIsShow} />
        ) : (
          <CreateTaskFormContainer setIsShow={setIsShow} />
        )}
      </Modal>
    </>
  );
};

export default TaskFormModal;
