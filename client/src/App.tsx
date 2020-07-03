import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  useSelector, useDispatch
} from 'react-redux'
import { get_users } from './store/actions'
//组件
import Home from "./containers/Home";
import Header from "./components/Header";
import NotFound from "./components/404";
import Aside from "./components/Aside";
//16.6
const Dashboard = React.lazy(() => {
  return import("./containers/Dashboard");
});


const Routes = (props: any) => {

  const dispatch = useDispatch();

  const users = useSelector(state => state['user'].users);

  useEffect(() => {
    dispatch(get_users(3));
  },[dispatch])

  console.log(users,'users')

  return (
    <Suspense fallback={<Home />}>
      <>
        <Header />
        <div>
          <Aside user={users} />
          <div className="body">
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
          </div>
        </div >
      </>
    </Suspense>
  )
}

export default Routes;