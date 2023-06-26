import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Link to="/">Home</Link>
      <Outlet />
    </>
  );
}

export default Layout;