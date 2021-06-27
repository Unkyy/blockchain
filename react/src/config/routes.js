/** Layouts */
import Main from "../layouts/Main";
import Block from "../views/Block";
import Blockchain from "../views/Blockchain";
import Home from "../views/Home";
import Transaction from "../views/Transaction";

export const routes = [
    {
      layout: Main,
      subRoutes: [
        {
          exact: true,
          path: `/`,
          component: Home
        },
        {
          init: true,
          exact: true,
          path: `/blockchain`,
          component: Blockchain
        },
        {
          init: true,
          exact: true,
          path: `/transaction`,
          component: Transaction,
        },
        {
          exact: true,
          init: false,
          path: `/hash/:hash`,
          component: Block,
        },
        {
          exact: true,
          init: false,
          path: `/miner/:hash`,
          component: Block,
        },
      ]
    }
  ];
  
