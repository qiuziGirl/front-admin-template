import {
  ActionType,
  BetaSchemaForm,
  ProFormColumnsType,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import React, { useEffect } from 'react';

interface OperationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentRow: API.UserInfo | undefined;
  setCurrentRow: (row: API.UserInfo | undefined) => void;
  onAdd: (values: API.UserInfo) => Promise<boolean>;
  onUpdate: (id: string, values: API.UserInfo) => Promise<boolean>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

const OperationModal: React.FC<OperationModalProps> = ({
  open,
  setOpen,
  currentRow,
  setCurrentRow,
  onAdd,
  onUpdate,
  actionRef,
}) => {
  const [form] = Form.useForm();

  // 当 selectedRows 变更时设置 form 的值
  useEffect(() => {
    if (currentRow && open) {
      form.setFieldsValue(currentRow);
    } else {
      form.resetFields();
    }
  }, [currentRow, open, form]);

  // 表单列定义
  const formColumns: ProFormColumnsType<API.UserInfo>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '请输入姓名' }],
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: {
        MALE: '男',
        FEMALE: '女',
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      formItemProps: {
        rules: [{ type: 'email', message: '请输入正确的邮箱' }],
      },
    },
  ];

  return (
    <BetaSchemaForm<API.UserInfo>
      title={currentRow ? '编辑' : '新建'}
      layout="horizontal"
      layoutType="ModalForm"
      open={open}
      labelCol={{ span: 4 }}
      modalProps={{
        onCancel: () => {
          setCurrentRow(undefined);
          setOpen(false);
          form.resetFields();
        },
      }}
      grid={true}
      colProps={{
        span: 12,
      }}
      form={form}
      columns={formColumns}
      onFinish={async (values) => {
        if (currentRow) {
          await onUpdate(currentRow.id, values);
        } else {
          await onAdd(values);
        }

        setOpen(false);
        setCurrentRow(undefined);
        form.resetFields();
        actionRef.current?.reload();

        return true;
      }}
    />
  );
};

export default OperationModal;
