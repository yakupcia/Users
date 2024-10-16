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
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#001529' }}>
      <div className="logo" style={{ height: 64, background: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link href="/">Kullanıcılar</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PhoneOutlined />}>
          <Link href="/contact">İletişim</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;