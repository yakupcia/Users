"use client";

import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, message } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async (page = 1, pageSize = 2, search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`/users?page=${page}&pageSize=${pageSize}&search=${search}`);
      setUsers(response.data.users);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: response.data.meta.totalCount,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchUsers(pagination.current, pagination.pageSize, searchText);
  };

  const handleSearch = (value: any) => {
    setSearchText(value);
    fetchUsers(1, pagination.pageSize, value);
  };

  const showModal = (user = null) => {
    setEditingUser(user);
    form.setFieldsValue(user || {});
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingUser) {
          await axios.post('/users/update', { ...values, id: editingUser.id });
          message.success('User updated successfully');
        } else {
          await axios.post('/users/save', values);
          message.success('User added successfully');
        }
        setIsModalVisible(false);
        fetchUsers(pagination.current, pagination.pageSize, searchText);
      } catch (error) {
        console.error('Error saving user:', error);
        message.error('Failed to save user');
      }
    });
  };

  const columns = [
    { title: 'İsim', dataIndex: 'name', key: 'name' },
    { title: 'Soyisim', dataIndex: 'surname', key: 'surname' },
    { title: 'E-posta', dataIndex: 'email', key: 'email' },
    { title: 'Telefon', dataIndex: 'phone', key: 'phone' },
    { title: 'Yaş', dataIndex: 'age', key: 'age' },
    { title: 'Ülke', dataIndex: 'country', key: 'country' },
    { title: 'İlçe', dataIndex: 'district', key: 'district' },
    { title: 'Rol', dataIndex: 'role', key: 'role' },
    {
      title: 'Eylem',
      key: 'action',
      render: (_: any, record: any) => (
        <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
          Düzenle
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kullanıcılar</h1>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="Kullanıcı Ara"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Kullanıcı Ekle
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title={editingUser ? 'Kullanıcı Düzenle' : 'Kullanıcı Ekle'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
         okText="Kaydet"
        cancelText="İptal"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="İsim" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Soyisim" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="E-posta" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Şifre" rules={[{ required: !editingUser }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="age" label="Yaş" rules={[{ type: 'number', min: 0 }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="country" label="Ülke">
            <Input />
          </Form.Item>
          <Form.Item name="district" label="İlçe">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;