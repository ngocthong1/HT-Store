import { useEffect } from 'react';
import Breadcrumb from '../../components/molecules/Breadcrumb/Breadcrumb';
import './Dashboard.scss';

const Dashboard = () => {
  const breadcrumbItems = [{ key: 'dashboard' }];

  useEffect(() => {
    document.title = 'Fashion | Dashboard';
  }, []);

  return (
    <div id="dashboard">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Dashboard;
