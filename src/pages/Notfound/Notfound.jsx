import Button from '../../components/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import pagenotfound from '../../assets/img/404.png';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    document.title = 'HTS | Not Found';
  }, []);

  const handleBackToHome = () => {
    if (window.location.pathname === '/') return window.location.reload();
    navigate('/');
  };

  return (
    <div className="w-full wrapper flex items-center justify-center flex-col bg-white h-screen">
      <img
        className="lg:w-96 md:w-80 w-48"
        src={pagenotfound}
        alt="emptycart"
      />
      <p className="text-3xl font-extrabold">404</p>
      <p className="lg:text-lg text-sm text-grayshade-100">
        Oops! The page you're looking for can't be found.
      </p>
      <Button type="primary" onClick={handleBackToHome}>
        {t('BUTTON.BACK_TO_HOME')}
      </Button>
    </div>
  );
};

export default NotFound;
