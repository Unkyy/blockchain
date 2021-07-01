/** Layouts */
import Main from "../layouts/Main";
import Block from "../views/Block";
import Blockchain from "../views/Blockchain";
import Home from "../views/Home";
import Wallet from "../views/Wallet";
import Transaction from "../views/Transaction";

export const routes = [
    {
      layout: Main,
      subRoutes: [
        {
          exact: true,
          init: true,
          name: "home",
          path: `/`,
          component: Transaction
        },
        {
          init: false,
          exact: true,
          path: `/blockchain`,
          component: Blockchain
        },
        {
          exact: true,
          init: true,
          path: `/wallet`,
          component: Wallet,
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
  
