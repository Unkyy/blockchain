import React, { Fragment, useEffect,useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { routes } from "./config/routes";
import { createGlobalStyle } from 'styled-components'
import { StateProvider, AppContext } from './store';
import { dataJson } from "./Utils/tools";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  box-sizing: border-box;
`

const DynamicRoute = ({ route, ...props }) => {
  return (
    <route.layout {...props}>
      {route.subRoutes.map((subRoute, i) => (
        <Route
          key={i}
          exact={subRoute.exact}
          path={subRoute.path}
          component={subRoute.component}
        />
      ))}
    </route.layout>
  );
};

function App() {
  console.log("test de refresh")
  
  return (
    <Fragment>
      <StateProvider>

      <GlobalStyle />
      <Switch>
        {routes.map((route, i) => {
          return (
            route.subRoutes &&
            route.subRoutes.length > 0 && (
              <Route
                key={i}
                exact={route.subRoutes.some((r) => r.exact)}
                path={route.subRoutes.map((r) => r.path)}
                render={(props) => (
                  <Fragment>
                    <DynamicRoute {...props} {...{ route }} />
                  </Fragment>
                )}
              />
            )
          );
        })}
      </Switch>
      </StateProvider>

    </Fragment>
  );
}
const AppWithRouter = withRouter(App);

const RouterWrapper = () => (
  <Router>
    <AppWithRouter />
  </Router>
);

export default RouterWrapper;
