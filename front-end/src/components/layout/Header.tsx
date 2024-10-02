import { Layout, Button, Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, toggle }) => {
  return (
    <AntHeader className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggle}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Col>
        <Col flex="auto" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            UsersCase
          </span>
        </Col>
        <Col style={{ width: 64 }} /> 
      </Row>
    </AntHeader>
  );
};

export default Header;