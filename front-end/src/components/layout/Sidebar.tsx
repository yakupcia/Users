import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link href="/">Kullanıcılar</Link>,
    },
    {
      key: '2',
      icon: <PhoneOutlined />,
      label: <Link href="/contact">İletişim</Link>,
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#001529' }}>
      <div className="logo" style={{ height: 64, background: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
    </Sider>
  );
};

export default Sidebar;
