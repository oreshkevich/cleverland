import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
  const tokenLocalStorage = localStorage.getItem('token');
  let token;

  if (tokenLocalStorage === 'false') {
    token = false;
  } else {
    token = tokenLocalStorage;
  }

  return token ? <Outlet /> : <Navigate to='/auth' />;
};

export { Protected };
