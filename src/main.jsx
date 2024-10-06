import ReactDOM from 'react-dom/client';
import './main.css';
import 'antd/dist/reset.css';
import { Suspense } from 'react';
import AuthProvider from './provider/authProvider';
import SpinLoading from './components/atoms/SpinLoading/SpinLoading.jsx';
import Routes from './router.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import CartProvider from './provider/CartProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<SpinLoading />}>
          <Routes />
        </Suspense>
      </CartProvider>
    </AuthProvider>
  </I18nextProvider>,
);
