"use client"; 

import localFont from "next/font/local";
import { Layout, Menu } from 'antd'; 
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons'; 
import React, { useState } from 'react';
import Link from 'next/link'; 
import '../styles/globals.css';
import 'antd/dist/reset.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const { Header, Sider, Content } = Layout;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout style={{ minHeight: '100vh' }}>
          
          <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#001529' }}>
            <div className="logo" style={{ height: 64, background: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link href="/page">
                  Sayfa 1
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PhoneOutlined />}>
                <Link href="/page" >
                  Sayfa 2
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 10, background: '#fff' }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </Header>

            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
