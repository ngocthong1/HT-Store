import { useEffect, useState } from 'react';
import './Dashboard.scss';
import { useLayout } from '../../provider/layoutProvider';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { axiosInstance } from '../../config/axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const { setBreadcumb } = useLayout();
  const [chartData, setChartData] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    document.title = 'HTS | Dashboard';
    setBreadcumb([{ key: 'dashboard' }]);

    // Fetch both products and orders data
    const fetchDashboardData = async () => {
      try {
        const [productsResponse, ordersResponse, usersResponse] =
          await Promise.all([
            axiosInstance.get('/products', {
              params: { limit: 5 },
            }),
            axiosInstance.get('/orders'),
            axiosInstance.get('/users/all'),
          ]);

        // Set total counts
        setTotalProducts(
          productsResponse.data.total || productsResponse.data.products.length,
        );
        setTotalOrders(
          ordersResponse.data.total || ordersResponse.data.orders.length,
        );
        setTotalUsers(usersResponse.data.length);

        // Transform products data
        const transformedProductData = productsResponse.data.products
          .filter((product) => product)
          .map((product) => ({
            name: product.name,
            sales: product.sold || 0,
          }));

        // Transform orders data for statistics
        const orders = ordersResponse.data.orders;
        const orderStatusCount = {
          'In Progress': 0,
          Delivered: 0,
          Canceled: 0,
        };

        orders.forEach((order) => {
          orderStatusCount[order.status]++;
        });

        const transformedOrderData = Object.entries(orderStatusCount).map(
          ([status, count]) => ({
            name: status,
            count: count,
          }),
        );

        setChartData(transformedProductData);
        setOrderStats(transformedOrderData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div id="dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-gray-800">{totalProducts}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
        </div>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-2 gap-4">
        {/* Product Sales Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-600">
            Product Sales
          </h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{
                  top: 30,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Text
                  x="50%"
                  y={10}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  className="chart-title"
                >
                  Top 5 Products by Sales
                </Text>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-600">
            Order Status Distribution
          </h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={orderStats}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {orderStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
