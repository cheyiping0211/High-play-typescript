import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//组件
import Home from "./containers/Home";
import NotFound from "./router/404";
//16.6
const Dashboard = React.lazy(() => {
  return import("./containers/Dashboard");
});

const Routes = (props: any) => {
  return (
    <Suspense fallback={<Home />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/auth/login"
          render={() =>
            true ? <Redirect to="/dashboard/home" /> : null
          }
        />
        <Route path="/404" component={NotFound} />
        <Route
          path={`/dashboard`}
          render={(props) =>
            true ? <Dashboard /> : <Redirect to="/auth/login" />
          }
        />
        <Redirect to="/404" />
      </Switch>

    </Suspense>
  )
}

export default Routes;