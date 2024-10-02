import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { User } from '@/types';

interface UserTableProps {
  users: User[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onChange: (pagination: any) => void;
  onEdit: (user: User) => void;
  columns: any[]; 
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  pagination,
  onChange,
  onEdit,
  columns,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={pagination}
      loading={loading}
      onChange={onChange}
    />
  );
};

export default UserTable;
