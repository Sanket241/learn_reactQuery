import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home from './pages/Home';
import Mainlayout from './components/layouts/Mainlayout';
import Fetchold from './pages/Fetchold';
import Fetchrq from './pages/Fetchrq';
import Fetchid from './pages/Fetchid';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/old", element: <Fetchold /> },
      { path: "/new", element: <Fetchrq /> },
      { path: "/new/:id", element: <Fetchid /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
