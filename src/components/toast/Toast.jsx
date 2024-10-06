import { notification } from 'antd';

export const Toast = (type, message, duration = 5) => {
  notification[type]({
    message: message,
    duration: duration,
  });
};
