import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface AddButtonProps {
  onAdd: () => void;
  label?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd, label }) => {
  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
      {label}
    </Button>
  );
};

export default AddButton;

