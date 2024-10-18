import React from 'react';
import ReactDOM from 'react-dom/client';
import  FormRegisterBooks from "./component/form" 
import './index.css';
import {App} from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainContent } from './component/MainContent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    {
        path: "/",
        element: <MainContent />, // MainContent é o padrão na rota raiz
      },
      {
        path: "create",
        element: <FormRegisterBooks />, // FormRegisterBooks
      },
     
    ],
  },
  {
    path: "/create",
    element: <FormRegisterBooks />
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  }
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


