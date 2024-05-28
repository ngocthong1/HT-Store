import { Col, Row, Space, Typography } from 'antd';
import Button from '../../components/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import './Notfound.scss';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    document.title = 'EMP | Not Found';
  }, []);
  return (
    <Row id="notfound-container">
      <Col md={12} className="notfound-children">
        <Space
          direction="vertical"
          align="center"
          className="notfound-content"
          size={'small'}
        >
          <Typography.Title level={1} className="title-oops">
            Oops!
          </Typography.Title>
          <Typography.Paragraph>{t('NOTFOUND.404')}</Typography.Paragraph>
          <Typography.Paragraph className="content-sorry">
            {t('NOTFOUND.CONTENT_SORRY')}
          </Typography.Paragraph>
          <Button type="primary" onClick={() => navigate('/')}>
            {t('BUTTON.BACK_TO_HOME')}
          </Button>
        </Space>
      </Col>
      <Col xs={0} md={12}>
        <video
          autoPlay
          loop
          muted
          src="https://cdn.dribbble.com/userupload/11436308/file/original-f1f7249842e27472c561534dfbc93cd5.mp4"
          className="video-frame"
        ></video>
      </Col>
    </Row>
  );
};

export default NotFound;
