import services from '@/services/demo';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import { getColumns } from './columns';
import OperationModal from './components/OperationModal';

const isDemo: boolean = true; // 是否是演示模式

const { addUser, queryUserList, deleteUser, modifyUser } =
  services.UserController;

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.UserInfo | undefined>(
    undefined,
  );

  const handleOpenModal = (values?: API.UserInfo) => {
    setModalOpen(true);
    if (values) {
      setCurrentRow(values);
    } else {
      setCurrentRow(undefined);
    }
  };

  /**
   * 添加用户
   * @param values
   */
  const handleAdd = async (values: API.UserInfo) => {
    if (!isDemo) {
      await addUser(values);
    }
    message.success('添加成功');
    return true;
  };

  /**
   * 更新用户
   * @param values
   */
  const handleUpdate = async (id: string, values: API.UserInfo) => {
    if (!isDemo) {
      await modifyUser({ userId: id }, values);
    }
    message.success('更新成功');
    return true;
  };

  /**
   *  删除用户
   * @param selectedRows
   */
  const handleRemove = async (id: string) => {
    if (!isDemo) {
      await deleteUser({ userId: id });
    }
    message.success('删除成功');
    return true;
  };

  const columns = getColumns({
    handleOpenModal,
    handleRemove,
  });

  return (
    <PageContainer
      header={{
        title: 'CRUD 示例',
      }}
    >
      <ProTable<API.UserInfo>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              handleOpenModal();
            }}
          >
            新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryUserList({
            ...params,
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}
      />

      <OperationModal
        open={modalOpen}
        setOpen={setModalOpen}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        actionRef={actionRef}
      />
    </PageContainer>
  );
};

export default TableList;
