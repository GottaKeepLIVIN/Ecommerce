// import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import Footer from './components/Footer';
import Menu from './components/menu/Menu';
import Navbar from './components/Navbar';
import ToasterProvider from './components/ToasterProvider';
import Brands from './pages/Brands';
import Calendar from './pages/Calendar';
import Categories from './pages/Categories';
import Charts from './pages/Charts';
import EditProfile from './pages/EditProfile';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Logs from './pages/Logs';
import Notes from './pages/Notes';
import Orders from './pages/Orders';
import Posts from './pages/Posts';
import Product from './pages/Product';
import Products from './pages/Products';
import Profile from './pages/Profile';
import User from './pages/User';
import Users from './pages/Users';


const Layout = () => {
  return (
    <div
      id="rootContainer"
      className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
    >
      <ToasterProvider />
      <ScrollRestoration />
      <div>
        <Navbar />
        <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
          <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
            <Menu />
          </div>
          <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/profile/edit',
          element: <EditProfile />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/brands',
          element: <Brands />,
        },
        {
          path: '/categories',
          element: <Categories />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/posts',
          element: <Posts />,
        },
        {
          path: '/notes',
          element: <Notes />,
        },
        {
          path: '/calendar',
          element: <Calendar />,
        },
        {
          path: '/charts',
          element: <Charts />,
        },
        {
          path: '/logs',
          element: <Logs />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <RouterProvider router={router} >
    </RouterProvider>
  )



}

export default App;
