import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem('accessToken'));
  const [userInfo, setUserInfo] = useState(null);

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  useEffect(() => {
    if (token) {
      localStorage.setItem('accessToken', token);
      try {
        // Giải mã token và lưu thông tin người dùng
        const decoded = jwtDecode(token);
        setUserInfo(decoded); // Lưu payload vào state
      } catch (error) {
        console.error('Invalid token', error);
        setUserInfo(null); // Nếu token không hợp lệ, xóa thông tin người dùng
      }
    } else {
      localStorage.removeItem('accessToken');
      setUserInfo(null); // Xóa thông tin người dùng khi không có token
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userInfo,
    }),
    [token, userInfo],
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
