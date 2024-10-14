import { useEffect } from 'react';
import './Dashboard.scss';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'HTS | Dashboard';
  }, []);

  return <div id="dashboard"></div>;
};

export default Dashboard;
