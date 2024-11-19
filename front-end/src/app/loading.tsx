import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <Spin indicator={antIcon} tip="Sayfa yükleniyor..." size="large" />
    </div>
  );
}