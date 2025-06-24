import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

interface ColumnProps {
  handleOpenModal: (values?: API.UserInfo) => void;
  handleRemove: (id: string) => void;
}

export const getColumns = ({
  handleOpenModal,
  handleRemove,
}: ColumnProps): ProColumns<API.UserInfo>[] => {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
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
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              key="edit"
              icon={<EditOutlined />}
              onClick={() => handleOpenModal(record)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => handleRemove(record.id)}
            >
              <Button type="link" key="delete" icon={<DeleteOutlined />} danger>
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
};
