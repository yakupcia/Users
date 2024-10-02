"use client";

import React, { useState } from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('Users');

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sidebar 
        collapsed={collapsed} 
        setCurrentSection={setCurrentSection}
        currentSection={currentSection}
      />
      <AntLayout className="site-layout">
        <Header collapsed={collapsed} toggle={toggle} />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {React.Children.map(children, child =>
            React.isValidElement(child)
              ? React.cloneElement(child, { currentSection, setCurrentSection })
              : child
          )}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;